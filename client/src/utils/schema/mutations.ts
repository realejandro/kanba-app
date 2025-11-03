import { gql } from "@apollo/client";


export const LOGIN = gql`
    mutation Mutation($username: String!, $password: String) {
        login(username: $username, password: $password) {
            token
            user {
            id
            username
            password
            }
        }
    }
`;

export const UPDATE_TICKET = gql`
    mutation Mutation($id: Int, $name: String, $status: String, $description: String) {
        updateTicket(id: $id, name: $name, status: $status, description: $description) {
            id
            description
            assignedUserId
            name
            status
        }
    }
`;


export const UPDATE_COMMENT = gql`
    mutation Mutation($id: Int, $content: String, $status: String) {
        updateComment(id: $id, content: $content, status: $status) {
            id
            status
            content
            ticketId
            userId
        }
    }
`

export const CREATE_COMMENT = gql`
    mutation Mutation($content: String, $ticketId: Int, $status: String) {
        createComment(content: $content, ticketId: $ticketId, status: $status) {
            id
            status
            ticketId
            userId
            content
        }
    }
`

export const CREATE_CLIENT = gql`
    mutation Mutation($email: String, $name: String, $phoneNumber: String, $description: String, $clientType: String, $current: Boolean) {
        createClient(email: $email, name: $name, phoneNumber: $phoneNumber, description: $description, clientType: $clientType, current: $current) {
            id
            email
            description
            current
            clientType
            name
            phoneNumber
        }
    }
`


export const CREATE_TICKET = gql`
    mutation CreateTicket($name: String, $status: String, $description: String, $assignedUserdId: Int) {
        createTicket(name: $name, status: $status, description: $description, assignedUserdId: $assignedUserdId) {
            id
            name
            description
            assignedUserId
            status
        }
    }
`

export const DELETE_COMMENT=gql`
    mutation Mutation($id: Int) {
       deleteComment(id: $id)
    }
`

export const DELETE_CLIENT = gql`
    mutation Mutation($id: Int) {
        deleteClient(id: $id)
    }
`

export const DELETE_TICKET = gql`
  mutation DeleteTicket($id: Int) {
    deleteTicket(id: $id)
  }
`;
