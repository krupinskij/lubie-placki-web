import ApolloApp from './ApolloApp';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

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
      <ApolloApp />
    </ThemeProvider>
  );
}

export default ThemeApp;
