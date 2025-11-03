import { useMutation, useQuery } from '@apollo/client/react';
import { MouseEventHandler, useEffect } from 'react'
import { GET_COMMENTS } from '../../../utils/schema/queries';
import { CommentData } from '../../../interfaces/CommentData';
import { CommentsForm } from './CommentsForm';
import { DELETE_COMMENT } from '../../../utils/schema/mutations';
import { CommentsModal } from './CommentsModal';


interface GetCommentsData{
    comments: CommentData[];
}

export const CommentsList = () => {

  const { data, loading, error } = useQuery<GetCommentsData>(GET_COMMENTS)
  const [deleteComment] = useMutation(DELETE_COMMENT, { 
    refetchQueries:[{
      query: GET_COMMENTS
    }]
  })
  const comments = data?.comments ?? [];

  useEffect(() => {
    console.log(comments) 
  }, [comments])


  useEffect(() => {
    if (data) {
      console.log("Fetched comments:", data.comments);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error fetching comments</p>;

  const onDeleteComment = async( id:number ) => {
    
    try {
      await deleteComment({
        variables:{ id }
      })
    } catch(error) {
      console.log(error)
    }
  }
  
  
  const commentListElement = () => {

    return comments.map( comment => {
        return (
            <div key={comment.id} className='flex flex-row w-5/6 p-5 shadow-xl rounded-xl border-solid'>
                <div className='flex basis-1/2  border-red-50 gap-2'>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path 
                            fillRule="evenodd" 
                            clipRule="evenodd" 
                            d="M2.43311 5.0001C2.43311 4.50304 2.83605 4.1001 3.33311 4.1001L16.6664 4.1001C17.1635 4.1001 17.5664 4.50304 17.5664 5.0001C17.5664 5.49715 17.1635 5.9001 16.6664 5.9001L3.33311 5.9001C2.83605 5.9001 2.43311 5.49716 2.43311 5.0001ZM2.43311 15.0001C2.43311 14.503 2.83605 14.1001 3.33311 14.1001L16.6664 14.1001C17.1635 14.1001 17.5664 14.503 17.5664 15.0001C17.5664 15.4972 17.1635 15.9001 16.6664 15.9001L3.33311 15.9001C2.83605 15.9001 2.43311 15.4972 2.43311 15.0001ZM3.33311 9.1001C2.83605 9.1001 2.43311 9.50304 2.43311 10.0001C2.43311 10.4972 2.83605 10.9001 3.33311 10.9001L16.6664 10.9001C17.1635 10.9001 17.5664 10.4972 17.5664 10.0001C17.5664 9.50304 17.1635 9.1001 16.6664 9.1001L3.33311 9.1001Z" fill="currentColor">
                        </path>
                    </svg>
                    <div>{ comment.content }</div>
                </div>
                <div className='basis-1/2'>
                    {comment.content + " This is it"}
                    <button className="btn btn-active btn-success">Update</button>
                    <button className="btn btn-active btn-warning" onClick={() => onDeleteComment(comment.id!)}>X</button>
                </div>
            </div>
        )
    })
  } 
  
  return (
    <div className='flex flex-col w-full items-center mt-5'>
        <CommentsModal/>
        <div className='flex w-5/6 align-start'>
            <h2 className='text-start' >Comments:</h2>
        </div>
         { commentListElement() }
    </div>
  )
}

