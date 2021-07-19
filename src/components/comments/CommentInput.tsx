import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import { useMutation } from 'react-apollo';
import { CREATE_COMMENT_MUTATION } from '../../graphql/create-comment';

const useStyles = makeStyles({
  card: {
    maxWidth: 700,
    minWidth: 500,
    width: '50%',
    margin: 20,
  },
  input: {
    width: '100%',
  },
});

export function CommentInput() {
  const styles = useStyles();
  const [comment, setComment] = useState('');
  const [error, setError] = useState(false);

  const [createComment] = useMutation(CREATE_COMMENT_MUTATION);

  const setCommentHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setError(!text);
    setComment(text);
  };

  const addCommentHandle = async () => {
    await createComment({ variables: { text: comment } });
  };

  return (
    <Card className={styles.card} elevation={12}>
      <CardContent>
        <TextField
          label="Napisz komentarz"
          className={styles.input}
          multiline
          rows={4}
          value={comment}
          variant="filled"
          helperText="Pole nie może być puste"
          error={error}
          onChange={setCommentHandle}
        />
      </CardContent>
      <CardActions>
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item>
            <Button color="primary" disabled={error || !comment} onClick={addCommentHandle}>
              Dodaj komentarz
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
