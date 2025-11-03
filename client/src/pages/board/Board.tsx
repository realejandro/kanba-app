import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorPage from '../ErrorPage';
import Swimlane from '../../components/Swimlane';
import { TicketData } from '../../interfaces/TicketData';
import auth from '../../utils/auth';
import { BoardLayout } from '../../layouts/BoardLayout';
import HomePage from '../home/HomePage';
import { useQuery } from '@apollo/client/react';
import { GET_TICKETS } from '../../utils/schema/queries';

const boardStates = ['Todo', 'In Progress', 'Done'];

interface GetTicketsData {
  tickets: TicketData[]
}

const Board = () => {
  const { data } = useQuery<GetTicketsData>(GET_TICKETS)
  const tickets: TicketData[] = data?.tickets || []; 
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);

  useEffect(() => {
    if(auth.loggedIn()) {
      setLoginCheck(true);
    }
  }, []);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
    {
      !loginCheck ? (
        <HomePage/>  
      ) : (
          <div>
            <BoardLayout 
              children={ 
                <div className='grid grid-cols-1 gap-4'>
                  <button type='button' id='create-ticket-link' className='mt-5 mr-3'>
                    <Link to='/create' style={{ color:"white" }} >New Ticket</Link>
                  </button>
                  <div className='grid grid-cols-1 w-[100%]
                    lg:grid-cols-3 '
                  >
                  {
                    boardStates.map((status) => {
                      const filteredTickets = tickets.filter(ticket => ticket.status === status);
                      return (
                        <Swimlane 
                          title={status} 
                          key={status} 
                          tickets={filteredTickets} 
                        />
                      );
                    })}
                    </div>
                </div>
              }
            />
          </div>
        )
    }
    </>
  );
};

export default Board;
