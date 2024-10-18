import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Node, Edge, NodeChange, applyNodeChanges } from '@xyflow/react';
import { initialNodes, initialEdges } from '@/utils/initialStates';

interface DrawerState {
  isOpen: boolean;
  actualNode: Node | null;
  nodes: Node[];
  edges: Edge[];
}

const initialState: DrawerState = {
  isOpen: false,
  actualNode: null,
  nodes: initialNodes,
  edges: initialEdges,
};

const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    openDrawer: (state) => {
      state.isOpen = true;
    },
    closeDrawer: (state) => {
      state.isOpen = false;
    },
    setActualNode: (state, action: PayloadAction<Node | null>) => {
      state.actualNode = action.payload ? { ...action.payload } : null;
    },
    updateActualNodeLabel: (state, action: PayloadAction<string>) => {
        if (state.actualNode) {
            const updatedNode = { 
            ...state.actualNode, 
            data: { ...state.actualNode.data, label: action.payload }
            };
            state.actualNode = updatedNode;
            state.nodes = state.nodes.map((node) =>
            node.id === updatedNode.id ? updatedNode : node
            );
        }
    },
      
    setNodes: (state, action: PayloadAction<NodeChange<Node>[]>) => {
        state.nodes = applyNodeChanges(action.payload, state.nodes);
    },
      
    setEdges: (state, action: PayloadAction<Edge[]>) => {
      state.edges = action.payload;
    },
    addNode: (state, action: PayloadAction<Node>) => {
      state.nodes = [...state.nodes, action.payload];
    },
    addEdge: (state, action: PayloadAction<Edge>) => {
      state.edges = [...state.edges, action.payload];
    },
  },
});

export const {
  openDrawer,
  closeDrawer,
  setActualNode,
  updateActualNodeLabel,
  setNodes,
  setEdges,
  addNode,
  addEdge,
} = drawerSlice.actions;
export default drawerSlice.reducer;
