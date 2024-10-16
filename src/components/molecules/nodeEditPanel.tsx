import React from 'react';
import { Box, Typography } from '@mui/material';
import Input from '../atoms/input';

interface NodeEditPanelProps {
  selectedNodeLabel: string;
  onLabelChange: (newLabel: string) => void;
}

const NodeEditPanel: React.FC<NodeEditPanelProps> = ({ selectedNodeLabel, onLabelChange }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        right: 0,
        top: '10%',
        width: '20%',
        padding: '20px',
        backgroundColor: '#d3d3d3',
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Edit Node
      </Typography>
      <Input value={selectedNodeLabel} onChange={(e) => onLabelChange(e.target.value)} />
    </Box>
  );
};

export default NodeEditPanel;
