//import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query'; // Import these
import App from './App.jsx'; // Adjust based on your structure
import './index.css'; // Adjust based on your structure

// Create a client
const queryClient = new QueryClient();

//display app.jsx in page
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
