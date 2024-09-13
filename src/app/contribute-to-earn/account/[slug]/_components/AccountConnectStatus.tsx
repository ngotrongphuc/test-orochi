'use client'
import { useModal } from '@/app/context/modal-context'
import { LOGIN_METHODS } from '@/app/contribute-to-earn/lib/constants'
import { EModalId } from '@/app/contribute-to-earn/lib/types'
import { checkIsMethodConnected } from '@/app/contribute-to-earn/lib/utils'
import { Chip } from '@/components/chip'
import { Button } from '@/components/ui/button'
import { ConnectAccountModal, WalletConnectModal } from '@/components/ui/modal'
import type { TLoginMethodsStatus } from '@/lib/graphql/type'
import { cn } from '@/lib/utils'
import { useLoginMethodsStatusStore } from '@/stores'
import { ArrowRight, Wallet } from '@phosphor-icons/react'
import Image from 'next/image'
import { useEffect, useState, type FC } from 'react'

export const AccountConnectStatus = () => {
  const { modalStates, closeModal, openModal } = useModal()
  const [isComplete, setIsComplete] = useState<boolean>(false)
  const { loginMethodsStatus } = useLoginMethodsStatusStore()

  const allConnected = LOGIN_METHODS.every(({ id }) =>
    checkIsMethodConnected(loginMethodsStatus, id),
  )

  useEffect(() => {
    setIsComplete(allConnected)
  }, [allConnected])

  return (
    <div
      className={cn(
        'max-w-full rounded-3xl border border-transparent bg-blue-100 p-4',
        isComplete && 'hidden',
      )}
    >
      <div className='container'>
        <div className='flex flex-col items-center justify-center gap-4'>
          <p className='max-w-78 text-center text-md lg:text-wrap lg:text-base'>
            You haven&apos;t completed connecting your account
          </p>
          <div className='grid w-full grid-cols-3 gap-2 lg:flex lg:flex-col'>
            {LOGIN_METHODS.map(({ id }) => {
              return (
                <Chip
                  key={id}
                  icon={
                    id === 'cryptoWallet' ? (
                      <Wallet size={20} />
                    ) : (
                      <Image
                        src={`/images/contribute-to-earn/icons/${id}.svg`}
                        alt='icon'
                        width={20}
                        height={20}
                      />
                    )
                  }
                  isActive={checkIsMethodConnected(loginMethodsStatus, id)}
                />
              )
            })}
          </div>
          <Button
            className='w-full justify-center rounded-full lg:rounded-2xl'
            icon={<ArrowRight size={16} />}
            onClick={() => openModal(EModalId.ModalConnectAccount)}
          >
            Connect
          </Button>
        </div>
        <ConnectAccountModal
          visible={modalStates[EModalId.ModalConnectAccount]}
          onClose={() => closeModal(EModalId.ModalConnectAccount)}
        />
        <WalletConnectModal
          visible={modalStates[EModalId.ModalWalletConnect]}
          onClose={() => closeModal(EModalId.ModalWalletConnect)}
        />
      </div>
    </div>
  )
}
