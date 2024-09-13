'use client'
import { DataTable } from '@/components/tableData'
import {
  TGetSuccessfulReferralsResponse,
  TSuccessfulReferral,
} from '@/lib/graphql/type'
import { Check } from '@phosphor-icons/react'
import { ColumnDef } from '@tanstack/react-table'
import { FC } from 'react'

type AccountTableProps = {
  result?: TGetSuccessfulReferralsResponse
}

export const AccountTable: FC<AccountTableProps> = ({
  result,
}: AccountTableProps) => {
  const tickFormat = (data: boolean) => {
    return data && <Check size={24} className='rounded-24 bg-neutral-100 p-1' />
  }
  const col: ColumnDef<TSuccessfulReferral>[] = [
    {
      header: 'Username',
      accessorKey: 'username',
    },
    {
      header: 'Login',
      accessorKey: 'username',
      cell: ({ row }) => <div className='md:ml-2'>{tickFormat(Boolean(row.original.username))}</div>,
    },
    {
      header: 'Verification',
      accessorKey: 'isVerified',
      cell: ({ row }) => <div className='md:ml-7'>{tickFormat(Boolean(row.original.isVerified))}</div>,
    },
    {
      header: 'Chũnin',
      accessorKey: 'isChuninUser',
      cell: ({ row }) => <div className='md:ml-4'>{tickFormat(Boolean(row.original.isChuninUser))}</div>,
    },
  ]
  return (
    <div className='h-fit rounded-3xl'>
      <DataTable
        data={result?.records || []}
        columns={col}
        showPagination={true}
      />
    </div>
  )
}
