'use client'
import { EVENTS } from '@/app/contribute-to-earn/lib/constants'
import { EEventStatus, TEvent } from '@/app/contribute-to-earn/lib/types'
import { DataTable } from '@/components/tableData'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { FileText } from '@phosphor-icons/react/dist/ssr'
import type { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'
import React from 'react'

export const HistoryTable = () => {
  const column: ColumnDef<TEvent>[] = [
    {
      header: 'No.',
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      header: ({ column }) => <div className='text-start'>{column.id}</div>,
      accessorKey: 'Event',
      cell: ({ row }) => (
        <div className='line-clamp-1 text-start font-semibold'>
          {row.original.event}
        </div>
      ),
    },
    {
      header: 'Start Date',
      accessorKey: 'startDate',
    },
    {
      header: 'End Date',
      accessorKey: 'endDate',
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => (
        <div
          className={cn(
            'font-medium',
            'rounded-2xl bg-neutral-100 px-3 py-2 capitalize text-neutral-700',
            row.original.status === EEventStatus.Done &&
              'bg-green-100/50 text-green-500',
            row.original.status === EEventStatus.OnGoing &&
              'bg-blue-100 text-blue-400',
          )}
        >
          {row.original.status}
        </div>
      ),
    },
    {
      header: 'Link',
      cell: () => (
        <Button intent='outline-black' className='p-2'>
          <FileText size={18} fill='red' />
        </Button>
      ),
    },
  ]
  return (
    <div>
      <h6 className='font-semibold'>EVENT STATUS {`(${EVENTS.length})`}</h6>
      <DataTable data={EVENTS} columns={column} showPagination={true} />
    </div>
  )
}
