'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import React, { FC } from 'react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import dayjs from 'dayjs'
import { getTokenImageUrl, fixFloatPrice } from '@/hooks/use-service-spider'
import { ServiceSpider } from '@orochi-network/jrpc'

const handlePriceChange = (value: number) => {
  switch (true) {
    case value > 0:
      return 'bg-green-100 text-green-500 border-green-300'
    case value < 0:
      return 'bg-red-50 text-red-500 border-red-300'
    default:
      return 'bg-neutral-100 text-neutral-600 border-neutral-400'
  }
}

type TokenValueProps = {
  data: ServiceSpider.TLatestTokenPriceRecord[]
  className?: string
  isScrolled?: boolean
  epochValue: number
}

const EPOCH = [4086, 78, 4081]

export const ContractTable: FC<TokenValueProps> = ({ data, className, isScrolled, epochValue }) => {
  return (
    <Table className={cn('border-white', className)}>
      <TableHeader className={cn(
        'border-b-2 border-white sticky z-10 top-0',
        isScrolled && 'bg-white'
      )}>
        <TableRow>
          <TableHead className='pl-12 text-14 font-light text-neutral-600'>
            Symbol
          </TableHead>
          <TableHead className='text-center text-14 font-light text-neutral-600'>
            Price
          </TableHead>
          <TableHead className='text-center text-14 font-light text-neutral-600'>
            Epoch
          </TableHead>
          <TableHead className='text-center text-14 font-light text-neutral-600'>
            Last Update
          </TableHead>
        </TableRow>
      </TableHeader>
      
      <TableBody>
        {data.map((item) => (
          <React.Fragment key={item.srcSymbol}>
            <TableRow className='relative w-full border-b border-white'>
              <TableCell>
                <div className='flex flex-row items-center gap-2'>
                  <Avatar className='mb-1 h-5 w-5'>
                    <AvatarImage
                      src={getTokenImageUrl(item.srcSymbol)}
                      alt={item.srcSymbol}
                    />
                    <AvatarFallback>{item.dstSymbol}</AvatarFallback>
                  </Avatar>
                  <h5>
                    {item.srcSymbol}/
                    <span className='self-end text-[11px] text-neutral-500'>
                      {item.dstSymbol === 'USDT' ? 'USDT' : 'USD'}
                    </span>
                  </h5>
                </div>
              </TableCell>
              <TableCell>
                <div className='flex w-full items-center justify-around gap-1 lg:gap-3'>
                  <h5
                    className={cn(
                      'ml-3 lining-nums',
                      'text-neutral-600',
                      'bg-inherit',
                    )}
                  >
                    {fixFloatPrice(item.lastPrice)}
                  </h5>
                  <div
                    className={cn(
                      'flex items-center rounded-sm border px-2 text-center lining-nums',
                      handlePriceChange(item.change24h),
                    )}
                  >
                    <span
                      className={cn(
                        'text-center text-[11px]',
                        item.change24h > 0 ? 'text-green-500' : 'text-red-500',
                        item.change24h === 0 ? 'text-neutral-600' : '',
                      )}
                    >
                      {item.change24h ? (
                        <>
                          {item.change24h > 0 ? '+' : ''}
                          {item.change24h}%
                        </>
                      ) : (
                        '0.00%'
                      )}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell className='w-36'>
                <h6 className='text-gray text-center text-sm font-light lining-nums'>
                  {EPOCH[epochValue]}
                </h6>
              </TableCell>
              <TableCell className='w-36'>
                <h6 className='text-gray text-center text-sm font-light lining-nums'>
                  {dayjs(item.marketUpdate).format('DD/MM/YYYY')}
                </h6>
              </TableCell>
            </TableRow>
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  )
}
