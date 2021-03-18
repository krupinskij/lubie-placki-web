import App from './App';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(168, 0, 0)',
    },
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

function ThemeApp() {
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
}

export default ThemeApp;
