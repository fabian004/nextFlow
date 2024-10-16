import React from 'react';
import { TextField } from '@mui/material';

interface InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ value, onChange }) => {
  return (
    <TextField
      variant="outlined"
      fullWidth
      value={value}
      onChange={onChange}
      sx={{ padding: '8px' }}
    />
  );
};

export default Input;
