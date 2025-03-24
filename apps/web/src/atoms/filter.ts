import { atom } from 'jotai';

export type Filter = 'all' | 'available' | 'added';

export const filterAtom = atom<Filter>('all');
