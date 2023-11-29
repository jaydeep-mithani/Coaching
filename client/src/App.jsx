import { ThemeProvider, createTheme } from '@mui/material';
import './App.css';
import Routers from './routes';
import { useEffect } from 'react';
import { getAuthToken, getUserDetails, setUserDetails } from './utils/auth';
import { getuserById } from './services/user.service';

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: 'Poppins, sans-serif',
    },
  });

  useEffect(() => {
    if (getAuthToken() !== null) {
      const fetchData = async () => {
        const userDetail = await getUserDetails();
        if (userDetail) {
          const { data } = await getuserById(userDetail._id);
          setUserDetails(data);
        }
      };
      fetchData();
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Routers />
    </ThemeProvider>
  );
}

export default App;
