import { Handle, Position } from '@xyflow/react';
import { useState } from 'react';
import { Box, Typography, TextField, IconButton, TextareaAutosize } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

interface MessageNodeProps {
  data: {
    question?: string,
    label: string;
  };
}

const handleDefault = {
  width: '10px', 
  height: '10px', 
  borderRadius: '50%'
};

export const StartNode = ({ data }: MessageNodeProps) => (
  <Box sx={{ backgroundColor: 'blue', color: 'white', p: 2, borderRadius: 1 }}>
    <Handle type="source" position={Position.Bottom} style={handleDefault} />
    <Typography variant="body1" fontWeight="bold">{data.label || 'Start'}</Typography>
  </Box>
);

export const EndNode = ({ data }: MessageNodeProps) => (
  <Box sx={{ backgroundColor: 'red', color: 'white', p: 2, borderRadius: 1 }}>
    <Handle type="target" position={Position.Top} style={handleDefault} />
    <Typography variant="body1" fontWeight="bold">{data.label || 'End'}</Typography>
  </Box>
);

export const MessageNode = ({ data }: MessageNodeProps) => (
  <Box sx={{ backgroundColor: 'green', color: 'white', p: 2, borderRadius: 1 }}>
    <Handle type="target" position={Position.Top} style={handleDefault}/>
    <Typography variant="body1" fontWeight="bold">{data.label}</Typography>
    <Handle type="source" position={Position.Bottom} style={handleDefault} />
  </Box>
);

export const TextAreaNode = ({ data }: MessageNodeProps) => (
  <Box sx={{ backgroundColor: 'orange', p: 2, borderRadius: 1 }}>
    <Handle type="target" position={Position.Top} style={handleDefault}/>
    <Typography variant="body1" fontWeight="bold">{data.label}</Typography>
    <Box sx={{ mt: 2 }}>
      <TextareaAutosize
        minRows={3}
        placeholder="Your name, please!"
        style={{ width: '100%', resize: 'none' }}
      />
    </Box>
    <Handle type="source" position={Position.Bottom} style={handleDefault} />
  </Box>
);

export const MultiSelectNode = ({ data }: MessageNodeProps) => {
  const [options, setOptions] = useState(['PIN', 'Password']);
  const [newOption, setNewOption] = useState('');

  const addOption = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (newOption.trim() !== '') {
      setOptions([...options, newOption]);
      setNewOption('');
    }
  };

  const removeOption = (indexToRemove: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setOptions(options.filter((_, index) => index !== indexToRemove));
  };

  const handleInputClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <Box sx={{ backgroundColor: 'purple', color: 'white', p: 2, borderRadius: 1, mb: 2, position: 'relative' }}>
      <Handle type="target" position={Position.Top} style={handleDefault} />
      <Typography variant="body1" fontWeight="bold">{data.question}</Typography>
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

            <Handle
              type="source"
              position={Position.Right}
              id={`option-${index}`}
              style={{...handleDefault, position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '-20px'}}
            />

            <IconButton onClick={(e) => removeOption(index, e)} sx={{ color: 'white', ml: 1 }}>
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
          InputProps={{ sx: { color: 'white' }, onClick: handleInputClick }}
        />
      </Box>
    </Box>
  );
};
