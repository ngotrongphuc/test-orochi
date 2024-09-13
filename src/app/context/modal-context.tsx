import React, {
  createContext,
  useContext,
  useState,
  type FC,
  type ReactNode,
} from 'react'
import { EModalId, TModalStates } from '../contribute-to-earn/lib/types'

type ModalContextType = {
  modalIds: EModalId[]
  modalStates: TModalStates // Mapping from modal ID to its state
  openModal: (modalId: EModalId) => void
  closeModal: (modalId: EModalId) => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const modalIds: EModalId[] = [
    EModalId.ModalConnectAccount,
    EModalId.ModalLogin,
    EModalId.ModalNav,
    EModalId.ModalVerifyAccount,
  ]
  const [modalStates, setModalStates] = useState<TModalStates>(
    Object.fromEntries(modalIds.map((id: EModalId) => [id, false])), // All modals are initially closed
  )

  const openModal = (modalId: EModalId) => {
    setModalStates((prevStates) => {
      if (Object.values(prevStates).every((value) => value === false)) {
        return {
          ...prevStates,
          [modalId]: true,
        }
      }
      return prevStates
    })
  }

  const closeModal = (modalId: EModalId) => {
    setModalStates((prevStates) => ({
      ...prevStates,
      [modalId]: false,
    }))
  }

  return (
    <ModalContext.Provider
      value={{ modalIds, modalStates, openModal, closeModal }} // Add the 'children' property
    >
      {children}
    </ModalContext.Provider>
  )
}
