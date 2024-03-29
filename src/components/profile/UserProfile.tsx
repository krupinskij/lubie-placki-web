import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import { CardBody, CardContainer, CardFooter } from '../card/Card';

import { Users } from '../../typings/types';

import { UserSession } from '../../utils/user-session';
import config from '../../config';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 700,
      minWidth: 500,
      width: '50%',
      margin: 20,
    },
    avatar: {
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
  }),
);

export function UserProfile({ _id, username, bio, avatar }: Users.User) {
  const styles = useStyles();

  return (
    <CardContainer>
      <CardBody>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={2}>
            <Avatar
              alt={`${username} avatar`}
              className={styles.avatar}
              src={avatar && `${config.API_URL}/file/${avatar}`}
              variant="square"
            >
              {username[0].toUpperCase()}
            </Avatar>
          </Grid>
          <Grid item xs={10}>
            <Typography gutterBottom variant="h5" component="h2">
              {username}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {bio}
            </Typography>
          </Grid>
        </Grid>
      </CardBody>
      {UserSession.userId === _id && (
        <CardFooter justifyContent="flex-end">
          <Link component={Button} underline="none" href="/edit/profile">
            Edytuj profil
          </Link>
        </CardFooter>
      )}
    </CardContainer>
  );
}
