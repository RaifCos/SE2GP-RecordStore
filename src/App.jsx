import React, { useState } from 'react';
import ArtistList from './components/ArtistList';
import RecordList from './components/RecordList';
import UserList from './components/UserList';
import CartList from './components/CartList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import AddArtist from './components/AddArtist'; // Import the AddArtist component

const queryClient = new QueryClient();

function App() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true); // Open the Add Artist dialog
  };

  const handleClose = () => {
    setOpen(false); // Close the Add Artist dialog
  };

  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Music Management</Typography>
        </Toolbar>
      </AppBar>

      <Container>
        {/* Button to open the "Add Artist" dialog */}
        <Button variant="contained" color="primary" onClick={handleOpen} style={{ margin: '20px 0' }}>
          Add Artist
        </Button>

        {/* AddArtist modal or form */}
        <AddArtist open={open} onClose={handleClose} />

        {/* Artist List with delete functionality */}
        <ArtistList />

        {/* Other components */}
        <RecordList />
        <UserList />
        <CartList />
      </Container>
    </QueryClientProvider>
  );
}

export default App;
