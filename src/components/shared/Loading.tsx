import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  paper: {
    padding: '30px 100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  progress: {
    margin: 20,
  },
});

export function Loading() {
  const styles = useStyles();

  return (
    <Paper className={styles.paper} elevation={12}>
      <Typography align="center" variant="h4" component="p">
        Ładowanie...
      </Typography>
      <CircularProgress color="primary" size={150} className={styles.progress} />
    </Paper>
  );
}
