import { ExploreDropdown } from '../components/explore-dropdown'

export type Link = {
  label: string
  href: string
  isComingSoon?: boolean
  children?:
    | { label: string; href: string; isComingSoon?: boolean }[]
    | React.ReactNode
}

export const EXPLORE_ABOUT: Link[] = [
  { label: 'COMMUNITY', href: '#footer', isComingSoon: false },
  { label: 'ROADMAP', href: '#', isComingSoon: true },
  { label: 'USE CASES / TESTIMONIAL', href: '#', isComingSoon: true },
  { label: 'WORK WITH OROCHI', href: '#', isComingSoon: true },
  { label: 'POLICY', href: '#', isComingSoon: true },
  { label: 'FAQ', href: '#', isComingSoon: true },
]

export const EXPLORE_FOR: Link[] = [
  { label: 'SMART CONTRACT PLATFORMS', href: '#', isComingSoon: true },
  { label: 'DAPPS/ZKAPPS', href: '#', isComingSoon: true },
  { label: 'VALIDATORS', href: '#', isComingSoon: true },
  { label: 'DEVELOPERS', href: '#', isComingSoon: true },
  { label: 'RETAIL USERS', href: '#', isComingSoon: true },
]

export const NAVIGATION_ITEMS: Link[] = [
  {
    label: 'EXPLORE',
    href: '#',
    // children: <ExploreDropdown />,
    children: [
      {
        label: 'ABOUT US',
        href: '/about',
        isComingSoon: false,
      },
    ],
  },
  {
    label: 'PRODUCTS',
    href: '#',
    children: [
      {
        label: 'ZKDATABASE',
        href: '/zkdatabase',
        isComingSoon: false,
      },
      // Coming soon
      // {
      //   label: 'ZKMEMORY',
      //   href: '#',
      //   isComingSoon: true,
      // },
      // {
      //   label: 'OROSIGN',
      //   href: '#',
      //   isComingSoon: true,
      // },
      {
        label: 'OROCLE',
        href: '/orocle',
        isComingSoon: false,
      },
      {
        label: 'ORAND',
        href: '/orand',
        isComingSoon: false,
      },
    ],
  },
  {
    label: 'DOCUMENT',
    href: 'https://docs.orochi.network/',
  },
  {
    label: 'RAMenPaSTA',
    href: 'https://eprint.iacr.org/2024/336',
  },
  {
    label: 'RETROACTIVE',
    href: '/contribute-to-earn',
  },
  {
    label: 'BLOG',
    href: 'https://orochi.network/blog',
  },
  {
    label: 'PRICING',
    href: 'https://dashboard.orochi.network/',
  },
]

export const RETROACTIVE_ITEMS: Link[] = [
  {
    label: 'CAMPAIGNS',
    href: '#',
    // children: <ExploreDropdown />,
  },
  {
    label: 'HOW TO CLAIM',
    href: '#',
    // children: <ExploreDropdown />,
  },
  {
    label: 'LEADERBOARDS',
    href: '#',
    // children: <ExploreDropdown />,
  },
]

export const RAMenPaSTA_URL = 'https://eprint.iacr.org/2024/336'
export const OROCHI_DASHBOARD = 'https://dashboard.orochi.network/home'
export const DEFAULT_DEVELOPMENT_URL = 'http://localhost:3000'

export const GOOGLE_TAG_MANAGER_URL =
  'https://www.googletagmanager.com/gtag/js?id=G-R9CTTLBRX9'
export const SCRIPT_INNER_HTML = {
  __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-R9CTTLBRX9');
  `,
}

export enum SessionErrorMessage {
  Error401 = 'Response not successful: Received status code 401',
  InvalidCredentials = 'Invalid credentials',
  Authorized = 'Access token is required for authorized operations',
  TokenExpired = 'Token is invalid or expired.',
  ErrorJWT = 'JWT verification failed',
}
