import { Handle, Position } from '@xyflow/react';
import { Box, Typography, TextField, IconButton, TextareaAutosize } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux';
import { removeEdge, updateNodeOptions } from '@/redux/drawerSlice';
import { NodeOptions } from '@/interfaces/MyNode';

interface MessageNodeProps {
  id: string,
  data: {
    question?: string,
    label: string;
    options?: NodeOptions[]
  };
}

const handleDefault = {
  width: '10px', 
  height: '10px', 
  borderRadius: '50%',
  background: '#666'
};

const nodeStyle = {
  backgroundColor: '#f4f4f4',
  color: '#333',
  padding: '16px', 
  borderRadius: '8px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  marginBottom: '2px', 
  width: '100%'
};

export const StartNode = ({ data }: MessageNodeProps) => (
  <Box sx={nodeStyle}>
    <Handle type="source" position={Position.Bottom} style={handleDefault} />
    <Typography variant="h6" fontWeight="500">{data.label || 'Start'}</Typography>
  </Box>
);

export const EndNode = ({ data }: MessageNodeProps) => (
  <Box sx={{ ...nodeStyle, backgroundColor: '#e0e0e0' }}> 
    <Handle type="target" position={Position.Top} style={handleDefault} />
    <Typography variant="h6" fontWeight="500">{data.label || 'End'}</Typography>
  </Box>
);

export const MessageNode = ({ data }: MessageNodeProps) => (
  <Box sx={nodeStyle}>
    <Handle type="target" position={Position.Top} style={handleDefault}/>
    <Typography variant="h6" fontWeight="500">{data.label}</Typography>
    <Handle type="source" position={Position.Bottom} style={handleDefault} />
  </Box>
);

export const TextAreaNode = ({ data }: MessageNodeProps) => (
  <Box sx={nodeStyle}>
    <Handle type="target" position={Position.Top} style={handleDefault}/>
    <Typography variant="h6" fontWeight="500">{data.label}</Typography>
    <Box sx={{ mt: 2 }}>
      <TextareaAutosize
        minRows={3}
        placeholder="Your name, please!"
        style={{ width: '100%', resize: 'none', background: '#fafafa', padding: '8px', border: '1px solid #ddd' }}
      />
    </Box>
    <Handle type="source" position={Position.Bottom} style={handleDefault} />
  </Box>
);

export const MultiSelectNode = ({ id, data }: MessageNodeProps) => {
  const dispatch = useDispatch();
  const { edges } = useSelector((state: RootState) => state.drawer);

  const [options, setOptions] = useState<NodeOptions[]>(data.options || []);
  const [newOption, setNewOption] = useState('');

  const addOption = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (newOption.trim() !== '') {
      const newId = uuidv4(); 
      const updatedOptions = [...options, { id: newId, label: newOption }];
      setOptions(updatedOptions);
      setNewOption('');
      updateNodeOptionsInRedux(updatedOptions);
    }
  };

  const removeOption = (optionId: string, event: React.MouseEvent) => {
    event.stopPropagation();
  
    const edgeToRemove = edges.find(edge => edge.sourceHandle === "option-"+optionId);
    if (edgeToRemove) {
      dispatch(removeEdge(edgeToRemove.id));
    }

    const updatedOptions = options.filter(option => option.id !== optionId);
    setOptions(updatedOptions);
    
    updateNodeOptionsInRedux(updatedOptions); 
  };
  const handleInputClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const updateNodeOptionsInRedux = (updatedOptions: NodeOptions[]) => {
    dispatch(updateNodeOptions({ nodeId: id, options: updatedOptions }));
  };

  return (
    <Box sx={{ ...nodeStyle, backgroundColor: '#f8f8f8' }}>
      <Handle type="target" position={Position.Top} style={handleDefault} />
      <Typography variant="h6" fontWeight="500">{data.question}</Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body1" fontWeight="500">{data.label}</Typography>
        <IconButton onClick={addOption} sx={{ color: '#333', ml: 1 }}>
          <AddIcon />
        </IconButton>
      </Box>

      <Box sx={{ mt: 2 }}>
        {options.map((option) => (
          <Box key={option.id} sx={{ display: 'flex', alignItems: 'center', mb: 1, position: 'relative' }}>
            <Typography variant="body2">{option.label}</Typography>

            <Handle
              type="source"
              position={Position.Right}
              id={`option-${option.id}`}
              style={{ ...handleDefault, position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '-20px' }}
            />

            <IconButton onClick={(e) => removeOption(option.id, e)} sx={{ color: '#333', ml: 1 }}>
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
          InputProps={{ sx: { color: '#333' }, onClick: handleInputClick }}
        />
      </Box>
    </Box>
  );
};
