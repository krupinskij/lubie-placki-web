import { useField } from 'formik';

import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

interface FormSelectProps {
  label: string;
  name: string;
  options: {
    value: string;
    display: string;
  }[];
}

const useStyles = makeStyles({
  field: {
    marginTop: 10,
    marginBottom: 10,
    width: '50%',
  },
});

export function FormSelect({ label, name, options }: FormSelectProps) {
  const styles = useStyles();
  const [field, meta] = useField({ name });

  return (
    <TextField
      name={name}
      className={styles.field}
      value={field.value}
      onChange={field.onChange}
      label={label}
      onBlur={field.onBlur}
      error={meta.touched && Boolean(meta.error)}
      variant="outlined"
      select
    >
      {options.map((option) => {
        return (
          <MenuItem key={option.value} value={option.value}>
            {option.display}
          </MenuItem>
        );
      })}
    </TextField>
  );
}
