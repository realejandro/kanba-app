import React from 'react'
import { CalendarCard } from './CalendarCard'
import { CalendarEventsList } from './CalendarEventsList'
import { CalendarModal } from './CalendarModal'

export const CalendarLayout = () => {
  return (
    <div className='grid grid-rows-2'>
        <div>
            <CalendarModal/>
        </div>
        <div className='grid grid-cols-2 gap-5'>
            <div>
                <CalendarCard/>
            </div>
            <div>
                <CalendarEventsList />
            </div>
        </div>
    </div>
  )
}
