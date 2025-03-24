import './App.css';
import { Truss_screen } from './Truss_screen';
import { Box } from '@mui/material';
import Header from './header';
import Footer from './footer';
function App() {
  return (
  <Box className="App" sx={{height: '100vh', width: '100vw', display: 'absolute', justifyContent: 'center', alignItems: 'center'}}>
      <Header />
      <Truss_screen />
      <Footer />
    </Box>
  );
}

export default App;
