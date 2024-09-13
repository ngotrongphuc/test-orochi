'use client'
import { deleteFile, uploadObject } from '@/actions/upload-file.action'
import { useModal } from '@/app/context/modal-context'
import { ErrorToast } from '@/components/toast/CustomToast'
import {
  mutateProfilePictureUrl,
  mutateUsername,
} from '@/lib/graphql/mutations'
import { cn } from '@/lib/utils'
import { ArrowRight } from '@phosphor-icons/react'
import Image from 'next/image'
import {
  FormEvent,
  useEffect,
  useState,
  type ChangeEvent,
  type FC,
} from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '../button'
import { useToast } from '../use-toast'
import { Modal } from './modal'
import { useIDContext } from '@/app/contribute-to-earn/provider/session-provider'
import { EModalId } from '@/app/contribute-to-earn/lib/types'
import { imageIcon } from '@/images/contribute-to-earn/icons'

type CreateUsernameModalProps = {
  visible?: boolean
  onClose: () => void
}

export const SIZE_LIMIT = 5000000

export const TOAST_TIMER = 5000

export const CreateUsernameModal: FC<CreateUsernameModalProps> = ({
  visible,
  onClose,
}) => {
  const { openModal, closeModal } = useModal()
  const [username, setUsername] = useState<string>('')
  const { setOnChange, myProfile } = useIDContext()
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { toast } = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  const [image, setImage] = useState<string>()

  const TOAST_DURATION = 5000

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

  const handleCloseSetUsernameModal = () => {
    closeModal(EModalId.ModalCreateUsername)
    openModal(EModalId.ModalCloseWarning)
    setUsername('')
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      if (errorMessage) {
        return
      }
      const response = await mutateUsername({ username })
      if (response && 'error' in response) {
        setErrorMessage(response.error)
        return
      }
      setIsSuccess(true)
      closeModal(EModalId.ModalCreateUsername)
      openModal(EModalId.ModalConnectAccount)
      setOnChange(true)
    } catch (error) {
      toast({
        message:
          error instanceof Error ? error.message : 'Error when set username',
        duration: TOAST_DURATION,
        variant: 'error',
      })
    }
  }

  const handleFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files != null) {
        setLoading(true)
        const file = e.target.files[0]
        if (file.size > SIZE_LIMIT) {
          throw new Error('The file size is over limit')
        }
        const formData = new FormData()
        formData.append('file', file)

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
        setImage(imgUrl)
        setLoading(false)
      }
    } catch (error) {
      toast({
        message: 'There error while upload image',
        variant: 'error',
        duration: TOAST_TIMER,
      })
    }
  }

  return (
    <>
      <Modal visible={visible} onClose={handleCloseSetUsernameModal}>
        <div className='flex flex-col gap-8'>
          <h4 className='text-lg font-medium lg:text-3xl'>Setup a username</h4>
          <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
            <div>
              <label className='text-base font-medium'>
                Choose your username
              </label>
              <input
                type='text'
                name='userName'
                placeholder='Type here'
                onChange={onChangeUsername}
                className={cn(
                  'mt-2 h-[54px] w-full rounded-3xl bg-white md:h-16',
                  'text-left text-md text-neutral-800',
                  'border border-white outline-none transition-colors hocus:border-red-500',
                  'pl-4 placeholder:text-left placeholder:text-base placeholder:text-neutral-500',
                  isSuccess && 'border border-green-600',
                  errorMessage && 'border border-red-500',
                )}
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
            <div>
              <label className='text-base font-medium'>Add an avatar</label>
              <label className='cursor-pointer'>
                <input
                  type='file'
                  className='hidden'
                  onChange={handleFileInput}
                />
                <div className='my-2 flex h-[80px] w-[80px] items-center justify-center rounded-full'>
                  <Image
                    src={image || imageIcon.default.src}
                    alt='image_icon'
                    className={cn(
                      'aspect-square h-1/2 w-1/2 rounded-full object-center',
                    )}
                    width={32}
                    height={32}
                  />
                </div>
                <span className='text-base font-medium uppercase'>
                  Upload Image
                </span>
              </label>
              <p className='text-base font-normal text-[#6d6767]'>
                We recommend 300 x 300 image, in png,
                <br /> jpeg, jpg, heic, gif formats. Max 5Mb.
              </p>
            </div>
            <Button
              intent='primary'
              type='submit'
              className={cn(
                'w-full justify-center md:w-50',
                !username && 'cursor-not-allowed bg-red-300 hover:bg-red-300',
              )}
              icon={<ArrowRight size={16} />}
            >
              NEXT STEP
            </Button>
          </form>
        </div>
      </Modal>
    </>
  )
}
