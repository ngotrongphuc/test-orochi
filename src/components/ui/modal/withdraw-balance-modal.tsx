'use client'
import { xoroCoin } from '@/images/contribute-to-earn/icons'
import {
  mutateUpdateWithdrawalTransactionHash,
  mutateWithdrawXOro,
} from '@/lib/graphql/mutations'
import { querySupportedXOroChainIds } from '@/lib/graphql/queries/get-supported-xoro-chain-ids'
import { ETokenWithdrawalStatus, TLinkedWallet } from '@/lib/graphql/type'
import { cn } from '@/lib/utils'
import {
  useLoginMethodsStatusStore,
  useUserRewardStore,
  useXOroBalancesStore,
} from '@/stores'
import { getImageUrl, shortenString } from '@/utils'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../select'
import { Button } from '../button'
import { useDebounce } from '@/hooks/use-debounce'
import { EModalId } from '@/app/contribute-to-earn/lib/types'
import { useModal } from '@/app/context/modal-context'
import { useWallet } from '@/hooks/use-wallet'
import { getListRpcRecord } from '@/actions/get-list-rpc'
import { ServiceSpider } from '@orochi-network/jrpc'
import { getTokenImageUrl } from '@/hooks/use-service-spider'
import { toast } from '../use-toast'
import { Modal } from './modal'
import { Info } from '@phosphor-icons/react/dist/ssr'

const TOAST_DURATION = 5000
const TIME_DEBOUNCE = 700

const WITHDRAW_MIN = 50
const WITHDRAW_MAX = 200

type WithdrawBalanceModalProps = {
  visible?: boolean
  onClose: () => void
}

export const WithdrawBalanceModal: FC<WithdrawBalanceModalProps> = ({
  visible,
  onClose,
}) => {
  const { balance, getUserReward, setWithdrawData } = useUserRewardStore()
  const isEnoughBalance = balance >= WITHDRAW_MIN
  const { connectedWallets } = useLoginMethodsStatusStore()
  const { tokenWithdrawalHistory, getTokenWithdrawalHistory, getXOroBalances } =
    useXOroBalancesStore()
  const signedTransaction = tokenWithdrawalHistory?.records?.filter(
    (record) => record.status === ETokenWithdrawalStatus.Signed,
  )[0]
  const [supportedChains, setSupportedChains] = useState<
    ServiceSpider.TListRpcRecord[]
  >([])
  const [selectedChain, setSelectedChain] = useState<
    ServiceSpider.TListRpcRecord | undefined
  >()
  const [selectedWallet, setSelectedWallet] = useState<TLinkedWallet>(
    connectedWallets[0],
  )
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [withdrawAmount, setWithdrawAmount] = useState<number>(WITHDRAW_MIN)
  const { openModal } = useModal()
  const { handleAddNetwork, handleAddToken, handleSignMessage } = useWallet()

  useEffect(() => {
    // load data from signed transaction into form
    if (signedTransaction) {
      const signedChain = supportedChains.filter(
        (chain) =>
          chain.chainId.toString() === signedTransaction.chainId.toString() &&
          chain.url.includes('https'),
      )[0]
      setSelectedChain(signedChain)
      // TODO: need implemetn wallet provider from backend
      // setSelectedWallet(signedTransaction.walletAddress)
      setWithdrawAmount(Number(signedTransaction.amount))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signedTransaction, supportedChains])

  const getSupportedChains = async () => {
    setLoading(true)
    const networkRecord = await getListRpcRecord()
    if (!networkRecord) {
      throw new Error('Cannot get list rpc')
    }

    const result = await querySupportedXOroChainIds()
    const filteredSupportedChainds = networkRecord.filter(
      (network) =>
        result.includes(network.chainId.toString()) &&
        network.url.includes('https'),
    )
    setSupportedChains(filteredSupportedChainds)
    setLoading(false)
  }

  useEffect(() => {
    getSupportedChains()
  }, [])

  const handleSelectChain = (value: string) => {
    const selected = supportedChains.find(
      (network) => network.networkName === value,
    )
    if (selected) {
      setSelectedChain(selected)
      handleAddNetwork(selected, setSelectedChain)
      setErrorMessage('')
    }
  }

  const handleSelectWallet = (value: string) => {
    const selected = connectedWallets.find(
      (wallet) => wallet?.address === value,
    )
    if (selected) {
      setSelectedWallet(selected)
    }
  }

  const handleCloseModal = () => {
    setSelectedChain(undefined)
    setErrorMessage('')
    onClose()
  }

  const setAmountDebounce = useDebounce((withdrawAmount: number) => {
    setWithdrawAmount(
      Math.max(WITHDRAW_MIN, Math.min(WITHDRAW_MAX, withdrawAmount)),
    )
  }, TIME_DEBOUNCE)

  const handleChangeWithdrawAmount = (value: number) => {
    setWithdrawAmount(value)
    if (value > balance) {
      value = balance
    }
    setAmountDebounce(value)
  }

  const handleWithdrawXOro = async () => {
    try {
      if (!selectedChain?.chainId) {
        setErrorMessage('You need to select chain before claim token!')
        return
      }
      await handleAddToken()

      const { withdrawalStatus, signedPayload, transactionUuid } =
        await mutateWithdrawXOro({
          amount: withdrawAmount.toString(),
          chainId: selectedChain.chainId.toString(),
          walletAddress: selectedWallet?.address.toString(),
        })

      const transactionHash = await handleSignMessage({
        signedPayload,
      })
      // after sign message, update transaction status
      await mutateUpdateWithdrawalTransactionHash({
        transactionUuid,
        transactionHash,
      })

      await getXOroBalances()
      setWithdrawData({
        amount: withdrawAmount.toString(),
        chainId: selectedChain.chainId.toString(),
        walletAddress: selectedWallet?.address.toString(),
        walletProvider: selectedWallet?.walletProvider,
      })
      handleCloseModal()
      openModal(EModalId.ModalWithdrawSuccessful)
    } catch (error) {
      handleCloseModal()
      openModal(EModalId.ModalWithdrawFailed)
      throw new Error('Withdraw failed')
    } finally {
      const results = await Promise.allSettled([
        getUserReward(),
        getTokenWithdrawalHistory(),
      ])
      results.forEach((result) => {
        if (result.status === 'rejected') {
          toast({
            message:
              result.reason instanceof Error
                ? result.reason.message
                : 'Error when refetch data',
            variant: 'error',
            duration: TOAST_DURATION,
          })
        }
      })
    }
  }

  const handleRetryTransaction = async () => {
    try {
      if (!signedTransaction) {
        throw new Error('No signed transaction found')
      }
      if (!selectedChain?.chainId) {
        setErrorMessage('You need to select chain before claim token!')
        return
      }
      await handleAddToken()

      const transactionHash = await handleSignMessage({
        signedPayload: signedTransaction?.signedPayload,
      })
      // after sign message, update transaction status
      await mutateUpdateWithdrawalTransactionHash({
        transactionUuid: signedTransaction.uuid,
        transactionHash,
      })

      await getXOroBalances()
      setWithdrawData({
        amount: withdrawAmount.toString(),
        chainId: selectedChain.chainId.toString(),
        walletAddress: selectedWallet?.address.toString(),
        walletProvider: selectedWallet?.walletProvider,
      })
      handleCloseModal()
      openModal(EModalId.ModalWithdrawSuccessful)
    } catch (error) {
      handleCloseModal()
      openModal(EModalId.ModalWithdrawFailed)
      throw new Error('Retry withdraw failed')
    } finally {
      const results = await Promise.allSettled([
        getUserReward(),
        getTokenWithdrawalHistory(),
      ])
      results.forEach((result) => {
        if (result.status === 'rejected') {
          toast({
            message:
              result.reason instanceof Error
                ? result.reason.message
                : 'Error when refetch data',
            variant: 'error',
            duration: TOAST_DURATION,
          })
        }
      })
    }
  }

  return (
    <Modal
      visible={visible}
      onClose={handleCloseModal}
      className='w-full bg-white backdrop-blur-0 lg:w-1/2 xl:w-1/3'
    >
      {/* header */}
      <div className='flex flex-col gap-2 border-b border-neutral-200 pb-6'>
        <h4 className='text-lg font-semibold lg:text-23'>Claim your token</h4>
        <p className='text-16 font-normal text-neutral-600'>
          {/* TODO: add description here */}
        </p>
      </div>
      {/* contents */}
      <div className='flex items-center justify-between border-b border-neutral-400 py-6'>
        <p className='text-16 font-normal text-neutral-600'>Current balance</p>
        <div className='flex items-center gap-2'>
          <p className='text-18 font-semibold text-red-600'>{balance}</p>
          <Image
            src={xoroCoin.default.src}
            width={20}
            height={20}
            alt='logo-x-oro'
          />
        </div>
      </div>
      <div className='flex flex-col gap-6 pb-10 pt-6'>
        {signedTransaction ? (
          <div className='flex items-center gap-2 rounded-lg border border-blue-400 bg-blue-100 p-4'>
            <Info size={40} weight='fill' className='text-blue-500' />
            <p className='text-blue-700 text-sm'>
              Your previous claim token transaction has not been processed.
              Please complete it before claiming a new transaction.
            </p>
          </div>
        ) : (
          <div className='flex items-center gap-2 rounded-lg border border-green-400 bg-green-100 p-4'>
            <Info size={40} weight='fill' className='text-green-500' />
            <p className='text-sm text-green-700'>
              Please enter correct transaction information. This information
              cannot be edited or changed after a claim request has been made.
            </p>
          </div>
        )}
        <div className='flex flex-col gap-4'>
          <div className='flex w-full flex-col gap-1'>
            <p className='ml-2 text-16 font-normal text-neutral-800'>
              Select chain
            </p>
            <Select
              value={selectedChain ? selectedChain.networkName : 'Select chain'}
              onValueChange={(value) => handleSelectChain(value)}
              disabled={Boolean(signedTransaction) || loading}
            >
              <SelectTrigger
                className='flex h-full w-full items-center gap-3 rounded-2xl border border-neutral-400 bg-white p-4'
                icon={
                  selectedChain && (
                    <Image
                      alt='selected-icon'
                      src={getTokenImageUrl(selectedChain.currency) || ''}
                      width={20}
                      height={20}
                    />
                  )
                }
                text={
                  selectedChain ? selectedChain.networkName : 'Select chain'
                }
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className='z-cursor rounded-lg border border-white bg-white'>
                {supportedChains.map((chain) => (
                  <SelectItem
                    className={cn(
                      'my-1 rounded-xl py-4',
                      selectedChain?.networkName === chain.networkName
                        ? 'bg-blue-300'
                        : 'hover:bg-blue-100',
                    )}
                    key={chain.networkName}
                    value={chain.networkName}
                    icon={
                      <Image
                        alt='testnet-icon'
                        src={getTokenImageUrl(chain.currency) || ''}
                        width={20}
                        height={20}
                      />
                    }
                  >
                    {chain.networkName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!selectedChain && (
              <p className='ml-2 mt-1 text-14 text-red-500'>{errorMessage}</p>
            )}
          </div>
          <div className='flex w-full flex-col gap-1'>
            <p className='ml-2 text-16 font-normal text-neutral-800'>
              Select wallet
            </p>
            <Select
              value={selectedWallet?.address}
              onValueChange={(value) => handleSelectWallet(value)}
              disabled={Boolean(signedTransaction)}
            >
              <SelectTrigger
                className='flex h-full w-full items-center gap-3 rounded-2xl border border-neutral-400 bg-white p-4 lining-nums'
                icon={
                  <Image
                    alt='selected-icon'
                    src={getImageUrl(selectedWallet?.walletProvider || '')}
                    width={20}
                    height={20}
                  />
                }
                text={shortenString(selectedWallet?.address || '')}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className='z-cursor rounded-lg border bg-white'>
                {connectedWallets.map((wallet) => (
                  <SelectItem
                    className={cn(
                      'my-1 rounded-xl py-4',
                      selectedWallet?.address === wallet?.address
                        ? 'bg-blue-300'
                        : 'hover:bg-blue-100',
                    )}
                    key={wallet?.address}
                    value={wallet?.address}
                    icon={
                      <Image
                        alt='testnet-icon'
                        src={getImageUrl(wallet?.walletProvider)}
                        width={20}
                        height={20}
                      />
                    }
                  >
                    {shortenString(wallet?.address)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='flex w-full flex-col gap-1'>
            <p className='ml-2 text-16 font-normal text-neutral-800'>
              Withdraw amount
            </p>
            <label
              className={cn(
                'flex items-center justify-between rounded-2xl border border-neutral-400 p-4',
                Boolean(signedTransaction) && 'border-neutral-400/50',
                !isEnoughBalance && 'border-neutral-400/50',
              )}
            >
              <input
                type='number'
                className='input w-full lining-nums outline-none disabled:cursor-not-allowed disabled:bg-white disabled:opacity-50 hocus:border-neutral-400'
                value={withdrawAmount}
                onChange={(e) =>
                  handleChangeWithdrawAmount(parseFloat(e.target.value))
                }
                disabled={Boolean(signedTransaction) || !isEnoughBalance}
              />
              <div className='flex'>
                <Button
                  intent='transparent'
                  className='w-fit text-nowrap p-0 text-14 normal-case text-red-500 disabled:opacity-30'
                  onClick={() => handleChangeWithdrawAmount(WITHDRAW_MIN)}
                  disabled={Boolean(signedTransaction) || !isEnoughBalance}
                >
                  Take min
                </Button>
                <div className='px-1 text-neutral-300'>|</div>
                <Button
                  intent='transparent'
                  className='w-fit text-nowrap p-0 text-14 normal-case text-red-500 disabled:opacity-30'
                  onClick={() => handleChangeWithdrawAmount(balance)}
                  disabled={Boolean(signedTransaction) || !isEnoughBalance}
                >
                  Take max
                </Button>
              </div>
            </label>
            {!signedTransaction && !isEnoughBalance && (
              <p className='text-14 font-light text-red-500'>
                You do not have enough balance to withdraw!
              </p>
            )}
          </div>
          <div className='flex flex-col'>
            <p className='text-14 font-medium text-neutral-500'>
              Minimum amount of XORO to be redeemed:{' '}
              <strong className='font-semibold text-neutral-600'>
                {WITHDRAW_MIN}
              </strong>
            </p>
            <p className='text-14 font-medium text-neutral-500'>
              Maximum amount of XORO to be redeemed:{' '}
              <strong className='font-semibold text-neutral-600'>
                {WITHDRAW_MAX}
              </strong>
            </p>
          </div>
        </div>
      </div>
      {/* footer */}
      <div className='flex items-center justify-center gap-4 border-t border-neutral-200 pt-5'>
        <Button
          intent='white'
          className='w-full border border-neutral-400 text-16 normal-case text-black'
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          className='w-full text-16 normal-case text-white'
          onClick={
            signedTransaction ? handleRetryTransaction : handleWithdrawXOro
          }
          disabled={!isEnoughBalance && !signedTransaction}
        >
          Claim Token
        </Button>
      </div>
    </Modal>
  )
}

export default WithdrawBalanceModal
