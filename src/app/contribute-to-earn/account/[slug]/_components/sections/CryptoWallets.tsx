'use client'
import ItemCard from '@/app/contribute-to-earn/_components/ui/ItemCard'
import { WALLET_ACCOUNTS } from '@/app/contribute-to-earn/lib/constants'
import { isValidEIP6963Provider } from '@/app/contribute-to-earn/lib/utils'
import { useRainbowKitContext } from '@/app/contribute-to-earn/provider/rainbow-kit-provider'
import { useSyncProviders } from '@/hooks/use-sync-provider'
import { useWallet } from '@/hooks/use-wallet'
import type { WalletLoginMethod } from '@/lib/graphql/type'
import { useLoginMethodsStatusStore, useXOroBalancesStore } from '@/stores'
import { getBalance, getImageUrl, shortenString } from '@/utils'
import { Check, CopySimple } from '@phosphor-icons/react'
import { useState, type FC } from 'react'
import { WalletCard } from '../WalletCard'
import WithdrawalTransactionsHistory from './WithdrawalTransactionsHistory'

export const CryptoWallets: FC = () => {
  const { getLoginMethodsStatus } = useLoginMethodsStatusStore()
  const { getXOroBalances, xOroBalances, tokenWithdrawalHistory } =
    useXOroBalancesStore()
  const [selected, setSelected] = useState<number | undefined>()
  const { handleConnect } = useWallet()
  const providers = useSyncProviders()
  const { openRainbowKitModal } = useRainbowKitContext()

  const handleConnectWithRainbowKit = () => {
    openRainbowKitModal({
      isLinkWallet: true,
      callback: () => {
        getLoginMethodsStatus()
        getXOroBalances()
      },
    })
  }

  const handleConnectWallet = async (
    walletProvider: EIP6963ProviderDetail,
    walletMethod: WalletLoginMethod,
  ) => {
    await handleConnect(walletProvider, walletMethod)
    // refetch connected wallets in AccountHeader if not connected yet
    getLoginMethodsStatus()
    getXOroBalances()
  }

  const handleCopyAddress = async (address: string, index: number) => {
    await navigator.clipboard.writeText(address)
    setSelected(index)
  }

  return (
    <div className='container flex w-full flex-col gap-6'>
      <div className='flex flex-col gap-10 rounded-3xl border border-transparent bg-blue-100 p-6 lg:p-10'>
        <h6 className='font-semibold'>WALLET MANAGEMENT</h6>
        <div className='flex flex-col gap-4'>
          <p>Connected Wallet ({xOroBalances?.balances.length || 0})</p>
          <div className='flex flex-col gap-2'>
            {xOroBalances && xOroBalances.balances.length > 0 ? (
              xOroBalances.balances.map((item, index) => (
                <WalletCard
                  key={item.address}
                  balance={getBalance(item.balance)}
                  address={shortenString(item.address)}
                  image={getImageUrl(item.walletProvider) || ''}
                  chain={item.chainId.toString()}
                  action={
                    <div className='flex items-center justify-between gap-3'>
                      <button
                        onClick={() => handleCopyAddress(item.address, index)}
                      >
                        {index !== selected ? (
                          <CopySimple size={24} />
                        ) : (
                          <Check size={24} fill='green' />
                        )}
                      </button>
                    </div>
                  }
                />
              ))
            ) : (
              <div className='rounded-xl bg-white p-6 text-base text-neutral-800'>
                You haven&apos;t connect any wallet
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <p>Add Wallet</p>
          <div className='grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
            {WALLET_ACCOUNTS.map(({ id, title, image, explorerUrl }) => {
              if (id === 'rainbowKit') {
                return (
                  <ItemCard
                    size={24}
                    className='text-nowrap'
                    key={id}
                    id={id}
                    title={title}
                    image={image}
                    isActive
                    onItemClick={handleConnectWithRainbowKit}
                  />
                )
              }
              const provider = providers.find(
                (pro) => pro.info.name.toLowerCase() === title.toLowerCase(),
              )
              return (
                <ItemCard
                  size={24}
                  key={id}
                  id={id}
                  className='text-nowrap'
                  title={title}
                  image={image}
                  isActive={isValidEIP6963Provider(provider)}
                  explorerUrl={explorerUrl}
                  onItemClick={() =>
                    provider && handleConnectWallet(provider, id)
                  }
                />
              )
            })}
          </div>
        </div>
      </div>
      <WithdrawalTransactionsHistory data={tokenWithdrawalHistory} />
    </div>
  )
}
