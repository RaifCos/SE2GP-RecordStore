import ArtistList from './components/ArtistList';
import RecordList from './components/RecordList';
import UserList from './components/UserList';
import CartList from './components/CartList';

import './App.css';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <ArtistList />
        <RecordList />
        <UserList />
        <CartList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
