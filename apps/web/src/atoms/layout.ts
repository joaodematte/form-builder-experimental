import { atom } from 'jotai';

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

export const layoutAtom = atom<Layout>([]);
