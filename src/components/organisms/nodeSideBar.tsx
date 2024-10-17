import React from 'react';
import { Box, Typography } from '@mui/material';
import DraggableNode from '../molecules/draggableNode';

interface NodeSidebarProps {
  onDragStart: (event: React.DragEvent<HTMLDivElement>, type: string) => void;
}

const NodeSidebar: React.FC<NodeSidebarProps> = ({ onDragStart }) => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Box sx={{
        paddingTop: '20px',
        paddingLeft: '20px'}}
      >
        <Typography variant="h6">Drag Nodes</Typography>
        <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <DraggableNode type="messageNode" label="Message Node" onDragStart={onDragStart} />
          <DraggableNode type="textAreaNode" label="Text Area Node" onDragStart={onDragStart} />
          <DraggableNode type="multiSelectNode" label="MultiSelect Node" onDragStart={onDragStart} />
        </Box>
      </Box>
    </Box>
  );
};



export default NodeSidebar;
