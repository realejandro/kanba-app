import { Client } from '../../../interfaces/ClientData'

interface ClientArr {
    clients: Client[];
}

export const ClientTableBody = ( { id, description, name, email, phoneNumber, current } : Client ) => {
  return (
    <div className="overflow-x-auto">
        <table className="table table-zebra">
            <thead>
            <tr>
                <th>id</th>
                <th>Name</th>
                <th>email</th>
                <th>Phone Number </th>
                <th>Current</th>
                <th>Description</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th>{ id }</th>
                <td>{ name }</td>
                <td>{ email }</td>
                <td>{ phoneNumber }</td>
                <td>{ current }</td>
                <td>{ description }</td>
            </tr>
            </tbody>
        </table>
    </div>
  )
}