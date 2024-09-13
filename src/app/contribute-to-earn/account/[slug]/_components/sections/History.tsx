import React from 'react'
import { HistoryTable } from '../../history/_components/HistoryTable'

export const History = () => {
  return (
    <div className='container flex h-fit flex-col overflow-x-auto rounded-3xl border border-transparent bg-blue-100 p-6 lg:p-10'>
      <HistoryTable />
    </div>
  )
}
