import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TicketData } from '../interfaces/TicketData';
import { useMutation, useQuery } from '@apollo/client/react';
import { GET_TICKET_BY_ID} from '../utils/schema/queries';
import { UPDATE_TICKET } from '../utils/schema/mutations';
import Auth from '../utils/auth';

interface GetTicketByIdData {
  getTicketById: TicketData;
}


const EditTicket = () => {
  const { state } = useLocation(); //is already giving me the {id}
  const { data, loading, error } = useQuery<GetTicketByIdData>(GET_TICKET_BY_ID, {
    variables: { ticketId: parseInt(state?.id) },
  }) 
  const [ updateTicketMutation ] = useMutation(UPDATE_TICKET)
  const [ticket, setTicket] = useState<TicketData | undefined>();
  const navigate = useNavigate()
  
  
  useEffect(() => {
    if (data?.getTicketById) {
      console.log('Ticket data received:', data.getTicketById);
      setTicket(data.getTicketById);
    }
  }, [data?.getTicketById]);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token || !ticket?.id) return;
    try {
      await updateTicketMutation({
        variables: {
          id: ticket.id,
          name: ticket.name,
          status: ticket.status,
          description: ticket.description,
        },
      });
      navigate('/')
    } catch(error) {
      console.error('Ticket data is undefined.');
    }

  }

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTicket((prev) => (prev ? { ...prev, [name]: value } : undefined));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTicket((prev) => (prev ? { ...prev, [name]: value } : undefined));
  };

  if (loading) return <p>Loading...</p>;

  if (error) {
    console.log(error)
    return <p>Error fetching comments</p>
  
  }
  

  return (
    <>
      <div className='container'>
        {
          ticket ? (
            <form className='form' onSubmit={handleSubmit}>
              <h1>Edit Ticket</h1>
              <label htmlFor='tName'>Ticket Name</label>
              <textarea
                id='tName'
                name='name'
                value={ticket.name || ''}
                onChange={handleTextAreaChange}
                />
              <label htmlFor='tStatus'>Ticket Status</label>
              <select
                name='status'
                id='tStatus'
                value={ticket.status || ''}
                onChange={handleChange}
              >
                <option  value='Todo'>Todo</option>
                <option  value='In Progress'>In Progress</option>
                <option  value='Done'>Done</option>
            </select>
            <label htmlFor='tDescription'>Ticket Description</label>
              <textarea
                id='tDescription'
                name='description'
                value={ticket.description || ''}
                onChange={handleTextAreaChange}
              />
              <button type='submit'>Submit Form</button>
            </form>
          ) : (
            <div>Issues fetching ticket</div>
          )
        }
      </div>  
    </>
  );
};

export default EditTicket;
