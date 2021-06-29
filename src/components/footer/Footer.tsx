import Link from '@material-ui/core/Link';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  footer: {
    maxWidth: 600,
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    padding: 20,
  },
});

export function Footer() {
  const styles = useStyles();

  return (
    <Paper className={styles.footer} elevation={9}>
      <Typography align="center" color="textSecondary">
        Wykonane przez:{' '}
        <Link color="textPrimary" href="https://github.com/krupinskij">
          Jan Krupiński
        </Link>{' '}
        &copy;2021
      </Typography>
      <Typography align="center" color="textSecondary">
        Icons made by{' '}
        <Link color="textPrimary" href="https://www.freepik.com">
          Freepik
        </Link>{' '}
        from{' '}
        <Link color="textPrimary" href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </Link>
      </Typography>
    </Paper>
  );
}
