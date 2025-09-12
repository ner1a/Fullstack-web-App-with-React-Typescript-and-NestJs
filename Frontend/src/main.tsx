import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './routes/RootLayout.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

import './index.css';
import Users from './components/Users.tsx';
import Posts from './components/Posts.tsx';

const router = createBrowserRouter([
  { path: '/', element: <RootLayout />,
     children: [
      { path: '/', element: <Users /> },
      { path: '/posts', element: <Posts />}
    ] 
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
