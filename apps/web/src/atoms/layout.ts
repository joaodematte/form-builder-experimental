import { atom } from 'jotai';

import { resolveLayout } from '@/lib/grid';
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

const baseLayoutAtom = atom<Layout>([]);

export const layoutAtom = atom(
  (get) => get(baseLayoutAtom),
  (get, set, newValue: Layout) => {
    const previousValue = get(baseLayoutAtom);

    const resolvedLayout = resolveLayout(previousValue, newValue);

    set(baseLayoutAtom, resolvedLayout);
  }
);
