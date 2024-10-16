import React from 'react';
import { Button as MuiButton } from '@mui/material';

interface ButtonProps {
  onClick: () => void;
  label: string;
  variant?: 'contained' | 'outlined';
}

const Button: React.FC<ButtonProps> = ({ onClick, label, variant = 'contained' }) => {
  return <MuiButton variant={variant} onClick={onClick}>{label}</MuiButton>;
};

export default Button;
