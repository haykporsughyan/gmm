import React from 'react';
import ModernPage from './ModernPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  palette: {
      primary: {
          main: '#c7a07a',
      },
      secondary: {
          main: '#e2ceb1',
      },
  },
});
const App = () => {
    return (
      <ThemeProvider theme={theme}>
      <ModernPage />
  </ThemeProvider>
  
    );
};

export default App;
