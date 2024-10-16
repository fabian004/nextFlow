import React from 'react';
import { Box, Button } from '@mui/material';

interface DraggableNodeProps {
  type: string;
  label: string;
  onDragStart: (event: React.DragEvent<HTMLDivElement>, type: string) => void;
}

const DraggableNode: React.FC<DraggableNodeProps> = ({ type, label, onDragStart }) => {
  return (
    <Box
      component="div"
      onDragStart={(event) => onDragStart(event, type)}
      draggable
      sx={{
        marginBottom: '10px',
        padding: '10px',
        backgroundColor: '#ddd',
        cursor: 'grab',
        width:"170px"
      }}
    >
      <Button variant="contained" color="primary" sx={{ width: '100%', height:"100%" }}>
        {label}
      </Button>
    </Box>
  );
};

export default DraggableNode;
