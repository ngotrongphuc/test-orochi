import { useState } from 'react'

const useModal = () => {
  const [visible, setVisible] = useState<boolean>(false)

  const onClose = () => {
    setVisible(false)
  }

  const toggle = () => {
    setVisible(!visible)
  }

  return {
    onClose,
    toggle,
    visible,
  }
}

export default useModal
