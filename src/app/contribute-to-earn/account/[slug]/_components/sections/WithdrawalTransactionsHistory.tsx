import { EModalId, TWithdrawalHistory } from '@/app/contribute-to-earn/lib/types'
import { DataTable } from '@/components/tableData'
import {
  ETokenWithdrawalStatus,
  TGetTokenWithdrawalHistoryFields,
  TTokenWithdrawalHistory,
} from '@/lib/graphql/type'
import { cn } from '@/lib/utils'
import { shortenString } from '@/utils'
import { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'
import React, { FC } from 'react'
import { useModal } from '@/app/context/modal-context'
import { CHAINS } from '@/app/contribute-to-earn/lib/constants'

type TWithdrawalTransactionsHistoryProps = {
  data?: TGetTokenWithdrawalHistoryFields
}

const WithdrawalTransactionsHistory: FC<
  TWithdrawalTransactionsHistoryProps
> = ({ data }) => {
  const { openModal } = useModal()

  const column: ColumnDef<TTokenWithdrawalHistory>[] = [
    {
      header: 'Address',
      accessorKey: 'walletAddress',
      cell: ({ row }) => <div>{shortenString(row.original.walletAddress)}</div>,
    },
    {
      header: 'Chain',
      accessorKey: 'token',
      cell: ({ row }) => {
        const chainData = CHAINS.find(
          (chain) =>
            chain.chainId.toString() === row.original.chainId.toString(),
        )
        return <div>{chainData?.currency}</div>
      },
    },
    // TODO: add wallet after backend implemented
    // {
    //   header: 'Wallet',
    //   accessorKey: '',
    // },
    {
      header: 'Amount',
      accessorKey: 'amount',
      cell: ({ row }) => <div>{Number(row.original.amount)}</div>,
    },
    {
      header: 'Withdrawal date',
      accessorKey: 'createdAt',
      cell: ({ row }) => (
        <div>{dayjs(row.original.createdAt).format('DD/MM/YYYY')}</div>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => (
        <div
          className={cn(
            'flex flex-col items-center font-medium',
            'rounded-2xl bg-neutral-100 px-3 py-2 capitalize text-neutral-700',
            row.original.status === ETokenWithdrawalStatus.Minted &&
              'bg-green-100/50 text-green-500',
            (row.original.status === ETokenWithdrawalStatus.Transacting ||
              row.original.status === ETokenWithdrawalStatus.Signed) &&
              'bg-red-100/50 text-red-500',
          )}
        >
          {row.original.status}
        </div>
      ),
    },
    {
      header: '',
      accessorKey: 'actionButton',
      cell: ({ row }) => (
        <div
          className={cn(
            row.original.status === ETokenWithdrawalStatus.Minted && 'hidden',
          )}
        >
          <button
            className='rounded-xl border border-red-500 px-3 py-2 font-semibold normal-case text-red-500'
            onClick={() => openModal(EModalId.ModalWithdrawBalance)}
          >
            Retry
          </button>
        </div>
      ),
    },
  ]
  return (
    <div className='flex flex-col gap-8 overflow-x-auto rounded-3xl border border-transparent bg-blue-100 p-6 lg:p-10'>
      <h6 className='font-semibold'>WITHDRAWAL TRANSACTIONS HISTORY</h6>
      <DataTable
        data={data?.records || []}
        columns={column}
        showPagination={true}
      />
    </div>
  )
}

export default WithdrawalTransactionsHistory
