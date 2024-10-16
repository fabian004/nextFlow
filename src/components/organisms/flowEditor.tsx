import React, { useCallback, useEffect, useState } from 'react';
import { ReactFlow, addEdge, MarkerType, useEdgesState, useNodesState, Node } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import NodeEditPanel from '../molecules/nodeEditPanel';
import { MessageNode, MultiSelectNode, TextAreaNode } from '../molecules/customNodes';
import { initialEdges, initialNodes } from '@/utils/initialStates';
import { Box } from '@mui/material';

const nodeTypes = {
  messageNode: MessageNode,
  textAreaNode: TextAreaNode,
  multiSelectNode: MultiSelectNode,
};

const FlowEditor: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeCount, setNodeCount] = useState(initialNodes.length);
  const [selectedNode, setSelectedNode] = useState<Node<any> | null>(null);
  const [selectedNodeLabel, setSelectedNodeLabel] = useState('');

  const onConnect = useCallback(
    (params:any) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            markerEnd: { type: MarkerType.ArrowClosed, width: 10, height: 10, color: 'black' },
            style: { stroke: 'black', strokeWidth: 2 },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  const onDrop = (event: any) => {
    event.preventDefault();
    const reactFlowBounds = event.target.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
  
    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };
  
    if (type) {
      addNode(type, position);
    }
  };

  const addNode = (type: string, position: { x: number; y: number }) => {
    const newNode = {
      id: (nodeCount + 1).toString(),
      type,
      position,
      data: { label: `Node ${nodeCount + 1}` },
    };
    setNodes((nds) => [...nds, newNode]);
    setNodeCount((count) => count + 1);
  };

  const onNodeClick = (event: any, node: Node) => {
    setSelectedNode(node);
  };

  useEffect(() => {
    if (selectedNode) {
      setSelectedNodeLabel(selectedNode.data.label);
    }
  }, [selectedNode]);

  const updateNodeLabel = (newLabel: string) => {
    setNodes((nds) =>
      nds.map((node) => (node.id === selectedNode?.id ? { ...node, data: { ...node.data, label: newLabel } } : node))
    );
    setSelectedNodeLabel(newLabel);
  };

  return (
    <Box sx={{ flexGrow: 1, height: 'calc(100vh - 20px)', backgroundColor: '#f9f9f9' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={(event) => event.preventDefault()}
        onNodeClick={onNodeClick}
        style={{ width: '100%', height: '100%' }}
      />
      {selectedNode && (
        <NodeEditPanel
          selectedNodeLabel={selectedNodeLabel}
          onLabelChange={(newLabel) => updateNodeLabel(newLabel)}
        />
      )}
    </Box>
  );
};

export default FlowEditor;
