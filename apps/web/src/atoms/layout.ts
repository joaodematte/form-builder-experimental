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

function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function generateLayoutItems(): Layout {
  const layoutItems: Layout = [];

  for (let i = 0; i < 250; i++) {
    const item: LayoutItem = {
      id: `item-${i + 1}`, // Unique id for each item
      x: 0, // x starts at 0 and increments by 1
      y: i, // y starts at 0 and increments by 1
      w: 4, // Fixed width of 4
      h: 1, // Fixed height of 1
      config: {
        label: generateRandomString(8), // Random label with length 8
        kind: generateRandomString(6), // Random kind with length 6
        required: false, // Required is false
        editable: false // Editable is false
      }
    };
    layoutItems.push(item);
  }

  return layoutItems;
}

const baseLayoutAtom = atom<Layout>(generateLayoutItems());

export const layoutAtom = atom(
  (get) => get(baseLayoutAtom),
  (get, set, newValue: Layout) => {
    const previousValue = get(baseLayoutAtom);

    const now = performance.now();
    // remove all overlapping items from the layout (e.g collisions)
    const resolvedLayout = resolveLayout(previousValue, newValue);
    console.log(performance.now() - now, 'ms');

    set(baseLayoutAtom, resolvedLayout);
  }
);

export const layoutLengthAtom = atom((get) => get(baseLayoutAtom).length);
