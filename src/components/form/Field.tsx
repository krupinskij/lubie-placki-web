import React from 'react';
import { Field } from 'formik';

import './Field.scss'

interface FieldProps {
    label: string;
    name?: string;
    placeholder?: string;
}

interface TextFieldProps extends FieldProps {
    type?: string;
    name: string;
    placeholder: string;
}

export function TextField({ label, type, name, placeholder }: TextFieldProps) {
    return(
        <div className="field">
            <label className="field-label" htmlFor={name}>{label}</label>
            <Field 
                className="field-input"
                id={name}
                type={type || "text"} 
                name={name} 
                placeholder={placeholder}
            />
        </div>
    )
}

export function EmailField({ label, name, placeholder }: FieldProps) {
    return(
        <div className="field">
            <label className="field-label" htmlFor={name || "email"} >{label}</label>
            <Field 
                className="field-input"
                type="email" 
                name={name || "email"} 
                placeholder={placeholder || "Email"}
            />
        </div>
    )
}

export function PasswordField({ label, name, placeholder }: FieldProps) {
    return(
        <div className="field">
            <label className="field-label" htmlFor={name || "password"} >{label}</label>
            <Field 
                className="field-input"
                type="password" 
                name={name || "password"} 
                placeholder={placeholder || "Hasło"}
            />
        </div>
    )
}