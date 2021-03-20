import { Button, IconButton, makeStyles, useTheme } from '@material-ui/core';
import { AddCircleRounded, RemoveCircleRounded } from '@material-ui/icons';

interface SubmitButtonProps {
  text: string;
  disabled?: boolean;
}

export function SubmitButton({ text, disabled }: SubmitButtonProps) {
  return (
    <Button variant="contained" size="large" color="primary" type="submit" disabled={disabled}>
      {text}
    </Button>
  );
}

interface ActionButtonProps {
  onClick: () => void;
}

interface ActionButtonStylesProps {
  backgroundColor: string;
}

const useStyles = makeStyles({
  actionButtonStyles: {
    color: (props: ActionButtonStylesProps) => props.backgroundColor,
  },
});

export function AddButton({ onClick }: ActionButtonProps) {
  const { palette } = useTheme();
  const { actionButtonStyles } = useStyles({
    backgroundColor: palette.success.main,
  });

  return (
    <IconButton className={actionButtonStyles} onClick={onClick}>
      <AddCircleRounded />
    </IconButton>
  );
}

export function DeleteButton({ onClick }: ActionButtonProps) {
  const { palette } = useTheme();
  const { actionButtonStyles } = useStyles({
    backgroundColor: palette.error.main,
  });

  return (
    <IconButton className={actionButtonStyles} onClick={onClick}>
      <RemoveCircleRounded />
    </IconButton>
  );
}
