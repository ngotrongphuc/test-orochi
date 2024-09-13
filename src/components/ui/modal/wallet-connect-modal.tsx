'use client'

import { useModal } from '@/app/context/modal-context'
import ItemCard from '@/app/contribute-to-earn/_components/ui/ItemCard'
import { WALLET_ACCOUNTS } from '@/app/contribute-to-earn/lib/constants'
import { EModalId } from '@/app/contribute-to-earn/lib/types'
import { isValidEIP6963Provider } from '@/app/contribute-to-earn/lib/utils'
import { useRainbowKitContext } from '@/app/contribute-to-earn/provider/rainbow-kit-provider'
import { useSyncProviders } from '@/hooks/use-sync-provider'
import { useWallet } from '@/hooks/use-wallet'
import { WalletLoginMethod } from '@/lib/graphql/type'
import { useLoginMethodsStatusStore, useXOroBalancesStore } from '@/stores'
import { FC } from 'react'
import { Modal, ModalProps } from './modal'

export const WalletConnectModal: FC<Omit<ModalProps, 'children'>> = ({
  visible,
  onClose,
}) => {
  const { handleConnect } = useWallet()
  const providers = useSyncProviders()
  const { closeModal } = useModal()
  const { openRainbowKitModal } = useRainbowKitContext()
  const { getLoginMethodsStatus } = useLoginMethodsStatusStore()
  const { getXOroBalances } = useXOroBalancesStore()

  const handleConnectWithRainbowKit = () => {
    closeModal(EModalId.ModalWalletConnect)
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
    closeModal(EModalId.ModalWalletConnect)
    // refetch connected wallets in AccountHeader if not connected yet
    getLoginMethodsStatus()
    getXOroBalances()
  }

  return (
    <Modal visible={visible} onClose={onClose}>
      <div className='flex flex-col gap-6'>
        <h3 className='text-center text-lg font-medium lg:text-3xl'>
          Choose a Wallet to connect
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
                    onItemClick={handleConnectWithRainbowKit}
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
                    handleConnectWallet(provider, id as WalletLoginMethod)
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
