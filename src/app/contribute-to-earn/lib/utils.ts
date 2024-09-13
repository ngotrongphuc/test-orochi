import {
  TSocialLoginMethod,
  LoginMethod,
  TLoginMethodsStatus,
  ESocialLoginMethod,
  WalletLoginMethod,
} from '@/lib/graphql/type'
import { WALLET_CONNECTORS } from './constants'
import { EPartnerName } from './types'
import {
  ancient8,
  codatta,
  kimaNetwork,
  kroma,
  kultGames,
  layerBank,
  layeredge,
  lightLink,
  saakuruProtocol,
  u2uNetwork,
  zircuit,
  zoneNine,
} from '@/images/partners/brand-marks'

export const getMaxCountAvatar = (width: number): number => {
  if (width < 375) {
    return 6
  } else if (width < 425) {
    return 10
  } else if (width < 768) {
    return 12
  } else {
    return 15
  }
}

export const checkIsMethodConnected = (
  loginMethodsStatus: TLoginMethodsStatus | undefined | null,
  method: TSocialLoginMethod,
): boolean => {
  if (
    [ESocialLoginMethod.Discord, ESocialLoginMethod.Google].includes(
      method as ESocialLoginMethod,
    )
  ) {
    return Boolean(
      loginMethodsStatus?.socialConnections.find(
        (item) => item.socialProvider === method,
      ),
    )
  }
  return (loginMethodsStatus?.walletConnections?.length ?? 0) > 0
}

export const referralCodeToUrl = (referralCode: string): string => {
  return `${process.env.NEXT_PUBLIC_APP_URL}/contribute-to-earn?referralCode=${referralCode}`
}

export const isTokenExpired = (token: string): boolean => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join(''),
  )

  const { exp } = JSON.parse(jsonPayload)
  const expired = Date.now() >= exp * 1000
  return expired
}

export const isValidEIP6963Provider = (
  provider: EIP6963ProviderDetail | undefined,
): boolean => {
  return (
    Boolean(provider) &&
    Object.keys(provider as EIP6963ProviderDetail).length > 0
  )
}

export const getWalletProviderId = (
  connectorName: string,
): WalletLoginMethod => {
  return WALLET_CONNECTORS.filter(
    (wallet) =>
      removeAllSpaces(wallet.title).toLocaleLowerCase() ===
      removeAllSpaces(connectorName).toLocaleLowerCase(),
  )[0].id
}

export const getPartnerLogoSrc = (partnerName: EPartnerName): string => {
  switch (partnerName) {
    case EPartnerName.Ancient8:
      return ancient8.default.src
    case EPartnerName.SaakuruProtocol:
      return saakuruProtocol.default.src
    case EPartnerName.KimaNetwork:
      return kimaNetwork.default.src
    case EPartnerName.U2UNetwork:
      return u2uNetwork.default.src
    case EPartnerName.LightLink:
      return lightLink.default.src
    case EPartnerName.LayerBank:
      return layerBank.default.src
    case EPartnerName.Codatta:
      return codatta.default.src
    case EPartnerName.KultGames:
      return kultGames.default.src
    case EPartnerName.ZoneNine:
      return zoneNine.default.src
    case EPartnerName.Kroma:
      return kroma.default.src
    case EPartnerName.LayerEdge:
      return layeredge.default.src
    case EPartnerName.Zircuit:
      return zircuit.default.src
    default:
      return ''
  }
}

export const isEmpty = (value: any): boolean => {
  if (value == null) {
    // Checks for null or undefined
    return true
  }

  if (typeof value === 'string' || Array.isArray(value)) {
    // Checks for empty string or empty array
    return value.length === 0
  }

  if (typeof value === 'object') {
    // Checks for empty object
    return Object.keys(value).length === 0
  }

  return false
}

export const removeAllSpaces = (str: string): string => {
  return str.replace(/ /g, '')
}
