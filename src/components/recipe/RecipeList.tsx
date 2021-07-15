import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { Recipe } from './Recipe';

import { Recipes } from '../../typings/types';

import stand from '../../assets/stand.svg';

interface RecipeListProps {
  recipes: Recipes.Recipe[];
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

export function RecipeList({ recipes }: RecipeListProps) {
  const styles = useStyles();

  if (!recipes.length) {
    return (
      <Paper className={styles.paper} elevation={12}>
        <Typography align="center" variant="h4" component="p">
          Ludzie! Tu niczego nie ma!
        </Typography>
        <img className={styles.image} src={stand} alt="stand icon" />
      </Paper>
    );
  }

  const recipesList = recipes.map((recipe) => <Recipe key={recipe._id} {...recipe} />);
  return <>{recipesList}</>;
}
