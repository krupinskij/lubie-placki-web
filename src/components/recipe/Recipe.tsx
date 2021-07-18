import { useState } from 'react';
import Link from '@material-ui/core/Link';
import { useMutation } from 'react-apollo';

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

import config from '../../config';

import cakePlaceholder from '../../assets/cake-placeholder.svg';

const useStyles = makeStyles({
  card: {
    maxWidth: 700,
    minWidth: 500,
    width: '50%',
    margin: 20,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    userSelect: 'none',
  },
  cardMedia: {
    height: '400px',
    width: '100%',
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
  photo,
}: Recipes.Recipe) {
  const styles = useStyles();

  const [expanded, setExpanded] = useState(false);
  const [favourite, setFavourite] = useState(isFavourite);

  const [addToFavourite] = useMutation(ADD_TO_FAVOURITE_MUTATION);
  const [removeFromFavourite] = useMutation(REMOVE_FROM_FAVOURITE_MUTATION);

  const handleAddToFavourite = async () => {
    await addToFavourite({ variables: { credentials: _id } });
    setFavourite(true);
  };

  const handleRemoveFromFavourite = async () => {
    await removeFromFavourite({ variables: { credentials: _id } });
    setFavourite(false);
  };

  return (
    <Card className={styles.card} elevation={12}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        avatar={<Avatar aria-label="recipe">A</Avatar>}
        title={
          <Link href={`/profile/${owner._id}`} color="inherit">
            {owner.username}
          </Link>
        }
        subheader={getFullDate(createdAt)}
      />
      <CardMedia
        component="img"
        className={styles.cardMedia}
        alt="recipe"
        image={photo ? `${config.API_URL}/file/${photo}` : cakePlaceholder}
        title={name}
      />
      <CardContent className={styles.cardContent}>
        <IconButton
          className={styles.expandMoreIcon}
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
        <Typography align="center" gutterBottom variant="h3" component="h2">
          <Link className={styles.link} underline="none" href={`/recipe/${_id}`}>
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
      <CardActions className={styles.cardActions}>
        <Button size="small" color="primary">
          Dodaj komentarz
        </Button>
        {favourite ? (
          <Button size="small" color="primary" disabled={!UserSession.isActive} onClick={handleRemoveFromFavourite}>
            Usuń z ulubionych
          </Button>
        ) : (
          <Button size="small" color="primary" disabled={!UserSession.isActive} onClick={handleAddToFavourite}>
            Dodaj do ulubionych
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
