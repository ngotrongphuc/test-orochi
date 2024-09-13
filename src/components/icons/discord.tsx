export default function Discord(
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
        d='M20.115 5.686a17.615 17.615 0 00-4.474-1.413.093.093 0 00-.073.032c-.189.35-.409.808-.555 1.158a16.628 16.628 0 00-5.029 0 10.712 10.712 0 00-.566-1.158c-.01-.02-.042-.032-.073-.032-1.572.277-3.07.755-4.474 1.413-.01 0-.02.01-.03.021-2.85 4.324-3.636 8.53-3.249 12.694 0 .021.01.043.032.053a18.1 18.1 0 005.49 2.815c.03.01.062 0 .073-.021.419-.584.796-1.2 1.12-1.849.022-.042 0-.085-.041-.095a12.816 12.816 0 01-1.718-.829c-.042-.02-.042-.085-.01-.117.114-.084.23-.18.345-.265a.064.064 0 01.073-.01c3.604 1.667 7.491 1.667 11.053 0a.064.064 0 01.073.01c.116.096.23.18.346.276.042.032.042.096-.01.117-.545.33-1.121.595-1.719.828-.042.011-.052.064-.042.096.336.648.713 1.264 1.122 1.848.031.011.062.022.094.011a18.028 18.028 0 005.5-2.815.059.059 0 00.031-.053c.461-4.812-.764-8.986-3.247-12.694-.01-.01-.021-.02-.042-.02zM8.853 15.862c-1.08 0-1.98-1.009-1.98-2.252 0-1.242.88-2.252 1.98-2.252 1.11 0 1.99 1.02 1.98 2.252 0 1.243-.88 2.252-1.98 2.252zm7.302 0c-1.08 0-1.98-1.009-1.98-2.252 0-1.242.88-2.252 1.98-2.252 1.11 0 1.99 1.02 1.98 2.252 0 1.243-.87 2.252-1.98 2.252z'
      ></path>
    </svg>
  )
}
