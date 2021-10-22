import { useState } from 'react';
import { useMutation } from 'react-apollo';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import { RecipeIngredients } from './RecipeIngredients';
import { RecipeMethods } from './RecipeMethods';
import { RecipeHints } from './RecipeHints';
import { CardBody, CardContainer, CardFooter, CardHeader, CardImage } from '../card/Card';

import { REMOVE_FROM_FAVOURITE_MUTATION } from '../../graphql/remove-from-favourite.mutation';
import { ADD_TO_FAVOURITE_MUTATION } from '../../graphql/add-to-favourite.mutation';

import { UserSession } from '../../utils/user-session';
import { Data, Recipes } from '../../typings/types';

import config from '../../config';

import cakePlaceholder from '../../assets/cake-placeholder.svg';

const useStyles = makeStyles({
  cardBody: {
    position: 'relative',
  },
  collapse: {
    padding: 20,
  },
  expandMoreIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    userSelect: 'none',
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

  const [addToFavourite] = useMutation<Data.AddToFavouriteData>(ADD_TO_FAVOURITE_MUTATION);
  const [removeFromFavourite] = useMutation<Data.RemoveFromFavouriteData>(REMOVE_FROM_FAVOURITE_MUTATION);

  const handleAddToFavourite = async () => {
    await addToFavourite({ variables: { credentials: _id } });
    setFavourite(true);
  };

  const handleRemoveFromFavourite = async () => {
    await removeFromFavourite({ variables: { credentials: _id } });
    setFavourite(false);
  };

  return (
    <CardContainer>
      <CardHeader author={owner} createdAt={createdAt} />
      <CardImage alt="recipe" image={photo ? `${config.API_URL}/file/${photo}` : cakePlaceholder} title={name} />
      <CardBody className={styles.cardBody}>
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
        <Collapse className={styles.collapse} in={expanded} timeout="auto" unmountOnExit>
          <RecipeIngredients ingredients={ingredients} />
          <RecipeMethods methods={directions} />
          <RecipeHints hints={hints} />
        </Collapse>
      </CardBody>
      <CardFooter justifyContent="flex-end">
        {favourite ? (
          <Button size="small" color="primary" disabled={!UserSession.isActive} onClick={handleRemoveFromFavourite}>
            Usuń z ulubionych
          </Button>
        ) : (
          <Button size="small" color="primary" disabled={!UserSession.isActive} onClick={handleAddToFavourite}>
            Dodaj do ulubionych
          </Button>
        )}
      </CardFooter>
    </CardContainer>
  );
}
