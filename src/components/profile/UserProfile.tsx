import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Avatar, CardContent, Grid, Typography } from '@material-ui/core';
import { Users } from '../../typings/types';

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

export function UserProfile({ username, bio, avatar }: Users.User) {
  const styles = useStyles();

  return (
    <Card className={styles.card} elevation={12}>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
