import React from 'react';
import { Link } from 'react-router-dom';

import './Button.scss'

interface LinkButtonProps {
    text: string;
    to: string;
}

export function LinkButton({ text, to }: LinkButtonProps) {
    return(
        <Link to={to}>
            <button className="button link-button">{text}</button>
        </Link>  
    )
}

interface SubmitButtonProps {
    text: string;
}

export function SubmitButton({ text }: SubmitButtonProps) {
    return(
        <button className="button submit-button" type="submit">{text}</button>
    )
}

interface AddButtonProps {
    text?: string;
    onClick: () => void;
}

export function AddButton({ text, onClick }: AddButtonProps) {
    return(
        <button className="button add-button" type="submit" onClick={ onClick }>{ text || "+" }</button>
    )
}

interface DeleteButtonProps {
    text?: string;
    onClick: () => void;
}

export function DeleteButton({ text, onClick }: DeleteButtonProps) {
    return(
        <button className="button delete-button" type="submit" onClick={ onClick }>{ text || "-" }</button>
    )
}