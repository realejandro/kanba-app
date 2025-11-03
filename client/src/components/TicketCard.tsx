import { Link } from 'react-router-dom';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import { MouseEventHandler } from 'react';
import { DELETE_TICKET } from '../utils/schema/mutations';
import { useMutation } from '@apollo/client/react';
import { GET_TICKETS } from '../utils/schema/queries';

interface TicketCardProps {
  ticket: TicketData;
}

const TicketCard = ({ ticket }: TicketCardProps) => {

  const [ deleteTicket ] = useMutation(DELETE_TICKET, {
    refetchQueries:[{ query: GET_TICKETS }]
  })

  const handleDelete: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const ticketId = Number(event.currentTarget.value);
    try {
      await deleteTicket({ variables: { id: ticketId } })
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className='ticket-card'>
      <h3>{ticket.name}</h3>
      <p>{ticket.description}</p>
      <p>{ticket.assignedUser?.username}</p>
      <Link to='/edit' state={{id: ticket.id}} type='button' className='editBtn'>Edit</Link>
      <button type='button' value={String(ticket.id)} onClick={handleDelete} className='deleteBtn'>Delete</button>
    </div>
  );
};

export default TicketCard;

