import React from 'react';
import { Select as MuiSelect, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

interface SelectProps {
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  label: string; // Etiqueta para el control
  options: string[]; // Opciones a mostrar en el select
}

const Select: React.FC<SelectProps> = ({ value, onChange, label, options }) => {
  return (
    <FormControl fullWidth sx={{ padding: 2 }}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        value={value}
        onChange={onChange}
        variant="outlined"
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;
