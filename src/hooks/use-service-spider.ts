'use client'

import * as tokenImage from '@/images/orocle'
import { FixedFloat } from '@orochi-network/utilities'

export const BASE_UNIT = 10 ** 18

export const fixFloatPrice = (hexBalance: string) => {
  const balance = FixedFloat.from(hexBalance).prettyAuto('us-en', 2)

  return balance
}

type TokenImage = typeof tokenImage.a8
export const getTokenImageUrl = (token: string): string | undefined => {
  const tokenName = token.toLowerCase()
  const tokenImageMap: { [key: string]: TokenImage } = {
    a8: tokenImage.a8,
    bnb: tokenImage.bsc,
    eth: tokenImage.eth,
    u2u: tokenImage.u2u,
    usdc: tokenImage.usdc,
    usdt: tokenImage.usdt,
    ada: tokenImage.ada,
    xrp: tokenImage.xrp,
    link: tokenImage.link,
    sol: tokenImage.sol,
    dot: tokenImage.dot,
    avax: tokenImage.avax,
    sei: tokenImage.sei,
    btc: tokenImage.btc,
  }

  return tokenImageMap[tokenName]?.default?.src
}
