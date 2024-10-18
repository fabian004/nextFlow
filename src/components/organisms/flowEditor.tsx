import React, { useCallback, useState } from 'react';
import { ReactFlow, applyEdgeChanges, MarkerType, Node, EdgeChange, NodeChange } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { EndNode, MessageNode, MultiSelectNode, StartNode, TextAreaNode } from '../molecules/customNodes';
import { Box, SpeedDial, SpeedDialAction } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux';
import {
  setActualNode,
  openDrawer,
  setNodes,
  setEdges,
  addNode as addReduxNode,
  addEdge as addReduxEdge,
} from '@/redux/drawerSlice';
import { NodeMessageTypes } from '@/constants/NodeMessageTypes';
import { NodeMultiSelectTypes } from '@/constants/NodeMultiSelectTypes';
import { MyNode } from '@/interfaces/MyNode';

const nodeTypes = {
  messageNode: MessageNode,
  textAreaNode: TextAreaNode,
  multiSelectNode: MultiSelectNode,
  startNode: StartNode,
  endNode: EndNode,
};

const FlowEditor: React.FC = () => {
  const dispatch = useDispatch();
  const { nodes, edges } = useSelector((state: RootState) => state.drawer);
  const [nodeCount, setNodeCount] = useState(nodes.length);

  const onConnect = useCallback(
    (params: any) => {
      const newEdge = {
        id: `edge-${params.source}-${params.target}`,
        ...params,
        animated: true,
        markerEnd: { type: MarkerType.ArrowClosed, width: 10, height: 10, color: 'black' },
        style: { stroke: 'black', strokeWidth: 2 },
      };
      dispatch(addReduxEdge(newEdge));
    },
    [dispatch]
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
    let label = "Nuevo Elemento"
    if(type == "messageNode") label = NodeMessageTypes.Initial
    
    const newNode: MyNode = {
      id: (nodeCount + 1).toString(),
      type,
      position,
      data: { label: label },
    };

    if(type == "multiSelectNode") {
      newNode.data.question = NodeMultiSelectTypes.Initial
    }

    dispatch(addReduxNode(newNode));
    setNodeCount((count) => count + 1);
  };

  const onNodeClick = (event: any, node: Node) => {
    if(node.type !== "startNode" && node.type !== "endNode"){
      dispatch(setActualNode(node));
      dispatch(openDrawer());
    }
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, type: string) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      const updatedEdges = applyEdgeChanges(changes, edges);
      dispatch(setEdges(updatedEdges));
    },
    [edges, dispatch]
  );

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      dispatch(setNodes(changes));
    },
    [nodes, dispatch]
  );

  return (
    <Box sx={{ height: 'calc(100vh - 20px)', width: '100%', backgroundColor: '#f9f9f9', position: 'relative' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={(changes) => {
          onEdgesChange(changes);
        }}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={(event) => event.preventDefault()}
        onNodeClick={onNodeClick}
        style={{ width: '100%', height: '100%', background: '#e0f7fa' }}
      />

      <SpeedDial
        ariaLabel="Add Node"
        sx={{ position: 'absolute', top: 16, left: 16 }}
        icon={<MessageIcon />}
        direction="right"
      >
        <SpeedDialAction
          icon={<MessageIcon sx={{ color: 'green' }} />}
          tooltipTitle="Message"
          onDragStart={(e) => handleDragStart(e, 'messageNode')}
          draggable
        />
        <SpeedDialAction
          icon={<TextFieldsIcon sx={{ color: 'yellow' }} />}
          tooltipTitle="Text"
          onDragStart={(e) => handleDragStart(e, 'textAreaNode')}
          draggable
        />
        <SpeedDialAction
          icon={<SelectAllIcon sx={{ color: 'purple' }} />}
          tooltipTitle="Validator"
          onDragStart={(e) => handleDragStart(e, 'multiSelectNode')}
          draggable
        />
      </SpeedDial>
    </Box>
  );
};

export default FlowEditor;
