import React from 'react';
import { Field, FieldArray } from 'formik';

import './Field.scss'
import { AddButton, DeleteButton } from '../button/Button';

interface FieldProps {
    label: string;
    name?: string;
    placeholder?: string;
    required?: boolean;
}

interface TextFieldProps extends FieldProps {
    type?: string;
    name: string;
    placeholder: string;
}

export function TextField({ label, type, name, placeholder, required }: TextFieldProps) {
    return(
        <div className="field">
            { label && <label
                className={ `field-label ${ required ? 'required' : '' }` }
                htmlFor={ name }
            >{ label }</label> }
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

export function EmailField({ label, name, placeholder, required }: FieldProps) {
    return(
        <div className="field">
            { label && <label
                className={ `field-label ${ required ? 'required' : '' }` }
                htmlFor={ name || "email" }
            >{ label }</label> }
            <Field 
                className="field-input"
                type="email" 
                name={name || "email"} 
                placeholder={placeholder || "Email"}
            />
        </div>
    )
}

export function PasswordField({ label, name, placeholder, required }: FieldProps) {
    return(
        <div className="field">
            { label && <label
                className={ `field-label ${ required ? 'required' : '' }` }
                htmlFor={ name || "password" }
            >{ label }</label> }
            <Field 
                className="field-input"
                type="password" 
                name={name || "password"} 
                placeholder={placeholder || "Hasło"}
            />
        </div>
    )
}

interface SetFieldProps {
    label: string;
    name: string;
    placeholder: string;
    required?: boolean;
}

export function SetField({ label, name, placeholder, required }: SetFieldProps) {
    return(
        <div className="field">
            { label && <label
                className={ `field-label ${ required ? 'required' : '' }` }
                htmlFor={ name }
            >{ label }</label> }
            <FieldArray
                name={name}
                render={arrayHelpers => (
                    <div className="field-group-container" >
                        {arrayHelpers.form.values[name].map((_: any, index: number) => (
                            <div key={index} className="field-group">
                                <Field 
                                    className="field-input" 
                                    placeholder={ placeholder } 
                                    name={ `${name}[${index}].text` } />

                                <DeleteButton onClick={ () => arrayHelpers.remove(index) }/>
                            </div>
                        ))}
                        <AddButton onClick={ () => arrayHelpers.push({ text: '' }) }/>
                    </div>
                )}
            />
        </div>
    )
}

interface TripleSetFieldProps {
    label: string;
    name: string;
    placeholder: [string, string, string];
    required?: boolean;
}

export function TripleSetField({ label, name, placeholder, required }: TripleSetFieldProps) {
    return(
        <div className="field">
            { label && <label
                className={ `field-label ${ required ? 'required' : '' }` }
                htmlFor={ name }
            >{ label }</label> }
            <FieldArray
                name={name}
                render={arrayHelpers => (
                    <div className="field-group-container" >
                        {arrayHelpers.form.values[name].map((_: any, index: number) => (
                            <div key={index} className="field-group field-group-3">
                                <Field 
                                    className="field-input"
                                    placeholder={ placeholder[0] }
                                    name={`${name}[${index}].product`} 
                                />
                                <Field 
                                    className="field-input"
                                    placeholder={ placeholder[1] }
                                    type="number" name={`${name}[${index}].quantity`} 
                                />
                                <Field 
                                    className="field-input"
                                    placeholder={ placeholder[2] }
                                    name={`${name}[${index}].unit`}
                                />

                                <DeleteButton onClick={ () => arrayHelpers.remove(index) }/>
                            </div>
                        ))}
                        <AddButton onClick={ () => arrayHelpers.push({ product: '', quantity: '', unit: '' }) }/>
                    </div>
                )}
            />
        </div>
    )
}