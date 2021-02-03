import React from 'react';
import { Link } from 'react-router-dom';

import './FormLink.scss'

interface FormLinkProps {
    pretext?: string;
    text: string;
    to: string;
}

export function FormLink({ pretext, text, to }: FormLinkProps) {
    return(
        <div className="form-link">
            {pretext} <Link className="form-link-text" to={to}>{text}</Link>
        </div>
    )
}