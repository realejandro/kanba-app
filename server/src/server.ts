
import { ApolloServer } from '@apollo/server';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { sequelize } from './models/index.js';
import { typeDefs, resolvers } from './schemas/index.js';
import { expressMiddleware } from '@apollo/server/express4';
import { authenticateToken } from './services/auth.js';


const forceDatabaseRefresh = false;
const app = express();
const PORT = process.env.PORT || 3001;

// Serves static files in the entire client's dist folder

const server = new ApolloServer({
  typeDefs,
  resolvers,
});


const startApolloServer = async() =>{

  await server.start();

  app.use(express.static('../client/dist'));

  app.use(express.json());
  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }) => {
      // Call authenticateToken and pass the request
      return authenticateToken({ req });
    }
  }))


  sequelize.sync({force: forceDatabaseRefresh}).then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
}

startApolloServer();