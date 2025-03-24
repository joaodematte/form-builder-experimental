import { atom } from 'jotai';

import { DraggableData } from '@/types';

export const activeDraggableItemAtom = atom<DraggableData | null>(null);
