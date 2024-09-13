// socials
import googleIcon from '/public/images/contribute-to-earn/icons/google.svg'
import discordIcon from '/public/images/contribute-to-earn/icons/discord.svg'
// wallets
import okxIcon from '/public/images/contribute-to-earn/icons/okx.svg'
import bigetIcon from '/public/images/contribute-to-earn/icons/bitget.svg'
import backpackIcon from '/public/images/contribute-to-earn/icons/Backpack.svg'
import metamaskIcon from '/public/images/contribute-to-earn/icons/metamask.svg'
import byBitIcon from '/public/images/contribute-to-earn/icons/bybit.svg'
import rainbowKitIcon from '/public/images/contribute-to-earn/icons/rainbow-kit.svg'
import {
  LoginMethod,
  SocialAccount,
  TWalletOptions,
  WalletAccount,
} from '../types'

export const LOGIN_METHODS: LoginMethod[] = [
  {
    id: 'discord',
    title: 'Discord',
    image: discordIcon,
  },
  {
    id: 'google',
    title: 'Google Account',
    image: googleIcon,
  },
  {
    id: 'cryptoWallet',
    title: 'Wallet',
  },
]

export const SOCIAL_ACCOUNTS: SocialAccount[] = [
  {
    id: 'discord',
    title: 'Discord',
    image: discordIcon,
  },
  {
    id: 'google',
    title: 'Google',
    image: googleIcon,
  },
]

export const WALLETS_OPTIONS: TWalletOptions = {
  recommended: [
    {
      id: 'metamask',
      title: 'MetaMask',
      image: metamaskIcon,
      explorerUrl: 'https://metamask.io/download',
    },
    {
      id: 'bitGetWallet',
      title: 'Bitget Wallet',
      image: bigetIcon,
      explorerUrl: 'https://web3.bitget.com/en/wallet-download',
    },
    {
      id: 'backpack',
      title: 'Backpack',
      image: backpackIcon,
      explorerUrl: 'https://backpack.app',
    },
  ],
  others: [
    {
      id: 'byBit',
      title: 'Bybit Wallet',
      image: byBitIcon,
      explorerUrl: 'https://www.bybit.com/en/web3/home',
    },
    {
      id: 'okx',
      title: 'OKX Wallet',
      image: okxIcon,
      explorerUrl: 'https://www.okx.com/vi/web3',
    },
    // { id: 'walletConnect', title: 'WalletConnect', image: walletConnectIcon },
    { id: 'rainbowKit', title: 'Rainbow', image: rainbowKitIcon },
    // { id: 'coinbaseWallet', title: 'Coinbase Wallet', image: coinbaseIcon },
    // { id: 'trustWallet', title: 'Trust Wallet', image: trustWalletIcon },
  ],
}

export const WALLET_ACCOUNTS: WalletAccount[] =
  Object.values(WALLETS_OPTIONS).flat()

// list of possible connectors of rainbowkit and walletconnect
export const WALLET_CONNECTORS = WALLET_ACCOUNTS.concat({
  id: 'walletConnect',
  title: 'WalletConnect',
  image: '',
})
