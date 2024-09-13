'use client'
/* eslint-disable @next/next/no-img-element */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { star2, trophy } from '@/images/contribute-to-earn/table'
import { cn } from '@/lib/utils'
import { useLeaderBoardStore } from '@/stores'
import Image from 'next/image'

export const RankingTable = () => {
  const border = 'border-y border-transparent bg-tint-10'
  const { userReferralLeaderboard } = useLeaderBoardStore()

  return (
    <Table className='border-separate border-spacing-x-0 border-spacing-y-2'>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead className='text-center'>Username</TableHead>
          <TableHead className='text-center'>Invited By</TableHead>
          <TableHead className='text-center'>Successful referrals</TableHead>
          {/* <TableHead></TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(10)].map((_, index) => {
          const rowData = userReferralLeaderboard?.records[index]
          const isDataAvailable = !!rowData // Check if data exists for this index

          return (
            <TableRow
              className='bg-blue-tint-10 hover:bg-blue-tint-20'
              key={index}
            >
              <TableCell
                className={cn(
                  'w-1/6 rounded-s-2xl border-l font-medium',
                  index === 0
                    ? 'border-y border-blue-400 bg-blue-tint-20'
                    : border,
                )}
              >
                <div className='flex h-10 w-10 items-center justify-center rounded-full text-center'>
                  {index < 3 && (
                    <Image
                      src={star2.default.src}
                      alt='start-2'
                      className='absolute'
                      width={50}
                      height={50}
                      sizes='100%'
                    />
                  )}
                  {index < 1 && (
                    <Image
                      src={trophy.default.src}
                      alt='trophy'
                      className='absolute z-20'
                      width={30}
                      height={30}
                      sizes='100%'
                    />
                  )}
                  <p
                    className={cn(
                      'z-10 text-center text-md font-semibold',
                      index > 2 && 'text-neutral-600',
                    )}
                  >
                    {/* first user will show trophy img, not show number, so index=0 show emty string */}
                    {index !== 0 ? index + 1 : ''}
                  </p>
                </div>
              </TableCell>
              <TableCell
                className={cn(
                  index === 0
                    ? 'border-y border-blue-400 bg-blue-tint-20'
                    : border,
                  'w-1/4 text-center',
                )}
              >
                {isDataAvailable ? rowData.username : '...'}
              </TableCell>
              <TableCell
                className={cn(
                  index === 0
                    ? 'border-y border-blue-400 bg-blue-tint-20'
                    : border,
                  'w-1/4 text-center',
                )}
              >
                {isDataAvailable ? rowData.referrerUsername : '...'}
              </TableCell>
              <TableCell
                className={cn(
                  index === 0
                    ? 'border-y border-blue-400 bg-blue-tint-20'
                    : border,
                  'w-1/4 text-center',
                  'rounded-e-2xl border-r',
                )}
              >
                {isDataAvailable ? rowData.referralCount : '...'}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
