'use client'
import { useModal } from '@/app/context/modal-context'
import { EModalId } from '@/app/contribute-to-earn/lib/types'
import { isEmpty } from '@/app/contribute-to-earn/lib/utils'
import { Button } from '@/components/ui/button'
import {
  WalletConnectModal,
  WithdrawBalanceModal,
  WithdrawSuccessfulModal,
  WithdrawFailedModal,
} from '@/components/ui/modal'
import { xoroCoin } from '@/images/contribute-to-earn/icons'
import {
  useLoginMethodsStatusStore,
  useUserRewardStore,
  useXOroBalancesStore,
} from '@/stores'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import React, { FC, useEffect, useState } from 'react'
import * as Tooltip from '@radix-ui/react-tooltip'

type TAccountHeaderProps = {
  slug: string
}

export const AccountHeader: FC<TAccountHeaderProps> = ({ slug }) => {
  const { modalStates, closeModal, openModal } = useModal()
  const { connectedWallets, getLoginMethodsStatus } =
    useLoginMethodsStatusStore()
  const { balance, getUserReward } = useUserRewardStore()
  const { getTokenWithdrawalHistory } = useXOroBalancesStore()
  const [tooltipOpened, setTooltipOpened] = useState<boolean>(false)

  const TOOLTIP_DURATION = 5000

  const onClickClaim = () => {
    setTooltipOpened(true)
    setTimeout(() => {
      setTooltipOpened(false)
    }, TOOLTIP_DURATION)
  }

  useEffect(() => {
    getLoginMethodsStatus()
    getUserReward()
    getTokenWithdrawalHistory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='flex items-center justify-between'>
      <h5 className='text-lg lg:text-3xl'>Account</h5>
      <div className='flex items-center gap-2'>
        {isEmpty(connectedWallets) && (
          <>
            <Button
              intent='transparent'
              className='px-0 normal-case text-sm md:text-base'
              icon={<ArrowUpRight size={16} />}
              onClick={() => openModal(EModalId.ModalWalletConnect)}
            >
              Please connect wallet first to claim your XORO
            </Button>
            <p className='mx-4 text-neutral-500'>|</p>
          </>
        )}
        <div className='flex items-center gap-1 text-neutral-600'>
          <p className='hidden md:flex'>Balance:</p>
          <div className='flex gap-1'>
            <Image
              src={xoroCoin.default.src}
              width={20}
              height={20}
              alt='logo-x-oro'
            />
            <p className='font-semibold text-red-500'>{balance}</p>
          </div>
        </div>
        {!isEmpty(connectedWallets) && (
          <>
            <p className='mx-4 text-neutral-500'>|</p>
            {/* TODO: for now just show coming soon, reactive when resolve all bugs */}
            <Tooltip.Root delayDuration={0} open={tooltipOpened}>
              <Tooltip.Trigger asChild>
                <div>
                  <Button
                    className='rounded-lg px-2 py-1 text-14 font-normal normal-case text-white'
                    onClick={onClickClaim}
                  >
                    Claim XORO
                  </Button>
                </div>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  className='max-w-[320px] rounded-3xl bg-white p-4 text-center text-neutral-800 shadow-[0px_4px_32px_0px_rgba(98,176,234,0.16)]'
                  sideOffset={8}
                  side='bottom'
                >
                  <Tooltip.Arrow className='fill-white text-white' />
                  <p className='leading-6'>
                    Coming soon in
                    <br />
                    <span className='font-semibold'>
                      September 19, 2024 - 10AM UTC!
                    </span>
                  </p>
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
            <WithdrawBalanceModal
              visible={modalStates[EModalId.ModalWithdrawBalance]}
              onClose={() => closeModal(EModalId.ModalWithdrawBalance)}
            />
            <WithdrawSuccessfulModal
              visible={modalStates[EModalId.ModalWithdrawSuccessful]}
              onClose={() => closeModal(EModalId.ModalWithdrawSuccessful)}
            />
            <WithdrawFailedModal
              visible={modalStates[EModalId.ModalWithdrawFailed]}
              onClose={() => closeModal(EModalId.ModalWithdrawFailed)}
              slug={slug}
            />
          </>
        )}
      </div>
      <WalletConnectModal
        visible={modalStates[EModalId.ModalWalletConnect]}
        onClose={() => closeModal(EModalId.ModalWalletConnect)}
      />
    </div>
  )
}
