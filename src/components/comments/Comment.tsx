import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import { getFullDate } from '../../utils/date-time';
import { Comments } from '../../typings/types';

import config from '../../config';

const useStyles = makeStyles({
  card: {
    maxWidth: 700,
    minWidth: 500,
    width: '50%',
    margin: 20,
  },
  text: {
    color: 'black',
  },
});

export function Comment({ _id, text, createdAt, owner }: Comments.Comment) {
  const styles = useStyles();

  return (
    <Card className={styles.card} elevation={12}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" src={owner.avatar && `${config.API_URL}/file/${owner.avatar}`}>
            {owner.username[0].toUpperCase()}
          </Avatar>
        }
        title={
          <Link href={`/profile/${owner._id}`} color="inherit">
            {owner.username}
          </Link>
        }
        subheader={getFullDate(createdAt)}
      />
      <CardContent>
        <Typography>{text}</Typography>
      </CardContent>
    </Card>
  );
}
