import { Node } from '@xyflow/react'; // Asegúrate de importar el tipo correcto

// Define el tipo de datos del nodo
export interface NodeData extends Record<string, unknown> { // Extiende Record para cumplir con la firma de índice
  label: string;
  question?: string; // Propiedad opcional
}

// Asegúrate de que la interfaz MyNode use el nuevo tipo NodeData
export interface MyNode extends Node {
  data: NodeData; // Usa el nuevo tipo aquí
}
