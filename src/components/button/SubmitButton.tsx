import Button from '@material-ui/core/Button';

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
