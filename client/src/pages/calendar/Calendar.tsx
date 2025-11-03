import React from 'react'
import { BoardLayout } from '../../layouts/BoardLayout'
import { CalendarCard } from './components/CalendarCard'
import { CalendarLayout } from './components/CalendarLayout'

const Calendar = () => {
  return (
    <BoardLayout children = { <CalendarLayout/> } />
  )
}

export default Calendar