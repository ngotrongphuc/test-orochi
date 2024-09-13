export type Quest = {
  id: string
  title: string
  description: string
  icon?: string
  reward: string
  partnerLogo?: string
  partnerName?: string
  image?: string
}

export type Tab = {
  id: string
  title: string
  disabled: boolean
  quests: Quest[]
}

export enum EPartnerName {
  Ancient8 = 'Ancient8',
  SaakuruProtocol = 'Saakuru Protocol',
  KimaNetwork = 'Kima Network',
  U2UNetwork = 'U2U Network',
  LightLink = 'LightLink',
  LayerBank = 'LayerBank',
  Codatta = 'Codatta',
  KultGames = 'Kult Games',
  ZoneNine = 'Zone Nine',
  Kroma = 'Kroma',
  LayerEdge = 'LayerEdge',
  Zircuit = 'Zircuit',
}
