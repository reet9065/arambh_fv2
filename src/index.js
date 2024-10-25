import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <ReactQueryDevtools/>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode> 
);

