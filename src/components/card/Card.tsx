import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHead from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Grid, { GridJustification } from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import { Users } from '../../typings/types';
import config from '../../config';
import { getFullDate } from '../../utils/date-time';

const useStyles = makeStyles({
  card: {
    maxWidth: 700,
    minWidth: 600,
    width: '50%',
    margin: 20,
  },
  cardMedia: {
    height: '400px',
    width: '100%',
  },
});

interface CardProps {
  children: any;
  className?: string;
}

export function CardContainer({ children }: CardProps) {
  const styles = useStyles();
  return (
    <Card className={styles.card} elevation={12}>
      {children}
    </Card>
  );
}

interface CardHeaderProps {
  author: Users.User;
  createdAt: number;
}

export function CardHeader({ author, createdAt }: CardHeaderProps) {
  const styles = useStyles();
  return (
    <CardHead
      avatar={
        <Avatar aria-label="recipe" src={author.avatar && `${config.API_URL}/file/${author.avatar}`}>
          {author.username[0].toUpperCase()}
        </Avatar>
      }
      title={
        <Link href={`/profile/${author._id}`} color="inherit">
          {author.username}
        </Link>
      }
      subheader={getFullDate(createdAt)}
    />
  );
}

interface CardImageProps {
  alt: string;
  image: string;
  title: string;
}

export function CardImage({ alt, image, title }: CardImageProps) {
  const styles = useStyles();
  return <CardMedia component="img" className={styles.cardMedia} alt={alt} image={image} title={title} />;
}

export function CardBody({ children, className }: CardProps) {
  return <CardContent className={className}>{children}</CardContent>;
}

interface CardFooterProps extends CardProps {
  justifyContent: GridJustification;
}

export function CardFooter({ children, className, justifyContent }: CardFooterProps) {
  return (
    <CardActions className={className}>
      <Grid container spacing={2} justifyContent={justifyContent}>
        <Grid item>{children}</Grid>
      </Grid>
    </CardActions>
  );
}
