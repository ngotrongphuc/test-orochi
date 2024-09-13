import { useSyncExternalStore } from 'react'
import { walletStore } from '../stores/wallet-store'

export const useSyncProviders = () =>
  useSyncExternalStore(
    walletStore.subscribe,
    walletStore.value,
    walletStore.value,
  )
