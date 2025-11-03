import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { TicketFactory } from './ticket.js';
import { CommentFactory } from './comments.js';
import { EventFactory } from './event.js';
import { ClientFactory } from './client.js';

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

const User = UserFactory(sequelize);
const Ticket = TicketFactory(sequelize);
const Comment = CommentFactory(sequelize);
const Event = EventFactory(sequelize);
const Client = ClientFactory(sequelize);

User.hasMany(Ticket, { foreignKey: 'assignedUserId' });
Ticket.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser'});
User.hasMany(Comment, { foreignKey: 'userId'});
Comment.belongsTo(User, { foreignKey: 'userId'});
Ticket.hasMany(Comment, { foreignKey: 'ticketId'});
Comment.belongsTo(Ticket, { foreignKey: 'ticketId'});

export { sequelize, User, Ticket, Comment, Event, Client };
