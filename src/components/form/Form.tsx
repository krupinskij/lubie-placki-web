import React from 'react';
import { Form } from 'formik';

import { Button, CardContent, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  formActionsStyles: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: 10,
  },
});

interface FormProps {
  children: any;
}

export function FormContainer({ children }: FormProps) {
  return (
    <CardContent>
      <Form noValidate={true}>{children}</Form>
    </CardContent>
  );
}

interface FormHeaderProps {
  title: string;
}

export function FormHeader({ title }: FormHeaderProps) {
  return (
    <Typography align="center" gutterBottom variant="h3" component="h2">
      {title}
    </Typography>
  );
}

interface FormPartProps {
  children: any;
}

export function FormFields({ children }: FormPartProps) {
  return <div className="form-fields">{children}</div>;
}

export function FormActions({ children }: FormPartProps) {
  const { formActionsStyles } = useStyles();
  return <div className={formActionsStyles}>{children}</div>;
}

interface FormLinkProps {
  prefix?: string;
  suffix?: string;
  text: string;
  to: string;
}

export function FormLink({ prefix, suffix, text, to }: FormLinkProps) {
  return (
    <Typography align="center">
      {prefix && <span>{prefix} </span>}
      <Link color="primary" to={to}>
        {text}
      </Link>
      {suffix && <span> {suffix}</span>}
    </Typography>
  );
}
