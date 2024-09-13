'use client'

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'

// import { Typography } from '@/components/Typography'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { EVENTS } from '@/app/contribute-to-earn/lib/constants'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onRowClick?: (row: TData) => void
  className?: string

  showPagination?: boolean
  columnVisibility?: {
    [key: string]: boolean
  }
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowClick,
  className,
  showPagination,
  columnVisibility,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const {
    getHeaderGroups,
    getRowModel,
    previousPage,
    getCanPreviousPage,
    nextPage,
    getCanNextPage,
    getPageOptions,
    setPageIndex,
    getState,
  } = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
    state: {
      sorting,
      columnVisibility,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    autoResetPageIndex: true,
    // debugTable: true,
  })

  //TODO: rounded page in table the empty data will show (...)
  // ====================================================
  // const roundedPageSize = (num: number) => {
  //   if (num % 5 === 0) {
  //     return 0
  //   } else {
  //     return 5 - (num % 5) // Round up to the nearest multiple of 5
  //   }
  // }
  // useEffect(() => {
  //   // for(const [key] of Object.entries(data.map((items) => items)){
  //   //       console.log(key)
  //   // })
  //   if (data.length % 5 !== 0) {
  //     const paddingSize = roundedPageSize(data.length)
  //     for (let i = 0; i < paddingSize; i++) {
  //       // data.push({})
  //     }
  //   }
  // }, [data])
  // ====================================================
  const border = 'border-y border-transparent bg-white'

  const onRowClickHandler = (row: TData) => {
    if (onRowClick) {
      onRowClick(row)
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className={cn(className, 'min-h-96')}>
        <Table className='border-separate border-spacing-x-0 border-spacing-y-2'>
          <TableHeader className='sticky'>
            {getHeaderGroups().map(({ id, headers }) => (
              <TableRow key={id}>
                {headers.map(({ id, colSpan, column, getContext }, index) => (
                  <TableHead
                    key={id}
                    colSpan={colSpan}
                    className={cn(
                      'px-2 text-base font-normal text-neutral-600',
                      'md:px-4',
                    )}
                  >
                    {flexRender(column.columnDef.header, getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              getRowModel().rows.map(
                ({ id, original, getIsSelected, getVisibleCells }) => (
                  <TableRow
                    key={id}
                    data-state={getIsSelected() && 'selected'}
                    onClick={() => onRowClickHandler(original)}
                    className={cn(onRowClick && 'cursor-pointer')}
                  >
                    {getVisibleCells().map(
                      ({ id, column, getContext }, index) => (
                        <TableCell
                          key={id}
                          className={cn(
                            index === 0
                              ? 'rounded-s-xl pl-5.5 font-medium'
                              : 'mx-auto',
                            index === getVisibleCells().length - 1 &&
                              'rounded-e-xl font-medium',
                            border,
                          )}
                        >
                          {flexRender(column.columnDef.cell, getContext())}
                        </TableCell>
                      ),
                    )}
                  </TableRow>
                ),
              )
            ) : (
              <TableRow className='text-center'>
                <TableCell colSpan={columns.length}>
                  <p>No data found</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {showPagination && (
        <div className='flex items-center justify-end gap-2 space-x-2'>
          <Button
            intent='ghost-black'
            onClick={() => previousPage()}
            disabled={!getCanPreviousPage()}
          >
            <CaretLeft size={20} />
          </Button>
          {getPageOptions().map((pageNumber) => (
            <Button
              key={pageNumber}
              intent='ghost-black'
              onClick={() => setPageIndex(pageNumber)}
              className={cn(
                'font-sans text-md font-normal',
                pageNumber === getState().pagination.pageIndex
                  ? 'text-red-500'
                  : 'text-[#7e7c7c]',
              )}
            >
              {pageNumber + 1}
            </Button>
          ))}

          <Button
            intent='ghost-black'
            onClick={() => nextPage()}
            disabled={!getCanNextPage()}
          >
            <CaretRight size={20} />
          </Button>
        </div>
      )}
    </div>
  )
}
