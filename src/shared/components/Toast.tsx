import React from 'react';
import { useToast } from '../../core/context/ToastContext';

export const Toast: React.FC = () => {
  const { message } = useToast();

  return <div className={`toast ${message ? 'show' : ''}`}>{message}</div>;
};
