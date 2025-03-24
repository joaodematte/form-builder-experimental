import { atom } from 'jotai';

import { ItemConfig } from '@/types';
import { SIDEBAR_DATA } from '@/utils/constants';

export interface SidebarItemProps {
  id: string;
  w: number;
  h: number;
  config: ItemConfig & {
    added: boolean;
  };
}

export const sidebarAtom = atom<SidebarItemProps[]>(SIDEBAR_DATA);
