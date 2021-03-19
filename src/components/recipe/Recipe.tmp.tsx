import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Component } from '../../templates/Component';
import { Recipes } from '../../typings/types';
import { getFullDate } from '../../utils/date-time';

import './Recipe.scss';

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
  },
});

export function Recipe({ _id, name, description, ingredients, directions, hints, createdAt, owner }: Recipes.Recipe) {
  const ings = ingredients.map((ingredient) => {
    return (
      <li key={ingredient.product}>
        {ingredient.product} - {ingredient.quantity}
        {ingredient.unit}
      </li>
    );
  });

  const dirs = directions.map((direction) => {
    return <li key={direction.text}>{direction.text}</li>;
  });

  const hins = hints.map((hint) => {
    return <li key={hint.text}>{hint.text}</li>;
  });

  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={12}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpliki.doradcasmaku.pl%2Flatwy-i-szybki-makowiec-krucho-drozdzowy0-4.jpg"
          title="Contemplative Reptile"
          height="300"
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="h2">
            {name}
          </Typography>
          <Typography color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Skomentuj
        </Button>
        <Button size="small" color="primary">
          Dodaj do ulubionych
        </Button>
      </CardActions>
    </Card>
  );
}
