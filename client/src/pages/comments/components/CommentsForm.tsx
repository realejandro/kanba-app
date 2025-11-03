import { ChangeEvent, FormEvent, useState } from 'react'
import { CommentData } from '../../../interfaces/CommentData'
import { CREATE_COMMENT } from '../../../utils/schema/mutations'
import { useMutation } from '@apollo/client/react';
import Auth from '../../../utils/auth';
import { GET_COMMENTS } from '../../../utils/schema/queries';

export const CommentsForm = () => {

    const [ commentData, setCommentData ] = useState<Partial<CommentData | undefined>>({
        content:'',
        status:'', //hidden | visible  
        ticketId: 0
    });
    const [createComment] = useMutation(CREATE_COMMENT, {
        refetchQueries:[{
            query: GET_COMMENTS
        }]
    });

    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault();
        console.log(commentData)
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        
        try {
            await createComment({
                variables: {
                    content: commentData?.content,
                    status: commentData?.status,
                    ticketId: commentData?.ticketId
                }
            })
            setCommentData({
                content:'',
                status:'', //hidden | visible  
                ticketId: 0
            })
            
        } catch(error : any) {
            console.error('Comment undefined.');
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'ticketId') {
        const numValue = value === '' ? 0 : Number(value);
        setCommentData((prev) => ({ ...prev, [name]: numValue }));
        } else {
            setCommentData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCommentData((prev) => (prev ? { ...prev, [name]: value } : undefined));
    };
  
    console.log(commentData)

  return (
    <form onSubmit={handleSubmit}>
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Page details</legend>
        <label className="label">Content</label>
        <input  
            type="text" 
            className="input"
            name='content'
            value={commentData?.content || ''}
            onChange={handleInputChange} 
        />

        <label className="label">Status</label>
        <select 
            className="select" 
            name='status'
            value={commentData?.status || ''}
            onChange={handleChange}
        >
            <option value="">Select status</option>
            <option value="visible">Visible</option>
            <option value="hidden">Hidden</option>
        </select>


        <label className="label">Ticket</label>
        <input 
            type="number" 
            className="input" 
            name='ticketId'
            value={Number( commentData?.ticketId )|| ''}
            onChange={handleInputChange}
        />

        <button type='submit' className="btn btn-neutral mt-4">Login</button>
    </fieldset>
    </form>
  )
}
