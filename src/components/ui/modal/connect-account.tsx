'use client'

import { signIn } from 'next-auth/react'
import { FC, useEffect, useState } from 'react'
import { Modal } from './modal'
// social icon
import { useModal } from '@/app/context/modal-context'
import {
  TSocialLoginMethod,
  TSocialProvider,
  TLoginMethodsStatus,
} from '@/lib/graphql/type'
import { Check, Wallet } from '@phosphor-icons/react'
import Image from 'next/image'
import { Button } from '../button'
import { useToast } from '../use-toast'
import {
  queryIsThisUserOnWaitlist,
  queryLoginMethodsStatus,
} from '@/lib/graphql/queries'
import { mutateUpdateReferralDataAfterSignup } from '@/lib/graphql/mutations'
import { useIDContext } from '@/app/contribute-to-earn/provider/session-provider'
import { checkIsMethodConnected } from '@/app/contribute-to-earn/lib/utils'
import { cn } from '@/lib/utils'
import { EModalId } from '@/app/contribute-to-earn/lib/types'
import { LOGIN_METHODS } from '@/app/contribute-to-earn/lib/constants'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

const TOAST_DURATION = 5000

type ConnectedProps = {
  isConnected: boolean
}

const ConnectedState: FC<ConnectedProps> = ({ isConnected }) => {
  return (
    <div className='flex items-center justify-center gap-2'>
      <Check
        size={24}
        fill='#009231'
        className={cn(!isConnected && 'hidden')}
      />
      <p
        className={cn('text-sm md:text-base', isConnected && 'text-[#009231]')}
      >
        {isConnected ? 'Connected' : 'Connect'}
      </p>
    </div>
  )
}

type ConnectAccountModalProps = {
  visible?: boolean
  onClose: () => void
}

export const ConnectAccountModal: FC<ConnectAccountModalProps> = ({
  visible,
  onClose,
}) => {
  const [loginMethods, setLoginMethods] = useState<TLoginMethodsStatus | null>(
    null,
  )
  const [isComplete, setIsComplete] = useState<boolean>(false)
  const [isOnWaitlist, setIsOnWaitlist] = useState<boolean>(false)
  const { openModal, closeModal } = useModal()
  const { toast } = useToast()
  const { referralID } = useIDContext()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const newParams = new URLSearchParams(searchParams.toString())

  const getErrorMessage = (queryName: string): string | null => {
    return newParams.get(`${queryName}LoginError`)
  }

  const clearErrorMessage = () => {
    newParams.delete('googleLoginError')
    newParams.delete('discordLoginError')
    newParams.delete('cryptoWalletLoginError')
    router.replace(`${pathname}?${newParams.toString()}`)
  }

  const checkIsOnWaitlist = async () => {
    const result = await queryIsThisUserOnWaitlist()
    setIsOnWaitlist(result)
  }

  const fetchLoginMethods = async () => {
    const methods = await queryLoginMethodsStatus()
    if (!methods) {
      throw new Error('No data in queryLoginMethodsStatus')
    }
    setLoginMethods(methods)
  }

  const handleCreateCountLink = async (referralID: string) => {
    try {
      const result = await mutateUpdateReferralDataAfterSignup({
        referralCode: referralID,
      })
      if (!result) {
        toast({
          message: 'Fail to update referral points',
          variant: 'error',
          duration: TOAST_DURATION,
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          message: error.message,
          variant: 'error',
          duration: TOAST_DURATION,
        })
      }
    } finally {
      window.localStorage.removeItem('referralCode')
      window.location.replace('/contribute-to-earn')
    }
  }

  useEffect(() => {
    if (visible) {
      fetchLoginMethods()
      checkIsOnWaitlist()
    }
    if (referralID) {
      handleCreateCountLink(referralID)
    }
    if (isComplete) {
      closeModal(EModalId.ModalConnectAccount)
      if (!isOnWaitlist) {
        openModal(EModalId.ModalSuccessful)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  const allConnected = LOGIN_METHODS.every(({ id }) =>
    checkIsMethodConnected(loginMethods, id),
  )

  useEffect(() => {
    setIsComplete(allConnected)
  }, [allConnected])

  const handleSignInWithSocial = async (id: TSocialProvider) => {
    try {
      await signIn(id, { redirect: false })
    } catch (error) {
      if (error instanceof Error) {
        toast({
          message: error.message,
          variant: 'error',
          duration: TOAST_DURATION,
        })
      }
      return null
    }
  }

  const handleClickButton = (id: TSocialLoginMethod) => {
    if (!checkIsMethodConnected(loginMethods, id)) {
      if (id === 'cryptoWallet') {
        closeModal(EModalId.ModalConnectAccount)
        openModal(EModalId.ModalWalletConnect)
      } else {
        handleSignInWithSocial(id as TSocialProvider)
      }
    }
  }

  return (
    <Modal
      visible={visible}
      onClose={() => {
        clearErrorMessage()
        onClose()
      }}
      className='md:min-w-[80vw] lg:w-1/2 lg:min-w-0'
    >
      <div className='flex flex-col gap-6'>
        <h3 className='text-lg font-medium lg:text-3xl'>
          Account created successfully!
        </h3>
        <p className='text-md'>
          Now you can continue to connect your other account
        </p>
        <div className='flex flex-col'>
          <div className='flex flex-col gap-4'>
            {LOGIN_METHODS.map(({ id, title, image }) => {
              return (
                <div className='flex flex-col' key={id}>
                  <Button
                    intent={'white'}
                    key={id}
                    id={id}
                    onClick={() => handleClickButton(id)}
                    className={cn(
                      'flex items-center justify-between gap-8 rounded-3xl px-6 md:py-4',
                      checkIsMethodConnected(loginMethods, id) &&
                        'cursor-not-allowed hover:bg-[#d0eedac4]',
                      !checkIsMethodConnected(loginMethods, id) &&
                        getErrorMessage(id) &&
                        'border border-red-500',
                    )}
                  >
                    <div className='flex items-center gap-4 text-sm font-medium capitalize text-black md:text-md'>
                      {id === 'cryptoWallet' ? (
                        <Wallet size={30} />
                      ) : (
                        <Image
                          src={`/images/contribute-to-earn/icons/${id}.svg`}
                          alt='icon'
                          width={30}
                          height={30}
                        />
                      )}
                      Connect your {title}
                    </div>
                    <ConnectedState
                      isConnected={checkIsMethodConnected(loginMethods, id)}
                    />
                  </Button>
                  <p
                    className={cn(
                      'pl-6 pt-1 text-red-500',
                      checkIsMethodConnected(loginMethods, id) && 'hidden',
                    )}
                  >
                    {getErrorMessage(id)}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Modal>
  )
}
