import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.tsx';
import Board from './pages/board/Board.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import EditTicket from './pages/EditTicket.tsx';
import CreateTicket from './pages/CreateTicket.tsx';
import Login from './pages/Login.tsx';
import Comments from './pages/comments/Comments.tsx';
import AnalyticsPage from './pages/analytics/AnalyticsPage.tsx';
import Calendar from './pages/calendar/Calendar.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Board />
      }, 
      {
        path: '/edit',
        element: <EditTicket />
      },
      {
        path: '/create',
        element: <CreateTicket />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path:'/comments',
        element:<Comments/>
      },
      {
        path:'/analytics',
        element: <AnalyticsPage/>
      },
      {
        path:'/calendar',
        element:<Calendar/>
      }

    ]
  }
])

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
