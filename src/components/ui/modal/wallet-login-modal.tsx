'use client'

import { FC, useState } from 'react'
import { Modal, ModalProps } from './modal'
// import { useMetamask } from '@/hooks/use-metamask'
import { useWallet } from '@/hooks/use-wallet'
import { useSyncProviders } from '@/hooks/use-sync-provider'
import { WalletLoginMethod } from '@/lib/graphql/type'
import { useModal } from '@/app/context/modal-context'
import { WALLET_ACCOUNTS } from '@/app/contribute-to-earn/lib/constants'
import { EModalId } from '@/app/contribute-to-earn/lib/types'
import { useIDContext } from '@/app/contribute-to-earn/provider/session-provider'
import { useRainbowKitContext } from '@/app/contribute-to-earn/provider/rainbow-kit-provider'
import ItemCard from '@/app/contribute-to-earn/_components/ui/ItemCard'
import { isValidEIP6963Provider } from '@/app/contribute-to-earn/lib/utils'

export const WalletLoginModal: FC<Omit<ModalProps, 'children'>> = ({
  visible,
  onClose,
}) => {
  const { handleLogin } = useWallet()
  const providers = useSyncProviders()
  const { closeModal } = useModal()
  const { setOnChange } = useIDContext()
  const { openRainbowKitModal } = useRainbowKitContext()

  const handleSignInWithRainbowKit = () => {
    closeModal(EModalId.ModalWalletLogin)
    openRainbowKitModal({
      callback: () => {
        setOnChange(true)
      },
    })
  }

  const handleSignInWallet = async (
    walletProvider: EIP6963ProviderDetail,
    walletMethod: WalletLoginMethod,
  ) => {
    await handleLogin(walletProvider, walletMethod)
    closeModal(EModalId.ModalWalletLogin)
    setOnChange(true)
  }

  return (
    <Modal visible={visible} onClose={onClose}>
      <div className='flex flex-col gap-6'>
        <h3 className='text-center text-lg font-medium lg:text-3xl'>
          Choose a Wallet to login
        </h3>
        <div className='flex flex-col gap-2'>
          <div className='grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3'>
            {WALLET_ACCOUNTS.map(({ id, title, image, explorerUrl }) => {
              if (id === 'rainbowKit') {
                return (
                  <ItemCard
                    size={28}
                    className='md:text-md'
                    key={id}
                    id={id}
                    title={title}
                    image={image}
                    isActive
                    onItemClick={handleSignInWithRainbowKit}
                  />
                )
              }
              const provider = providers.find(
                (pro) => pro.info.name.toLowerCase() === title.toLowerCase(),
              )
              return (
                <ItemCard
                  size={28}
                  className='text-nowrap md:text-md'
                  key={id}
                  id={id}
                  title={title}
                  image={image}
                  isActive={isValidEIP6963Provider(provider)}
                  explorerUrl={explorerUrl}
                  onItemClick={() =>
                    provider &&
                    handleSignInWallet(provider, id as WalletLoginMethod)
                  }
                />
              )
            })}
          </div>
        </div>
        {/* <Button
          icon={<ArrowRight size={24} />}
          className="mx-auto"
          intent="transparent"
        >
          MORE OPTIONS
        </Button> */}
      </div>
    </Modal>
  )
}
