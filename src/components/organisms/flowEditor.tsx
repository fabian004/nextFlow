import React, { useCallback, useState } from 'react';
import { ReactFlow, applyEdgeChanges, MarkerType, Node, EdgeChange, NodeChange } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { EndNode, MessageNode, MultiSelectNode, StartNode, TextAreaNode } from '../molecules/customNodes';
import { Box, Button, SpeedDial, SpeedDialAction } from '@mui/material';
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
import { v4 as uuidv4 } from 'uuid';

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
      const { source, sourceHandle } = params;
  
      const existingEdges = edges.filter(edge => 
        edge.source === source && (!sourceHandle || edge.sourceHandle === sourceHandle)
      );
  
      if (existingEdges.length > 0) {
        alert('Este nodo ya tiene una conexión de salida desde este punto.');
        return;
      }
  
      const newEdge = {
        id: `edge-${params.source}-${params.sourceHandle}-${params.target}`,
        ...params,
        animated: true,
        markerEnd: { type: MarkerType.ArrowClosed, width: 10, height: 10, color: 'black' },
        style: { stroke: 'black', strokeWidth: 2 },
      };
  
      dispatch(addReduxEdge(newEdge));
    },
    [edges, dispatch]
  );

  const isTemplateValid = () => {
    const visited = new Set();
    const startNode = nodes.find(node => node.type === 'startNode');
    const endNode = nodes.find(node => node.type === 'endNode');
  
    if (!startNode || !endNode) {
      return false;
    }
  
    const dfs = (nodeId: string): boolean => {
      if (visited.has(nodeId)) {
        return true;
      }
  
      visited.add(nodeId);
  
      const outgoingEdges = edges.filter(edge => edge.source === nodeId);
  
      if (outgoingEdges.length === 0 && nodeId !== endNode.id) {
        return false;
      }
  
      const node = nodes.find(n => n.id === nodeId);
      if (node?.type === 'multiSelectNode') {
        const options = (node.data as Record<string, any>).options;
  
        for (const option of options) {
          const optionEdge = outgoingEdges.find(edge => edge.sourceHandle === "option-"+option.id);
  
          if (!optionEdge) {
            alert(`La opción ${option.label} del nodo ${nodeId} no tiene conexión`);
            return false;
          }

          if (!dfs(optionEdge.target)) {
            return false;
          }
        }
      } else {
        for (const edge of outgoingEdges) {
          if (!dfs(edge.target)) {
            return false;
          }
        }
      }
  
      return nodeId === endNode.id || outgoingEdges.length > 0;
    };
  
    const isStartToEndValid = dfs(startNode.id);
  
    return isStartToEndValid && visited.has(endNode.id) && nodes.every(node => visited.has(node.id));
  };
  
  const saveTemplate = () => {
    if (isTemplateValid()) {
      alert('La plantilla es válida.');
    }else{
      alert('La plantilla no es válida. Algunos nodos no están conectados o no llegan al nodo de fin.');
    }
  };
  
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

    if (type === "multiSelectNode") {
      newNode.data.question = NodeMultiSelectTypes.Initial;
      newNode.data.options = [
        { id: uuidv4(), label: "PIN" },
        { id: uuidv4(), label: "Password" }
      ];
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

      <Button 
        onClick={saveTemplate}
        variant="contained" 
        sx={{ 
          position: 'absolute', 
          top: 16, 
          right: 16, 
          backgroundColor: 'green', 
          '&:hover': {
            backgroundColor: 'darkgreen',
          }
        }}
      >
        Guardar
      </Button>

    </Box>
  );
};

export default FlowEditor;
