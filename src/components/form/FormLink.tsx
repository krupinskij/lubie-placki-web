import React from 'react';
import { Field } from 'formik';

import './FormLink.scss';
import { Link } from 'react-router-dom';

interface FormLinkProps {
  pretext?: string;
  text: string;
  to: string;
}

export function FormLink({ pretext, text, to }: FormLinkProps) {
  return (
    <div className="form-link">
      {pretext}{' '}
      <Link className="form-link-text" to={to}>
        {text}
      </Link>
    </div>
  );
}
