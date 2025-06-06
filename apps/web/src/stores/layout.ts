import { create } from 'zustand';

import { ItemConfig } from '@/types';

export interface LayoutItem {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  config: ItemConfig;
}

export type Layout = LayoutItem[];

interface State {
  layout: Layout;
}

interface Action {
  updateLayout: (layout: State['layout']) => void;
}

export const useLayoutStore = create<State & Action>((set) => ({
  layout: [],
  updateLayout: (layout: Layout) => set(() => ({ layout }))
}));
