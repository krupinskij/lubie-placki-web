import React from 'react';
import { Form } from 'formik';

import './Form.scss';

interface FormProps {
    title?: string;
    children: any
}

export function FormContainer({title, children}: FormProps) {
    return(
        <Form className="form">
            {
                title &&
                <div className="form-header">{title}</div>
            }
            {children}        
        </Form>
    )
}

interface FormPartProps {
    children: any
}

export function FormFields({children}: FormPartProps) {
    return(
        <div className="form-fields">
            {children}
        </div>
    )
}

export function FormActions({children}: FormPartProps) {
    return(
        <div className="form-actions">
            {children}
        </div>
    )
}