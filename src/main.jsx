import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import {
  RouterProvider,
} from "react-router-dom";
import routes from './router/routes.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './shared/AuthProvider/AuthProvider.jsx';
// tanstack
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider><RouterProvider router={routes} /></AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
