import { Handle, Position } from '@xyflow/react';
import { useState } from 'react';
import { Box, Typography, TextField, IconButton, TextareaAutosize } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

interface MessageNodeProps {
  data: {
    label: string;
  };
}

export const MessageNode = ({ data }: MessageNodeProps) => (
  <Box sx={{ backgroundColor: 'green', color: 'white', p: 2, borderRadius: 1, mb: 2 }}>
    <Handle type="target" position={Position.Top} />
    <Typography variant="body1" fontWeight="bold">{data.label}</Typography>
    <Handle type="source" position={Position.Bottom} />
  </Box>
);

export const TextAreaNode = ({ data }: MessageNodeProps) => (
  <Box sx={{ backgroundColor: 'orange', p: 2, borderRadius: 1, mb: 2 }}>
    <Handle type="target" position={Position.Top} />
    <Typography variant="body1" fontWeight="bold">{data.label}</Typography>
    <Box sx={{ mt: 2 }}>
      <TextareaAutosize
        minRows={3}
        placeholder="Your name, please!"
        style={{ width: '100%', resize: 'none' }}
      />
    </Box>
    <Handle type="source" position={Position.Bottom} />
  </Box>
);

export const MultiSelectNode = ({ data }: MessageNodeProps) => {
  const [options, setOptions] = useState(['PIN', 'Password']);
  const [newOption, setNewOption] = useState('');

  const addOption = () => {
    if (newOption.trim() !== '') {
      setOptions([...options, newOption]);
      setNewOption('');
    }
  };

  const removeOption = (indexToRemove: number) => {
    setOptions(options.filter((_, index) => index !== indexToRemove));
  };

  return (
    <Box sx={{ backgroundColor: 'purple', color: 'white', p: 2, borderRadius: 1, mb: 2, position: 'relative' }}>
      <Handle type="target" position={Position.Top} />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body1" fontWeight="bold">{data.label}</Typography>
        <IconButton onClick={addOption} sx={{ color: 'white', ml: 1 }}>
          <AddIcon />
        </IconButton>
      </Box>

      <Box sx={{ mt: 2 }}>
        {options.map((option, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1, position: 'relative' }}>
            <Typography variant="body2">{option}</Typography>

            {/* Handle for each option */}
            <Handle
              type="source"
              position={Position.Right}
              id={`option-${index}`}
              style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '-20px' }}
            />

            <IconButton onClick={() => removeOption(index)} sx={{ color: 'white', ml: 1 }}>
              <CloseIcon />
            </IconButton>
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: 2 }}>
        <TextField
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          placeholder="Add new option"
          fullWidth
          variant="outlined"
          InputProps={{ sx: { color: 'white' } }}
        />
      </Box>
    </Box>
  );
};
