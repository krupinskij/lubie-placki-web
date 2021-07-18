import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Avatar, CardContent, Typography } from '@material-ui/core';
import { Users } from '../../typings/types';

import config from '../../config';

const useStyles = makeStyles({
  card: {
    maxWidth: 700,
    minWidth: 500,
    width: '50%',
    margin: 20,
  },
});

export function UserProfile({ _id, username, bio, avatar }: Users.User) {
  const styles = useStyles();

  return (
    <Card className={styles.card} elevation={12}>
      <CardContent>
        <Avatar alt={`${username} avatar`} src={avatar && `${config.API_URL}/file/${avatar}`}>
          {username[0].toUpperCase()}
        </Avatar>
        <Typography gutterBottom variant="h5" component="h2">
          {username}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {bio}
        </Typography>
      </CardContent>
    </Card>
  );
}
