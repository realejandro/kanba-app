import { ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { Outlet } from 'react-router-dom';
import Auth from "./utils/auth";
import { ApolloLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "/graphql",
});

const authLink = new ApolloLink((operation, forward) => {
  
  
  const token = Auth.getToken();

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


const App = () => {

  return (
    <ApolloProvider client={client}>
      <div className='grid w-[100vw]'>
        <main className='grid '>
          <Outlet />
        </main>
      </div>
    </ApolloProvider>
  )
}

export default App
