import { gql } from "@apollo/client";

export const GET_COMMENTS = gql`
    query Comments {
        comments {
            id
            content
            status
            ticketId
            userId
        }
    }
`;

export const GET_CLIENTS = gql`
  query Clients {
    clients {
      id
      email
      name
      phoneNumber
      description
      current
      clientType
      createdAt
    }
  }
`

export const GET_TICKETS = gql`
  query Tickets {
    tickets {
      id
      name
      description
      status
      assignedUserId
    }
  }
`

export const GET_TICKET_BY_ID = gql`
  query GetTicketById($ticketId: Int) {
    getTicketById(ticketId: $ticketId) {
      id
      name
      status
      description
      assignedUserId
    }
  }
` 