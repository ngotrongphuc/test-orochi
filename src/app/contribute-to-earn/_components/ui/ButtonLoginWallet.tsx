import { WalletLoginMethod } from '@/lib/graphql/type'
import React, { FC } from 'react'
import ItemCard from './ItemCard'
import { isValidEIP6963Provider } from '../../lib/utils'
import { useSyncProviders } from '@/hooks/use-sync-provider'
import { cn } from '@/lib/utils'

type TButtonLoginWalletProps = {
  id: WalletLoginMethod
  title: string
  image: string
  explorerUrl?: string
  onClickWallet: (
    walletProvider: EIP6963ProviderDetail,
    walletMethod: WalletLoginMethod,
  ) => void
  onClickRainbowKit: () => void
  className?: string
}

const ButtonLoginWallet: FC<TButtonLoginWalletProps> = ({
  id,
  title,
  image,
  explorerUrl,
  onClickWallet,
  onClickRainbowKit,
  className,
}) => {
  const providers = useSyncProviders()

  if (id === 'rainbowKit') {
    return (
      <ItemCard
        size={20}
        className={cn(className)}
        key={id}
        id={id}
        title={title}
        image={image}
        isActive
        onItemClick={onClickRainbowKit}
      />
    )
  }
  const provider = providers.find(
    (pro) => pro.info.name.toLowerCase() === title.toLowerCase(),
  )
  return (
    <ItemCard
      size={20}
      className={cn(className)}
      key={id}
      id={id}
      title={title}
      image={image}
      isActive={isValidEIP6963Provider(provider)}
      explorerUrl={explorerUrl}
      onItemClick={() =>
        provider && onClickWallet(provider, id as WalletLoginMethod)
      }
    />
  )
}

export default ButtonLoginWallet
