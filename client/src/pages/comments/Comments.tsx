import React from 'react'
import { BoardLayout } from '../../layouts/BoardLayout'
import { CommentsList } from './components/CommentsList'

const Comments = () => {
  return (
    <BoardLayout children={ <CommentsList /> } />
  )
}

export default Comments