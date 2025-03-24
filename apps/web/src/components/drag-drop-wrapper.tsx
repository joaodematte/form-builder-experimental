import { useDragDropMonitor } from '@dnd-kit/react';
import { useAtom, useSetAtom } from 'jotai';
import { useRef } from 'react';

import { activeDraggableItemAtom } from '@/atoms/active-draggable-item';
import { layoutAtom, LayoutItem } from '@/atoms/layout';
import { sidebarAtom } from '@/atoms/sidebar';
import { DragOverlay } from '@/components/drag-overlay';
import { findItemById } from '@/lib/grid';
import { DraggableData, DroppableData } from '@/types';

interface DragDropWrapperProps {
  children: React.ReactNode;
}

export function DragDropWrapper({ children }: DragDropWrapperProps) {
  const [layout, setLayout] = useAtom(layoutAtom);
  const [sidebar, setSidebar] = useAtom(sidebarAtom);
  const setActiveDraggableItem = useSetAtom(activeDraggableItemAtom);

  const addedRef = useRef<boolean>(false);

  useDragDropMonitor({
    onDragStart({ operation }) {
      addedRef.current = false;

      if (operation.source) setActiveDraggableItem(operation.source.data as DraggableData);
    },
    onDragEnd() {
      addedRef.current = false;
      setActiveDraggableItem(null);
    },
    onDragMove({ operation }) {
      if (!operation.source || !addedRef.current) return;

      if (!operation.target) {
        const sourceData = operation.source.data as DraggableData;

        const updatedLayout = layout.filter((item) => item.id !== sourceData.id);

        setLayout(updatedLayout);
        setSidebar(
          sidebar.map((sidebarItem) =>
            sidebarItem.id === sourceData.id
              ? { ...sidebarItem, config: { ...sidebarItem.config, added: false } }
              : sidebarItem
          )
        );

        addedRef.current = false;
      }
    },
    onDragOver({ operation }) {
      if (!operation.source || !operation.target) return;
      const sourceData = operation.source.data as DraggableData;
      const targetData = operation.target.data as DroppableData;

      const item = findItemById(layout, sourceData.id);

      if (item) {
        if (!targetData) return;

        const cappedHorizontalPosition = targetData.x + item.w > 4 ? 4 - item.w : targetData.x;

        const newPosition = {
          x: cappedHorizontalPosition,
          y: targetData.y
        };

        const updatedLayout = layout.map((layoutItem) =>
          layoutItem.id === item.id ? { ...layoutItem, ...newPosition } : layoutItem
        );

        setLayout(updatedLayout);
      } else {
        const newItem: LayoutItem = {
          id: sourceData.id,
          w: sourceData.w ?? 4,
          h: sourceData.h ?? 1,
          x: targetData.x,
          y: targetData.y,
          config: sourceData.config
        };

        const updatedLayout = [...layout, newItem];

        setLayout(updatedLayout);
        setSidebar(
          sidebar.map((sidebarItem) =>
            sidebarItem.id === sourceData.id
              ? { ...sidebarItem, config: { ...sidebarItem.config, added: true } }
              : sidebarItem
          )
        );

        addedRef.current = true;
      }
    }
  });

  return (
    <>
      {children}

      <DragOverlay />
    </>
  );
}
