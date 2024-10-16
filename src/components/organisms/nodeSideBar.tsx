import React from 'react';
import { Box, Typography } from '@mui/material';
import DraggableNode from '../molecules/draggableNode';

interface NodeSidebarProps {
  onDragStart: (event: React.DragEvent<HTMLDivElement>, type: string) => void;
}

const NodeSidebar: React.FC<NodeSidebarProps> = ({ onDragStart }) => {
  return (
    <Box sx={{ width: '100%', padding: '20px', backgroundColor: '#f4f4f4' }}>
      <Typography variant="h6">Drag Nodes</Typography>
      <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <DraggableNode type="messageNode" label="Message Node" onDragStart={onDragStart} />
        <DraggableNode type="textAreaNode" label="Text Area Node" onDragStart={onDragStart} />
        <DraggableNode type="multiSelectNode" label="MultiSelect Node" onDragStart={onDragStart} />
      </Box>
    </Box>
  );
};

export default NodeSidebar;
