import {
  Crosshair,
  DiscordLogo,
  GameController,
  GithubLogo,
  Globe,
  LinkedinLogo,
  LinkSimpleHorizontal,
  Scroll,
  TelegramLogo,
  UserCircleCheck,
  UserPlus,
  Video,
  XLogo,
} from '@phosphor-icons/react/dist/ssr'
import { FC } from 'react'

type QuestIconProps = {
  icon?: string
  size?: number
}

const QuestIcon: FC<QuestIconProps> = ({ icon, size = 20 }) => {
  switch (icon) {
    case 'XLogo':
      return <XLogo size={20} weight='fill' />
    case 'DiscordLogo':
      return <DiscordLogo size={20} weight='fill' />
    case 'TelegramLogo':
      return <TelegramLogo size={20} weight='fill' />
    case 'LinkedinLogo':
      return <LinkedinLogo size={20} weight='fill' />
    case 'Globe':
      return <Globe size={20} weight='fill' />
    case 'GithubLogo':
      return <GithubLogo size={20} weight='fill' />
    case 'Scroll':
      return <Scroll size={20} weight='fill' />
    case 'LinkSimpleHorizontal':
      return <LinkSimpleHorizontal size={20} weight='fill' />
    case 'UserCircleCheck':
      return <UserCircleCheck size={20} weight='fill' />
    case 'UserPlus':
      return <UserPlus size={20} weight='fill' />
    case 'Crosshair':
      return <Crosshair size={20} weight='fill' />
    case 'Video':
      return <Video size={20} weight='fill' />
    case 'GameController':
      return <GameController size={20} weight='fill' />
    default:
      return
  }
}

export default QuestIcon
