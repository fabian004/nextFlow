import { Node } from '@xyflow/react'; 
export interface NodeData extends Record<string, unknown> { 
  label: string;
  question?: string;
  options?: NodeOptions[]
}

export interface MyNode extends Node {
  id: string;
  data: NodeData;
}

export interface NodeOptions {
  id: string,
  label:string
}

