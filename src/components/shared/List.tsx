import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import stand from '../../assets/stand.svg';

interface ListProps {
  data: { _id: string }[];
  component: React.ElementType;
}

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

export const List: React.FC<ListProps> = ({ data, component: Component }) => {
  const styles = useStyles();

  if (!data.length) {
    return (
      <Paper className={styles.paper} elevation={12}>
        <Typography align="center" variant="h4" component="p">
          Ludzie! Tu niczego nie ma!
        </Typography>
        <img className={styles.image} src={stand} alt="stand icon" />
      </Paper>
    );
  }

  const dataList = data.map((elem) => <Component key={elem?._id} {...elem} />);

  return <>{dataList}</>;
};
