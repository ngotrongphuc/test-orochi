'use client'
import { deleteFile, uploadObject } from '@/actions/upload-file.action'
import { useIDContext } from '@/app/contribute-to-earn/provider/session-provider'
import { Loading } from '@/components/loading'
import { Button } from '@/components/ui/button'
import { SIZE_LIMIT, TOAST_TIMER } from '@/components/ui/modal/create-username'
import { useToast } from '@/components/ui/use-toast'
import {
  mutateProfilePictureUrl,
  mutateUsername,
} from '@/lib/graphql/mutations'
import type { TUserProfile } from '@/lib/graphql/type'
import { cn } from '@/lib/utils'
import { logger } from '@/utils/logger'
import React, {
  FormEvent,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FC,
} from 'react'
import { Upload } from '@phosphor-icons/react'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid'
import {
  accountImage,
  chuninBadge,
  heroBackground,
  retroactiveProfileBanner,
} from '@/images/contribute-to-earn'
import { History } from './History'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import useWindowDimensions from '@/hooks/use-window-dimensions'

type ProfileSettingProps = {
  data: TUserProfile
}
export const ProfileSetting: FC<ProfileSettingProps> = ({ data }) => {
  const { toast } = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>(data.profilePictureUrl)
  const [username, setUsername] = useState<string>('')
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { myProfile, setOnChange } = useIDContext()
  const [editing, setEditing] = useState<boolean>(false)
  const inputFileRef = useRef<HTMLInputElement>(null)
  const { width } = useWindowDimensions()
  const isMd = width >= 768

  const enableEdit = () => {
    setEditing(true)
    setIsSuccess(false)
    setErrorMessage(null)
  }

  const cancelEdit = () => {
    setEditing(false)
    setIsSuccess(false)
    setErrorMessage(null)
    // reset to init state
    inputFileRef.current && (inputFileRef.current.value = '')
    setImageFile(null)
    setImageUrl(data.profilePictureUrl)
    setUsername(data.username)
  }

  const onChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0])
      setImageUrl(URL.createObjectURL(event.target.files[0]))
    }
  }

  const onChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    const ALPHANUM_REGEX = /^[a-zA-Z0-9]+$/
    const value = event.target.value
    setUsername(value)
    if (!ALPHANUM_REGEX.test(value)) {
      setErrorMessage(
        'Username must not contain whitespace or special characters',
      )
    } else {
      setErrorMessage(null)
    }
  }

  const handleFileInput = async () => {
    try {
      if (imageFile) {
        setLoading(true)
        if (data.profilePictureUrl) {
          await deleteFile(data.profilePictureUrl)
        }
        if (imageFile.size > SIZE_LIMIT) {
          throw new Error('The file size is over limit')
        }
        const formData = new FormData()
        formData.append('file', imageFile)

        const imgUrl = await uploadObject({
          key: uuidv4(),
          body: formData,
        })

        if (!imgUrl) {
          throw new Error('There error while process')
        }

        const uploadAvatar = await mutateProfilePictureUrl({
          profilePictureUrl: imgUrl,
        })
        if (!uploadAvatar) {
          await deleteFile(imgUrl)
          throw new Error('Upload fail please try again later')
        }
        setImageFile(null)
        setImageUrl(uploadAvatar.profilePictureUrl)
      }
    } catch (error) {
      toast({
        message: 'There error while upload image',
        variant: 'error',
        duration: TOAST_TIMER,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault()
      if (errorMessage) {
        return
      }
      await handleFileInput()
      if (username !== data.username) {
        const response = await mutateUsername({ username })
        if (response && 'error' in response) {
          throw new Error(response.error)
        }
        setUsername(response.data)
      }
      setIsSuccess(true)
      setEditing(false)
      setOnChange(true)
    } catch (error) {
      let errorMessage = 'Something is wrong'
      if (error instanceof Error) {
        errorMessage = error.message
      }
      setErrorMessage(errorMessage)
    }
  }

  useEffect(() => {
    if (myProfile) {
      setUsername(myProfile.username)
    }
  }, [myProfile])

  return (
    <div className='flex w-full flex-col gap-6'>
      <div className='container flex h-fit flex-col items-center gap-10 rounded-3xl border border-transparent bg-blue-100 p-6 lg:w-full lg:items-start lg:p-10'>
        <div className='relative flex w-full items-center gap-6'>
          <Image
            src={imageUrl || accountImage.default.src}
            width={900}
            height={900}
            className={cn(
              'mx-0 aspect-square size-40 rounded-full object-center',
            )}
            alt='AccountDetails'
          />
          <div className={cn(!editing && 'hidden')}>
            <div>
              <label className='flex w-fit cursor-pointer flex-row items-center gap-2 text-red-500'>
                Upload your profile
                <input
                  type='file'
                  id='avatar'
                  className='hidden'
                  name='avatar'
                  onChange={onChangeImage}
                  accept='image/png, image/jpeg'
                  disabled={!editing}
                  ref={inputFileRef}
                />
                <Upload size={20} />
              </label>
            </div>
            <p className='mt-2 text-sm'>
              We recommend 300 x 300 image, in png, jpeg,
              <br />
              jpg, heic, gif formats. Max 5Mb.
            </p>
          </div>
          {loading && (
            <div
              className={cn(
                'absolute top-0 z-10 grid h-full w-full place-items-center bg-blue-tint-20',
              )}
            >
              <Loading />
            </div>
          )}
        </div>

        {myProfile?.isChunin && (
          <div className='mr-auto h-8 w-30'>
            <Image
              alt='chunin-badge'
              src={chuninBadge.default.src}
              width={336}
              height={96}
              className='h-full w-full object-fill'
            />
          </div>
        )}

        <div className='flex w-full flex-col gap-10'>
          <div>
            <label className='text-md font-medium lg:text-base'>Username</label>
            <input
              type='text'
              name='userName'
              placeholder={'Type here'}
              value={username}
              onChange={onChangeUsername}
              className={cn(
                'mt-2 h-[54px] w-full rounded-3xl bg-white md:h-16',
                'text-left text-md text-neutral-800',
                'outline-none transition-colors',
                'pl-4 placeholder:text-left placeholder:text-md lg:placeholder:text-base',
                isSuccess && 'border border-green-600',
                errorMessage && 'border border-red-500',
              )}
              disabled={!editing}
            />
            <span
              className={cn(
                'flex p-2 pb-0 text-base opacity-0 duration-500',
                isSuccess && 'text-green-600 opacity-100',
                errorMessage && 'text-red-500 opacity-100',
              )}
            >
              {isSuccess ? 'Change successfully!' : errorMessage}
            </span>
          </div>
          {editing ? (
            <div>
              <Button
                intent='primary'
                className='text-base lg:w-fit'
                onClick={handleSubmit}
              >
                SAVE CHANGES
              </Button>
              <Button
                intent='transparent'
                className='ml-2 text-base text-black lg:w-fit'
                onClick={cancelEdit}
              >
                CANCEL
              </Button>
            </div>
          ) : (
            <Button
              intent='transparent'
              className='w-fit text-base'
              onClick={enableEdit}
            >
              EDIT PROFILE
            </Button>
          )}
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(${isMd ? retroactiveProfileBanner.default.src : heroBackground.default.src})`,
        }}
        className={cn(
          'min-h-[400px] w-full rounded-3xl bg-cover bg-center bg-no-repeat md:min-h-[163px]',
        )}
      >
        <div
          className={cn(
            'flex size-full min-h-[400px] flex-col items-center justify-end gap-4 rounded-3xl p-10 md:min-h-[163px] md:flex-row md:justify-between',
            isMd
              ? 'bg-gradient-to-r from-neutral-800 from-15% via-transparent via-50% to-neutral-800 to-85%'
              : 'bg-gradient-to-t from-neutral-800 from-30% via-transparent via-60% to-transparent to-100%',
          )}
        >
          <div className='flex flex-col gap-2 text-center text-white md:text-start'>
            <p className='text-lg font-semibold'>
              Orochi RETROACTIVE {!isMd && <br />}is out now!
            </p>
            <p>
              {`Participate, Earn, Upgrade. `}
              {isMd && <br />}
              Most Wanted XORO V2 - The Gateway to $ORC
            </p>
          </div>
          <Button
            className='z-[1] flex w-full justify-center md:w-fit lg:w-[200px]'
            icon={<ArrowRight size={16} />}
            asLink
            href='/contribute-to-earn'
          >
            Join now
          </Button>
        </div>
      </div>
      <History />
    </div>
  )
}
