import React from 'react';
import { TextField, FormControl, InputLabel } from '@mui/material';

interface InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string; // Etiqueta para el campo
}

const Input: React.FC<InputProps> = ({ value, onChange, label }) => {
  return (
    <FormControl fullWidth>
      <TextField
        label={label}
        variant="outlined"
        value={value}
        onChange={onChange}
        sx={{ padding: 2, pb: 0 }}
      />
    </FormControl>
  );
};

export default Input;
