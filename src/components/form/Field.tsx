import React from 'react';
import { Field, FieldArray, FieldAttributes } from 'formik';

import { AddButton, DeleteButton } from '../button/Button';
import { makeStyles, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  fieldStyles: {
    marginTop: 10,
    marginBottom: 10,
  },
  requiredFieldTitleStyle: {
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
  label: string;
  name?: string;
  required?: boolean;
}

interface TextFieldProps extends FieldProps {
  name: string;
  type?: string;
}

export function FormTextField({ label, name, type, required }: TextFieldProps) {
  const { fieldStyles } = useStyles();
  return (
    <Field name={name}>
      {({ field, meta }: FieldAttributes<any>) => (
        <TextField
          className={fieldStyles}
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
      )}
    </Field>
  );
}

export function FormEmailField({ label, name, required }: FieldProps) {
  const { fieldStyles } = useStyles();
  return (
    <Field name={name || 'email'}>
      {({ field, meta }: FieldAttributes<any>) => (
        <TextField
          className={fieldStyles}
          type="email"
          label={label || 'Email'}
          name={name || 'email'}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          error={meta.touched && Boolean(meta.error)}
          required={required}
          helperText={meta.touched && meta.error}
          variant="outlined"
          fullWidth
        />
      )}
    </Field>
  );
}

export function FormPasswordField({ label, name, required }: FieldProps) {
  const { fieldStyles } = useStyles();
  return (
    <Field name={name || 'password'}>
      {({ field, meta }: FieldAttributes<any>) => (
        <TextField
          className={fieldStyles}
          type="password"
          label={label || 'Hasło'}
          name={name || 'password'}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          error={meta.touched && Boolean(meta.error)}
          required={required}
          helperText={meta.touched && meta.error}
          variant="outlined"
          fullWidth
        />
      )}
    </Field>
  );
}

interface SetFieldProps {
  label: string;
  name: string;
  title: string;
  required?: boolean;
}

export function SetField({ label, name, title, required }: SetFieldProps) {
  const { fieldStyles, requiredFieldTitleStyle, setFieldRowStyles } = useStyles();
  return (
    <FieldArray
      name={name}
      render={(arrayHelpers) => (
        <div className={fieldStyles}>
          <Typography variant="h6" component="h3">
            <span className={required ? requiredFieldTitleStyle : ''}>{title}</span>
            <AddButton onClick={() => arrayHelpers.push({ text: '' })} />
          </Typography>
          {arrayHelpers.form.values[name].map((_: any, index: number) => (
            <div key={index} className={setFieldRowStyles}>
              <Field name={`${name}[${index}].text`}>
                {({ field, meta }: FieldAttributes<any>) => (
                  <TextField
                    type="text"
                    label={label}
                    name={`${name}[${index}].text`}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                    variant="outlined"
                    fullWidth
                  />
                )}
              </Field>
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
  const { fieldStyles, requiredFieldTitleStyle, tripleSetFieldRowStyles } = useStyles();

  return (
    <FieldArray
      name={name}
      render={(arrayHelpers) => (
        <div className={fieldStyles}>
          <Typography variant="h6" component="h3">
            <span className={required ? requiredFieldTitleStyle : ''}>{title}</span>
            <AddButton onClick={() => arrayHelpers.push({ product: '', quantity: '', unit: '' })} />
          </Typography>
          {arrayHelpers.form.values[name].map((_: any, index: number) => (
            <div key={index} className={tripleSetFieldRowStyles}>
              <Field name={`${name}[${index}].product`}>
                {({ field, meta }: FieldAttributes<any>) => (
                  <TextField
                    type="text"
                    label={label[0]}
                    name={`${name}[${index}].product`}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                    variant="outlined"
                    fullWidth
                  />
                )}
              </Field>
              <Field name={`${name}[${index}].quantity`}>
                {({ field, meta }: FieldAttributes<any>) => (
                  <TextField
                    type="number"
                    label={label[1]}
                    name={`${name}[${index}].quantity`}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                    variant="outlined"
                    fullWidth
                  />
                )}
              </Field>
              <Field name={`${name}[${index}].unit`}>
                {({ field, meta }: FieldAttributes<any>) => (
                  <TextField
                    type="text"
                    label={label[2]}
                    name={`${name}[${index}].unit`}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                    variant="outlined"
                    fullWidth
                  />
                )}
              </Field>
              <DeleteButton onClick={() => arrayHelpers.remove(index)} />
            </div>
          ))}
        </div>
      )}
    />
  );
}
