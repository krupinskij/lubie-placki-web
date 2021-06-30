import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mutation, MutationFunction, MutationResult, OperationVariables } from 'react-apollo';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { RecipeIngredients } from './RecipeIngredients';
import { RecipeMethods } from './RecipeMethods';
import { RecipeHints } from './RecipeHints';

import { getFullDate } from '../../utils/date-time';
import { Recipes } from '../../typings/types';
import { REMOVE_FROM_FAVOURITE_MUTATION } from '../../graphql/remove-from-favourite.mutation';
import { ADD_TO_FAVOURITE_MUTATION } from '../../graphql/add-to-favourite.mutation';
import { UserSession } from '../../utils/user-session';

const useStyles = makeStyles({
  cardStyles: {
    maxWidth: 700,
    margin: 20,
  },
  linkStyles: {
    textDecoration: 'none',
    color: 'inherit',
    userSelect: 'none',
  },
  cardActionsStyles: {
    justifyContent: 'space-around',
  },
  cardContentStyles: {
    position: 'relative',
  },
  expandMoreIconStyles: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export function Recipe({
  _id,
  name,
  description,
  ingredients,
  directions,
  hints,
  createdAt,
  owner,
  isFavourite,
}: Recipes.Recipe) {
  const { cardStyles, linkStyles, cardActionsStyles, cardContentStyles, expandMoreIconStyles } = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [favourite, setFavourite] = useState(isFavourite);

  const controlFavourite = (trigger: MutationFunction<any, OperationVariables>, recipeId: string) => {
    return trigger({
      variables: {
        credentials: recipeId,
      },
    })
      .then((resp) => {
        setFavourite(!favourite);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card className={cardStyles} elevation={12}>
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
      <CardContent className={cardContentStyles}>
        <IconButton
          className={expandMoreIconStyles}
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
        <Typography align="center" gutterBottom variant="h3" component="h2">
          <Link className={linkStyles} to={`/recipe/${_id}`}>
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
      <CardActions className={cardActionsStyles}>
        <Button size="small" color="primary">
          Dodaj komentarz
        </Button>
        <Mutation mutation={favourite ? REMOVE_FROM_FAVOURITE_MUTATION : ADD_TO_FAVOURITE_MUTATION}>
          {(trigger: MutationFunction<any, Record<string, any>>, result: MutationResult<any>) => (
            <Button
              size="small"
              color="primary"
              disabled={!UserSession.isActive}
              onClick={() => controlFavourite(trigger, _id)}
            >
              {favourite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
            </Button>
          )}
        </Mutation>
      </CardActions>
    </Card>
  );
}
