import { useMutation } from 'react-apollo';
import { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { CardBody, CardContainer, CardFooter } from '../card/Card';

import { CREATE_COMMENT_MUTATION } from '../../graphql/create-comment';
import { Data } from '../../typings/types';

const useStyles = makeStyles({
  input: {
    width: '100%',
  },
});

interface CommentInputProps {
  recipe: string;
}

export function CommentInput({ recipe }: CommentInputProps) {
  const styles = useStyles();
  const [comment, setComment] = useState('');
  const [error, setError] = useState(false);

  const [createComment] = useMutation<Data.CreateCommentData>(CREATE_COMMENT_MUTATION, {
    refetchQueries: ['CommentsByRecipeId'],
  });

  const setCommentHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setError(!text);
    setComment(text);
  };

  const addCommentHandle = async () => {
    const commentInput = {
      text: comment,
      recipeId: recipe,
    };
    await createComment({ variables: { commentInput } });
    setComment('');
    setError(false);
  };

  return (
    <CardContainer>
      <CardBody>
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
      </CardBody>
      <CardFooter justifyContent="flex-end">
        <Button color="primary" disabled={error || !comment} onClick={addCommentHandle}>
          Dodaj komentarz
        </Button>
      </CardFooter>
    </CardContainer>
  );
}
