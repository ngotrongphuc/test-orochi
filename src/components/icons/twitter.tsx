export default function Twitter(
  props: React.ComponentPropsWithoutRef<'svg'>,
  fill: string,
) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='25'
      height='25'
      fill='none'
      viewBox='0 0 25 25'
      {...props}
    >
      <path
        fill={fill}
        d='M18.25 4.273h3.067l-6.7 7.626L22.5 22.273h-6.172l-4.833-6.293-5.532 6.293H2.895l7.167-8.156L2.5 4.274h6.328l4.37 5.752 5.053-5.753zm-1.075 16.173h1.7L7.904 6.006H6.082l11.093 14.44z'
      ></path>
    </svg>
  )
}
