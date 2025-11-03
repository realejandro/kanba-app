import { useMutation, useQuery } from '@apollo/client/react'
import { Client } from '../../../interfaces/ClientData'
import { GET_CLIENTS } from '../../../utils/schema/queries'
import { ClientForm } from './ClientForm'
import { DELETE_CLIENT } from '../../../utils/schema/mutations'
import { ClientTable } from './ClientTable'
import { ClientTableHead } from './ClientTableHead'
import { ClientModal } from './ClientModal'

interface GetClientsData {
  clients: Client[]
}

export const ClientsMetrics = () => {
    
  const { data, loading, error } = useQuery<GetClientsData>(GET_CLIENTS);
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    refetchQueries:[{
      query: GET_CLIENTS
    }]
  })
  const clients = data?.clients

  if (loading) return <p>Loading...</p>;
  
  if (error) return <p>Error: {error.message}</p>;

  const onDeleteClient = async( id:number ) => {
    const idClient = id;
    try {
      deleteClient({
        variables: { id: idClient }
      })
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div>
      <div>
        <div> 
          <h2> Customers: </h2>
          <ClientModal/>
        </div>
        <div className="overflow-x-auto">
        <table className="table table-zebra">
          <ClientTableHead/>
          { 
            clients?.map( (client : Client) => {
              return(
                    <ClientTable 
                      { ...client }
                      key={client.id}
                    />
              )
            })
          }
          </table>
          </div>
      </div>
    </div>
  )
}
