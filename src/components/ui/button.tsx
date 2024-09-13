import Link, { LinkProps } from 'next/link'

import { cva, VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const button = cva(
  'cursor-pointer text-sm font-semibold uppercase transition-colors duration-300 disabled:cursor-not-allowed',
  {
    variants: {
      intent: {
        primary: [
          'rounded-btn bg-red-500 px-4 py-3 text-white',
          'hover:bg-red-600',
          'disabled:opacity-50',
          'btn-animation',
        ],

        white: [
          'rounded-btn bg-white px-4 py-3 text-red-500',
          'hover:bg-red-50',
          'disabled:bg-red-50 disabled:opacity-50',
          'btn-animation',
        ],

        black: [
          'rounded-btn bg-black/80 px-4 py-3 text-white',
          'hover:bg-black',
          'disabled:bg-black/50 disabled:opacity-50',
          'btn-animation',
        ],

        transparent: [
          'rounded-btn bg-transparent px-4 py-3 text-red-500',
          'btn-animation',
        ],

        'outline-brand': [
          'rounded-btn border border-neutral-300 px-4 py-3 text-red-500',
          'hover:border-red-500',
          'disabled:opacity-50',
          'btn-animation',
        ],

        'outline-black': [
          'rounded-btn border border-neutral-300 px-4 py-3 text-black',
          'hover:border-red-500',
          'disabled:opacity-50',
          'btn-animation',
        ],

        'ghost-brand': [
          'relative h-[29px] overflow-hidden text-red-500',
          'hover:text-black',
          'before:0 before:absolute before:bottom-0 before:z-[1] before:h-[1px] before:w-full before:scale-0 before:bg-red-500 before:transition-transform before:duration-300',
          'hover:before:scale-100',
          'disabled:opacity-50',
        ],

        'ghost-black': [
          'text-red-black relative h-[29px] overflow-hidden',
          'hover:text-red-500',
          'before:0 before:absolute before:bottom-0 before:z-[1] before:h-[1px] before:w-full before:scale-0 before:bg-red-500 before:transition-transform before:duration-300',
          'hover:before:scale-100',
          'disabled:opacity-50',
        ],
      },
      icon: {
        true: 'flex items-center justify-end gap-2',
      },
      reverseIcon: {
        true: 'flex-row-reverse',
      },
      iconOnly: {
        true: 'grid aspect-square grid-cols-1 place-items-center rounded-full p-0 ',
      },
    },
    compoundVariants: [],
    defaultVariants: {
      intent: 'primary',
    },
  },
)

type DefaultButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
type DefaultLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  LinkProps
type ButtonVariantsProps = Omit<VariantProps<typeof button>, 'icon'>
type CustomButtonProps = {
  icon?: React.ReactNode
  iconOnly?: boolean
}

export type ButtonProps = (
  | (DefaultButtonProps & { asLink?: undefined })
  | (DefaultLinkProps & { asLink: true })
) &
  ButtonVariantsProps &
  CustomButtonProps

export function Button({
  intent,
  icon,
  iconOnly,
  children,
  className,
  reverseIcon,
  ...props
}: ButtonProps) {
  const iconChildren = (
    <>
      {!iconOnly && <span className="btn-l">{children}</span>}
      {<span className={iconOnly ? '' : 'btn-r'}>{icon}</span>}
    </>
  )

  const commonProps = {
    className: cn(
      button({ intent, icon: Boolean(icon), iconOnly, reverseIcon }),
      className,
    ),
    children: icon ? iconChildren : children,
  }

  if ('asLink' in props && props.asLink) {
    const { asLink, ...leftProps } = props
    return <Link {...commonProps} {...leftProps}></Link>
  }

  return <button {...commonProps} {...props} />
}
