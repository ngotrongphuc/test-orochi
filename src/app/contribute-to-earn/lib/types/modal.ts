export enum EModalId {
  ModalLogin = 'modalLogin',
  ModalVerifyAccount = 'modalVerifyAccount',
  ModalConnectAccount = 'modalConnectAccount',
  ModalNav = 'modalNav',
  ModalWalletLogin = 'modalWalletLogin',
  ModalWalletConnect = 'modalWalletConnect',
  ModalCloseWarning = 'modalCloseWarning',
  ModalSuccessful = 'modalSuccessful',
  ModalCreateUsername = 'modalCreateUsername',
  ModalWithdrawBalance = 'modalWithdrawBalance',
  ModalWithdrawSuccessful = 'modalWithdrawSuccessful',
  ModalWithdrawFailed = 'modalWithdrawFailed',
}

export type TModalStates = {
  [key in EModalId]?: boolean
}
