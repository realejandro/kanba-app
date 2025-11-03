import React from 'react'
import { Client } from '../../../interfaces/ClientData'

export const ClientTable = ( { id, description, name, email, phoneNumber, current } : Client ) => {
  return (
    <tbody>
        <tr>
            <td>{ id }</td>
            <td>{ name }</td>
            <td>{ email }</td>
            <td>{ phoneNumber }</td>
            <td>{ current }</td>
            <td>{ description }</td> 
        </tr>
    </tbody>
        
  )
}

