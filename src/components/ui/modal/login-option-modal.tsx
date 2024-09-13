'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { FC } from 'react'
import { Modal, ModalProps } from './modal'
// import { useMetamask } from '@/hooks/use-metamask'
import { useWallet } from '@/hooks/use-wallet'
import { useSyncProviders } from '@/hooks/use-sync-provider'
import { TSocialProvider, WalletLoginMethod } from '@/lib/graphql/type'
import { useModal } from '@/app/context/modal-context'
import { useIDContext } from '@/app/contribute-to-earn/provider/session-provider'
import {
  SOCIAL_ACCOUNTS,
  WALLETS_OPTIONS,
} from '@/app/contribute-to-earn/lib/constants'
import { EModalId } from '@/app/contribute-to-earn/lib/types'
import { useRainbowKitContext } from '@/app/contribute-to-earn/provider/rainbow-kit-provider'
import ItemCard from '@/app/contribute-to-earn/_components/ui/ItemCard'
import ButtonLoginWallet from '@/app/contribute-to-earn/_components/ui/ButtonLoginWallet'

export const LoginOptionModal: FC<Omit<ModalProps, 'children'>> = ({
  visible,
  onClose,
}) => {
  const { handleLogin } = useWallet()
  const { closeModal } = useModal()
  const { setOnChange } = useIDContext()
  const { openRainbowKitModal } = useRainbowKitContext()

  const handleSignInRainbowKit = () => {
    closeModal(EModalId.ModalLogin)
    openRainbowKitModal({ callback: () => setOnChange(true) })
  }

  const handleSignInWithSocial = async (id: TSocialProvider) => {
    await signIn(id, { redirect: false })
  }

  const handleSignInWallet = async (
    walletProvider: EIP6963ProviderDetail,
    walletMethod: WalletLoginMethod,
  ) => {
    handleLogin(walletProvider, walletMethod).then(() => {
      closeModal(EModalId.ModalLogin)
      setOnChange(true)
    })
  }

  return (
    <Modal visible={visible} onClose={onClose} className='h-fit xl:w-2/3'>
      <div className='flex animate-up flex-col gap-6 md:animate-none'>
        <h3 className='text-left text-lg font-semibold text-neutral-800'>
          Choose your login options
        </h3>
        <div className='flex flex-col gap-4'>
          <h5 className='text-left text-base font-medium text-neutral-700'>
            With social accounts
          </h5>
          <div className='flex flex-col gap-2 lg:flex-row'>
            {SOCIAL_ACCOUNTS.map(({ id, title, image }) => (
              <ItemCard
                size={40}
                className='flex gap-2 text-md font-medium md:flex-col md:p-2 lg:gap-4 lg:p-4'
                key={id}
                id={id}
                title={title}
                image={image}
                isActive={true}
                onItemClick={() =>
                  handleSignInWithSocial(id as TSocialProvider)
                }
              />
            ))}
          </div>
        </div>
        <div className='h-[1px] w-full bg-tint-white-70' />
        <div className='flex flex-col gap-4'>
          <h5 className='text-left text-base font-medium text-neutral-700'>
            Or with wallets
          </h5>
          <div className='flex flex-col gap-2'>
            <p className='text-neutral-700'>Recommended:</p>
            <div className='flex flex-wrap gap-2 lg:flex-nowrap'>
              {WALLETS_OPTIONS.recommended.map(
                ({ id, title, image, explorerUrl }) => (
                  <ButtonLoginWallet
                    key={id}
                    id={id}
                    title={title}
                    image={image}
                    explorerUrl={explorerUrl}
                    onClickWallet={handleSignInWallet}
                    onClickRainbowKit={handleSignInRainbowKit}
                  />
                ),
              )}
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-neutral-700'>Others:</p>
            <div className='grid grid-cols-2 gap-2 lg:flex lg:flex-nowrap'>
              {WALLETS_OPTIONS.others.map(
                ({ id, title, image, explorerUrl }) => (
                  <ButtonLoginWallet
                    key={id}
                    id={id}
                    title={title}
                    image={image}
                    explorerUrl={explorerUrl}
                    onClickWallet={handleSignInWallet}
                    onClickRainbowKit={handleSignInRainbowKit}
                  />
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
