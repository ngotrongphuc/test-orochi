import { create } from 'zustand'

type MobileNav = {
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
}
export const useMobileNavStore = create<MobileNav>((set) => ({
  openMobile: false,
  setOpenMobile: () => set((state) => ({ openMobile: !state.openMobile })),
}))
