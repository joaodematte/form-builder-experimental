export interface ItemConfig {
  label: string;
  kind: string;
  required: boolean;
  editable: boolean;
}

export interface DraggableData {
  id: string;
  w?: number;
  h?: number;
  x?: number;
  y?: number;
  context: 'sidebar' | 'grid';
  config: {
    label: string;
    kind: string;
    editable: boolean;
    required: boolean;
  };
}

export interface DroppableData {
  id: string;
  x: number;
  y: number;
}
