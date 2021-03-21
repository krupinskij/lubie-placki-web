import { makeStyles, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddCircleRounded from '@material-ui/icons/AddCircleRounded';
import RemoveCircleRounded from '@material-ui/icons/RemoveCircleRounded';

interface ActionButtonStylesProps {
  backgroundColor: string;
}

const useStyles = makeStyles({
  actionButtonStyles: {
    color: (props: ActionButtonStylesProps) => props.backgroundColor,
  },
});

interface ActionButtonProps {
  onClick: () => void;
}

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
