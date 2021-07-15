import { FieldArray, useField } from 'formik';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { AddButton, DeleteButton } from '../button/ActionButton';

const useStyles = makeStyles({
  fieldStyles: {
    marginTop: 10,
    marginBottom: 10,
  },
  requiredFieldTitleStyles: {
    '&::after': {
      content: '"*"',
      color: 'red',
    },
  },
  setFieldRowStyles: {
    display: 'grid',
    gridTemplateColumns: '9fr 1fr',
  },
  tripleSetFieldRowStyles: {
    display: 'grid',
    gridTemplateColumns: '5fr 2fr 2fr 1fr',
  },
});

interface FieldProps {
  label?: string;
  name?: string;
  required?: boolean;
}

interface TextFieldProps extends FieldProps {
  name: string;
  label: string;
  type?: string;
}

export function FormTextField({ label, name, type, required }: TextFieldProps) {
  const { fieldStyles } = useStyles();
  return <FormBaseField name={name} label={label} styles={fieldStyles} type={type || 'text'} required={required} />;
}

export function FormEmailField({ label, name, required }: FieldProps) {
  const { fieldStyles } = useStyles();
  return (
    <FormBaseField
      name={name || 'email'}
      label={label || 'Email'}
      styles={fieldStyles}
      type="email"
      required={required}
    />
  );
}

export function FormPasswordField({ label, name, required }: FieldProps) {
  const { fieldStyles } = useStyles();
  return (
    <FormBaseField
      name={name || 'password'}
      label={label || 'Hasło'}
      styles={fieldStyles}
      type="password"
      required={required}
    />
  );
}

interface SetFieldProps {
  label: string;
  name: string;
  title: string;
  required?: boolean;
}

export function SetField({ label, name, title, required }: SetFieldProps) {
  const { fieldStyles, requiredFieldTitleStyles, setFieldRowStyles } = useStyles();
  return (
    <FieldArray
      name={name}
      render={(arrayHelpers) => (
        <div className={fieldStyles}>
          <Typography variant="h6" component="h3">
            <span className={required ? requiredFieldTitleStyles : ''}>{title}</span>
            <AddButton onClick={() => arrayHelpers.push({ text: '' })} />
          </Typography>
          {arrayHelpers.form.values[name].map((_: any, index: number) => (
            <div key={index} className={setFieldRowStyles}>
              <FormBaseField name={`${name}[${index}].text`} label={label} type="text" />
              <DeleteButton onClick={() => arrayHelpers.remove(index)} />
            </div>
          ))}
        </div>
      )}
    />
  );
}

interface TripleSetFieldProps {
  label: [string, string, string];
  name: string;
  title: string;
  required?: boolean;
}

export function TripleSetField({ label, name, title, required }: TripleSetFieldProps) {
  const { fieldStyles, requiredFieldTitleStyles, tripleSetFieldRowStyles } = useStyles();

  return (
    <FieldArray
      name={name}
      render={(arrayHelpers) => (
        <div className={fieldStyles}>
          <Typography variant="h6" component="h3">
            <span className={required ? requiredFieldTitleStyles : ''}>{title}</span>
            <AddButton onClick={() => arrayHelpers.push({ product: '', quantity: '', unit: '' })} />
          </Typography>
          {arrayHelpers.form.values[name].map((_: any, index: number) => (
            <div key={index} className={tripleSetFieldRowStyles}>
              <FormBaseField name={`${name}[${index}].product`} label={label[0]} type="text" />
              <FormBaseField name={`${name}[${index}].quantity`} label={label[1]} type="number" />
              <FormBaseField name={`${name}[${index}].unit`} label={label[2]} type="text" />
              <DeleteButton onClick={() => arrayHelpers.remove(index)} />
            </div>
          ))}
        </div>
      )}
    />
  );
}

interface FormBaseFieldProps {
  type: string;
  label: string;
  name: string;
  styles?: string;
  required?: boolean;
}

function FormBaseField({ type, label, name, styles, required }: FormBaseFieldProps) {
  const [field, meta] = useField({ name });

  return (
    <TextField
      className={styles}
      type={type || 'text'}
      label={label}
      name={name}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      error={meta.touched && Boolean(meta.error)}
      required={required}
      helperText={meta.touched && meta.error}
      variant="outlined"
      fullWidth
    />
  );
}
