import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import cancel from '../../assets/cancel.svg';

const useStyles = makeStyles({
  paper: {
    padding: '30px 100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    height: 150,
    width: 150,
    margin: 20,
  },
});

export function Error() {
  const styles = useStyles();

  return (
    <Paper className={styles.paper} elevation={12}>
      <Typography align="center" variant="h4" component="p">
        Wystąpił błąd!
      </Typography>
      <img className={styles.image} src={cancel} alt="cancel icon" />
    </Paper>
  );
}
