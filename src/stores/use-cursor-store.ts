import { create } from 'zustand'

interface CursorState {
  isHover: boolean
  text: string
  setText: (text: string) => void
  setIsHover: (isHover: boolean) => void
}

export const useCursorStore = create<CursorState>((set) => ({
  isHover: false,
  text: 'Read',
  setText: (text) => set({ text }),
  setIsHover: (isHover) => set({ isHover }),
}))

export const useRollingStore = create<{ roll: boolean; toggle: () => void }>(
  (set) => ({
    roll: false,
    toggle: () => set((state) => ({ roll: !state.roll })),
  }),
)
