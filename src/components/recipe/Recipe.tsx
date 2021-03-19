import { useState } from 'react';

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { RecipeIngredients } from './RecipeIngredients';
import { RecipeMethods } from './RecipeMethods';
import { RecipeHints } from './RecipeHints';

import { Recipes } from '../../typings/types';
import { getFullDate } from '../../utils/date-time';

const useStyles = makeStyles({
  recipe: {
    maxWidth: 700,
    margin: 20,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    userSelect: 'none',
  },
  cardActions: {
    justifyContent: 'space-around',
  },
  cardContent: {
    position: 'relative',
  },
  expandMoreIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export function Recipe({ _id, name, description, ingredients, directions, hints, createdAt, owner }: Recipes.Recipe) {
  const { recipe, link, cardActions, cardContent, expandMoreIcon } = useStyles();
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className={recipe} elevation={12}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        avatar={<Avatar aria-label="recipe">A</Avatar>}
        title={owner.username}
        subheader={getFullDate(createdAt)}
      />
      <CardMedia
        component="img"
        alt="recipe"
        image="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F2.bp.blogspot.com%2F-serV4rIzGPo%2FUp9cNFxK62I%2FAAAAAAAAEAA%2F1eJXAp0jcIE%2Fs1600%2Fpiernik-wigilijny.jpg&f=1&nofb=1"
        title={name}
        height="300"
      />
      <CardContent className={cardContent}>
        <IconButton
          className={expandMoreIcon}
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
        <Typography align="center" gutterBottom variant="h3" component="h2">
          <Link className={link} to={`/recipe/${_id}`}>
            {name}
          </Link>
        </Typography>
        <Typography align="center" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <RecipeIngredients ingredients={ingredients} />
          <RecipeMethods methods={directions} />
          <RecipeHints hints={hints} />
        </CardContent>
      </Collapse>
      <CardActions className={cardActions}>
        <Button size="small" color="primary">
          Dodaj komentarz
        </Button>
        <Button size="small" color="primary">
          Dodaj do ulubionych
        </Button>
      </CardActions>
    </Card>
  );
}
