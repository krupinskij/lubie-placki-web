import React from 'react';
import { Link } from 'react-router-dom';

import './Button.scss';

interface LinkButtonProps {
  text: string;
  to: string;
}

export function LinkButton({ text, to }: LinkButtonProps) {
  return (
    <Link to={to}>
      <button className="button link-button" type="button">
        {text}
      </button>
    </Link>
  );
}

interface SubmitButtonProps {
  text: string;
  disabled?: boolean;
}

export function SubmitButton({ text, disabled }: SubmitButtonProps) {
  return (
    <button className="button submit-button" type="submit" disabled={disabled}>
      {text}
    </button>
  );
}

interface AddButtonProps {
  text?: string;
  onClick: () => void;
}

export function AddButton({ text, onClick }: AddButtonProps) {
  return (
    <button className="button add-button" type="button" onClick={onClick}>
      {text || '+'}
    </button>
  );
}

interface DeleteButtonProps {
  text?: string;
  onClick: () => void;
}

export function DeleteButton({ text, onClick }: DeleteButtonProps) {
  return (
    <button className="button delete-button" type="button" onClick={onClick}>
      {text || '-'}
    </button>
  );
}

interface PanelButtonProps {
  text: string;
  onClick: () => void;
}

export function PanelButton({ text, onClick }: PanelButtonProps) {
  return (
    <button className="button panel-button" type="button" onClick={onClick}>
      {text}
    </button>
  );
}
