'use client'
import { queryMe } from '@/lib/graphql/queries'
import { TUserProfile } from '@/lib/graphql/type'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Session } from 'next-auth'
import { SessionProvider as NextSessionProvider } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

interface SessionProviderProps {
  children: ReactNode
  session?: Session | null
}

interface IDContextType {
  referralID: string
  myProfile?: TUserProfile
  setOnChange: (value: boolean) => void
}

export const IDContext = createContext<IDContextType | undefined>(undefined)

export const useIDContext = () => {
  const context = useContext(IDContext)
  if (!context) {
    throw new Error('useIDContext must be used within a SessionProvider')
  }
  return context
}

function SessionProvider({ children, session }: SessionProviderProps) {
  const [referralID, setReferralID] = useState<string>('')
  const [myProfile, setMyProfile] = useState<TUserProfile>()
  const [onChange, setOnChange] = useState<boolean>(false)
  const param = useSearchParams().get('referralCode')

  //create query client
  const [queryClient] = useState(() => new QueryClient())

  const fetchUserProfile = async () => {
    const profile = await queryMe()
    if (profile && 'error' in profile) {
      throw new Error(profile.error)
    }
    setMyProfile(profile.data)
  }

  const saveReferralIDToLocalStorage = (id: string) => {
    setReferralID(id)
    window.localStorage.setItem('referralCode', id)
  }

  useEffect(() => {
    const storedID = window.localStorage.getItem('referralCode')
    if (storedID) {
      setReferralID(storedID)
    } else if (param) {
      saveReferralIDToLocalStorage(param)
    }
    if (session?.user || onChange) {
      fetchUserProfile()
      setOnChange(false)
    }
  }, [session, param, onChange])

  return (
    <NextSessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <IDContext.Provider value={{ referralID, myProfile, setOnChange }}>
          {children}
        </IDContext.Provider>
      </QueryClientProvider>
    </NextSessionProvider>
  )
}

export default SessionProvider
