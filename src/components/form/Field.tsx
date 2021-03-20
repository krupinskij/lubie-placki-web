import React from 'react';
import { Field, FieldArray, FieldAttributes } from 'formik';

import { AddButton, DeleteButton } from '../button/Button';
import { makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles({
  fieldStyles: {
    marginTop: 10,
    marginBottom: 10,
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
  placeholder: string;
  required?: boolean;
}

export function SetField({ label, name, placeholder, required }: SetFieldProps) {
  return (
    <div className="field">
      {label && (
        <label className={`field-label ${required ? 'required' : ''}`} htmlFor={name}>
          {label}
        </label>
      )}
      <FieldArray
        name={name}
        render={(arrayHelpers) => (
          <div className="field-group-container">
            {arrayHelpers.form.values[name].map((_: any, index: number) => (
              <div key={index} className="field-group">
                <Field className="field-input" placeholder={placeholder} name={`${name}[${index}].text`} />

                <DeleteButton onClick={() => arrayHelpers.remove(index)} />
              </div>
            ))}
            <AddButton onClick={() => arrayHelpers.push({ text: '' })} />
          </div>
        )}
      />
    </div>
  );
}

interface TripleSetFieldProps {
  label: string;
  name: string;
  placeholder: [string, string, string];
  required?: boolean;
}

export function TripleSetField({ label, name, placeholder, required }: TripleSetFieldProps) {
  return (
    <div className="field">
      {label && (
        <label className={`field-label ${required ? 'required' : ''}`} htmlFor={name}>
          {label}
        </label>
      )}
      <FieldArray
        name={name}
        render={(arrayHelpers) => (
          <div className="field-group-container">
            {arrayHelpers.form.values[name].map((_: any, index: number) => (
              <div key={index} className="field-group field-group-3">
                <Field className="field-input" placeholder={placeholder[0]} name={`${name}[${index}].product`} />
                <Field
                  className="field-input"
                  placeholder={placeholder[1]}
                  type="number"
                  name={`${name}[${index}].quantity`}
                />
                <Field className="field-input" placeholder={placeholder[2]} name={`${name}[${index}].unit`} />

                <DeleteButton onClick={() => arrayHelpers.remove(index)} />
              </div>
            ))}
            <AddButton onClick={() => arrayHelpers.push({ product: '', quantity: '', unit: '' })} />
          </div>
        )}
      />
    </div>
  );
}
