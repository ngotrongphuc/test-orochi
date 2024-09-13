import {
  ClassNameValue,
  getDefaultConfig,
  extendTailwindMerge,
} from 'tailwind-merge'

import tailwindConfig from '../../tailwind.config'

const defaultConfig = getDefaultConfig()

const tailwindConfigExtend = tailwindConfig.theme?.extend as {
  borderRadius: object
  zIndex: object
  boxShadow: object
}

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      rounded: [
        ...defaultConfig.classGroups['rounded'],
        { rounded: Object.keys(tailwindConfigExtend.borderRadius) },
      ],
      z: [
        ...defaultConfig.classGroups['z'],
        { z: Object.keys(tailwindConfigExtend.zIndex) },
      ],
      shadow: [
        ...defaultConfig.classGroups['shadow'],
        { shadow: Object.keys(tailwindConfigExtend.boxShadow) },
      ],
    },
  },
})

export function cn(...inputs: ClassNameValue[]) {
  return customTwMerge(inputs)
}
