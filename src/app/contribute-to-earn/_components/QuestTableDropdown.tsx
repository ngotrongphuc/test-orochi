import React from 'react'
import * as Select from '@radix-ui/react-select'
import { cn } from '@/lib/utils'
import { Tab } from '../lib/types'
import { CaretDown, Check } from '@phosphor-icons/react/dist/ssr'
import { TQuest } from '@/lib/graphql/type'

const QuestTableDropdown = React.forwardRef<
  React.ElementRef<typeof Select.Root>,
  React.ComponentPropsWithoutRef<typeof Select.Root> & { items: TQuest[] }
>(({ items, defaultValue, onValueChange, value }, forwardedRef) => {
  return (
    <Select.Root
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      value={value}
    >
      <Select.Trigger className='text-xl flex w-full justify-between rounded-3xl border-[1px] border-neutral-400 bg-white p-4 text-left outline-none'>
        <Select.Value />
        <Select.Icon>
          <CaretDown size={20} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className='z-cursor overflow-auto rounded-3xl bg-white shadow-md'>
          <Select.Viewport>
            <Select.Group>
              {items.map((item) => (
                <SelectItem
                  key={item.uuid}
                  value={item.uuid}
                  className={cn(!item.isActive && 'text-neutral-500')}
                >
                  {item.name}
                </SelectItem>
              ))}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
})
QuestTableDropdown.displayName = Select.Root.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof Select.Item>,
  React.ComponentPropsWithoutRef<typeof Select.Item>
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <Select.Item
      className={cn(
        'cursor-pointer p-4 hover:bg-neutral-300 data-[disabled]:cursor-default data-[disabled]:text-neutral-500',
        className,
      )}
      {...props}
      ref={forwardedRef}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className='absolute right-4 items-center justify-center'>
        <Check size={20} />
      </Select.ItemIndicator>
    </Select.Item>
  )
})
SelectItem.displayName = Select.Item.displayName

export default QuestTableDropdown
