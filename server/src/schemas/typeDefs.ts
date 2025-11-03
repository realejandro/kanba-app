const typeDefs = `
  type User {
    id: Int,
    username: String,
    password: String
  }

  type Comment {
    id: Int,
    content : String,
    userId: Int,
    ticketId: Int,
    status: String
  }

  type Ticket {
    id: Int,
    name: String,
    status: String,
    description: String,
    assignedUserId: Int
  }

  type Event {
    id: Int,
    title: String,
    notes: String,
    start: String,
    end: String
  }

  type Client {
    id : Int,
    name: String,
    email: String,
    phoneNumber: String,
    description: String,
    clientType: String,
    current: Boolean 
  }

  type Auth {
    token: ID,
    user: User
  }

  type Query {
    users: [User],
    comments: [Comment]
    tickets: [Ticket]
    events: [Event]
    clients: [Client]
    getTicketById(ticketId:Int):Ticket
    me: User
  }

  type Mutation {
    login(username:String!, password:String): Auth
    createTicket(name: String, status: String, description: String, assignedUserdId: Int): Ticket
    updateTicket( id: Int, name: String, status: String, description: String ) : Ticket
    deleteTicket(id: Int): String
    createEvent(title: String, notes: String, start: String, end: String) : Event
    updateEvent(id: Int, title: String, notes: String, start: String, end: String) : Event
    deleteEvent(id: Int):String
    createClient(name: String, email: String, phoneNumber: String, description: String, clientType: String, current: Boolean ) : Client
    updateClient(id : Int, name: String, email: String, phoneNumber: String, description: String, clientType: String, current: Boolean ) : Client
    deleteClient(id:Int): String
    createComment(content:String, ticketId:Int, status:String): Comment
    updateComment(id: Int, content:String, status:String): Comment
    deleteComment(id:Int): String
  }

  
`;

export default typeDefs;
