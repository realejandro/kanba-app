import { Client, Comment, Event, Ticket, User } from '../models/index.js';
import { AuthenticationError, signToken } from '../services/auth.js';


interface UserArgs {
  id: number,
  username: string,
  password: string
}


interface TicketArgs {
  id : number;
  name: string;
  status: string;
  description: string;
  assignedUserId: number;
}

interface TicketId {
  ticketId:number
}

interface CommentArg {
    id?: number,
    content : string,
    userId: number,
    ticketId: number,
    status: 'hidden' | 'visible',
}

interface EventArgs {
  id ?: number,
  title: string,
  notes: string,
  start: Date,
  end: Date,
}


interface ClientArgs {
  id?: number,
  name: string,
  email: string,
  phoneNumber: string,
  description: string,
  clientType: 'Company' | 'Person',
  current: boolean 
}

interface Context {
  user?: UserArgs
}


const resolvers = {
  Query: {
    users: async (_parent: any)  => {
      try { 
        return User.findAll();
      } catch(error) {
        console.error(error);
        return [];
      }
    },
    comments: async( _parent: any ) => {   
      try {
        const comments = await Comment.findAll({});
        return comments
      } catch (error) {
        console.error(error);
        return [];
      }
    },
    tickets: async (_parent: any) => {
      try { 
        const tickets = await Ticket.findAll({
            include: [
              {
                model: User,
                as: 'assignedUser', // This should match the alias defined in the association
                attributes: ['username'], // Include only the username attribute
              },
            ],
          });
        return tickets
      } catch (error) {
        console.error(error);
        return [];
      }
    },
    getTicketById: async (_parent:unknown, { ticketId }: TicketId , context:Context) => {
      if (!context.user) { throw new AuthenticationError("Not Authenticated user"); }
      if (!ticketId || isNaN(ticketId)) {
        throw new AuthenticationError('Invalid ticket ID');
      }
      try {
        const ticket = await Ticket.findByPk( ticketId, {
              include: [
                {
                  model: User,
                  as: 'assignedUser', // This should match the alias defined in the association
                  attributes: ['id','username'], // Include only the username attribute
                },
              ],
            });
        return ticket
      } catch (error: any) {
        console.log(error)
        throw new AuthenticationError("error API");  
      }
    },
    events: async ( _parent: unknown ) => {
      try {
        const events = await Event.findAll()
        return events 
      } catch ( error ) {
        throw new Error( "new error founded" )
      }
    },
    clients: async ( _parent: unknown ) => {
      try {
        return await Client.findAll() 
      } catch ( error ) {
        throw new Error( "new error founded" )
      }
    },
     me: async(_parent:unknown, _args:unknown, context: Context): Promise< UserArgs | null> => {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in to access 'me'");
      }
      const user = await User.findByPk(context.user.id);
      return user;
    },
    
  },
  Mutation : {
    login: async(_parent: unknown, { username, password } : { username:string, password:string }) : Promise<{ token:string, user: UserArgs }> => {
      const user = await User.findOne({ where: { 
        username : username
      }})
      if(!user){    
        throw new AuthenticationError("Incorrect credentials"); 
      }

      const correctPsw = await user.checkPassword(password);

      if(!correctPsw){
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(username, user.id)
      return { token, user }
    },
    createTicket: async (_parent:unknown, { name, status, description, assignedUserId } : TicketArgs, context: Context ) => {
      if (!context.user) {
        throw new AuthenticationError("Not Authenticated");
      }
      try {
        const newTicket = await Ticket.create({ name, status, description, assignedUserId });
        return newTicket
      } catch (error: any) {
        throw new AuthenticationError("Not Authenticated");  
      }
    },
    deleteTicket : async (_parent: unknown, { id } : { id:number } ) => {
      try {
        const ticket = await Ticket.findByPk(id);
        if (ticket) {
          await ticket.destroy();
          return "Ticket Deleted"
        } else {
          return "Ticket not founded"
        }
      } catch (error: any) {
        throw new AuthenticationError("Ticket not founded")
      }
    },
    updateTicket: async(_parent: unknown, { id, name, status, description } : TicketArgs, context:Context ) => {
      if (!context.user) { throw new AuthenticationError("Not Authenticated"); }
      try {
        const ticket = await Ticket.findByPk(id);
          if (ticket) {
            ticket.name = name;
            ticket.status = status;
            ticket.description = description;
            await ticket.save();
            return ticket;
          } else {
            throw new Error("Ticket not founded")
          }
      } catch (error: any) {
          throw new AuthenticationError("AUTHENTICATION ERROR")
      }
    },
    
    //Events mutations
    createEvent: async (_parent: unknown, { title, notes, start, end } : EventArgs, context : Context ) => {
      if (!context.user) { throw new AuthenticationError("Not Authenticated"); }
      try {
        const newEvent = await Event.create({ 
          title, 
          notes, 
          start: new Date(start), 
          end: new Date(end) 
        });
        return newEvent
      } catch (error: any) {
        console.log(error)
        throw new AuthenticationError("error API");  
      }
    },
    updateEvent: async(_parent: unknown, { id, title, notes, start, end } : EventArgs, context:Context ) => {
      if (!context.user) { throw new AuthenticationError("Not Authenticated"); }
      try {
        const eventData = await Event.findByPk(id);
          if (eventData) {
            eventData.title = title;
            eventData.notes = notes;
            eventData.start = start;
            eventData.end = end;
            await eventData.save();
            return eventData;
          } else {
            throw new Error("Client not founded")
          }
      } catch (error: any) {
          throw new AuthenticationError("AUTHENTICATION ERROR")
      }
    },
    deleteEvent : async (_parent: unknown, { id } : { id:number }) => {
      try {
        const eventData = await Client.findByPk(id);
        if (eventData) {
          await eventData.destroy();
          return "Client Deleted"
        } else {
          return "Client not founded"
        }
      } catch (error: any) {
        throw new AuthenticationError("Ticket not founded")
      }
    },
    //Client Mutations
    createClient: async (_parent: unknown, { name, email, phoneNumber, description, clientType, current  } : ClientArgs, context : Context ) => {
      if (!context.user) { throw new AuthenticationError("Not Authenticated"); }
      try {
        const newClient = await Client.create({ 
          name,
          email,
          phoneNumber,
          description,
          clientType,
          current 
        });
        return newClient
      } catch (error: any) {
        console.log(error)
        throw new AuthenticationError("error API");  
      }
    },
    updateClient: async(_parent: unknown, { id, name, email, phoneNumber, description, clientType, current } : ClientArgs, context:Context ) => {
      if (!context.user) { throw new AuthenticationError("Not Authenticated"); }
      try {
        const client = await Client.findByPk(id);
          if (client) {
            client.name = name;
            client.email = email;
            client.phoneNumber = phoneNumber;
            client.description = description;
            client.clientType = clientType;
            client.current = current
            await client.save();
            return client;
          } else {
            throw new Error("Client not founded")
          }
      } catch (error: any) {
          throw new AuthenticationError("AUTHENTICATION ERROR")
      }
    },
    deleteClient : async (_parent: unknown, { id } : { id:number }) => {
      try {
        const client = await Client.findByPk(id);
        if (client) {
          await client.destroy();
          return "Client Deleted"
        } else {
          return "Client not founded"
        }
      } catch (error: any) {
        throw new AuthenticationError("Ticket not founded")
      }
    },
    //Comments
    createComment : async(_parent : unknown, { content, ticketId, status } : CommentArg, context: Context ) => {
      if (!context.user) { throw new AuthenticationError("Not Authenticated to create comments"); }
      try {
        // Validate ticket exists
        const ticket = await Ticket.findByPk(ticketId);
        if (!ticket) throw new Error(`Ticket with id ${ticketId} not found`);

        // Validate user exists
        const user = await User.findByPk(context.user.id);
        if (!user) throw new Error(`User not found`);

        // Create the comment
        const comment = await Comment.create({
          content: content,
          ticketId: ticketId,
          userId: context.user.id, // logged-in user
          status: status,       // default status
        });

        return comment;
      } catch(error: any) {
        console.error("Failed to create comment:", error);
        throw new Error(`Can't create comment: ${error.message}`);
      }
    },
    updateComment : async(_parent : unknown, { id, content, status } : CommentArg, context: Context ) => {
      if (!context.user) { throw new AuthenticationError("Not Authenticated to create comments"); }
      try {
        const comment = await Comment.findByPk(id)

        if (!comment) throw new Error(`Ticket with id ${id} not found`);
        if (comment.userId !== context.user.id) {
          throw new AuthenticationError("Not authorized to update this comment");
        }

        // Update fields
        if (content !== undefined) comment.content = content;
        if (status !== undefined) comment.status = status;

        await comment.save();

        return comment;
      } catch(error) {
        console.log(error)
        throw new Error("Can't create comment")
      }
    },
    deleteComment : async (_parent: unknown, { id } : { id:number }) => {
      try {
        const comment = await Comment.findByPk(id);
        if (comment) {
          await comment.destroy();
          return "Comment Deleted"
        } else {
          return "Comment not founded"
        }
      } catch (error: any) {
        throw new AuthenticationError("Comment not founded")
      }
    }

  },
  
  
};

export default resolvers;
