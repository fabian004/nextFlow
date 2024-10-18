import { Edge, Node } from "@xyflow/react";

export const initialNodes:Node[] = [{
    id: 'start',
    type: 'startNode',
    position: { x: 100, y: 100 },
    data: { label: 'Inicio' },
    deletable: false,
  },
  {
    id: 'end',
    type: 'endNode',
    position: { x: 400, y: 100 },
    data: { label: 'Fin' },
    deletable: false,
  }];
export const initialEdges:Edge[] = [];
   