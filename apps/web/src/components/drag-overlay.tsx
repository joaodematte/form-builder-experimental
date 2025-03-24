import { DragOverlay as DndDragOverlay } from '@dnd-kit/react';
import { useAtomValue } from 'jotai';
import { createPortal } from 'react-dom';

import { activeDraggableItemAtom } from '@/atoms/active-draggable-item';

export function DragOverlay() {
  const draggableActiveItem = useAtomValue(activeDraggableItemAtom);

  return createPortal(
    <DndDragOverlay>
      {draggableActiveItem && (
        <div className="text-bold flex h-full w-full items-center justify-center bg-zinc-300">
          {draggableActiveItem.config.label}
        </div>
      )}
    </DndDragOverlay>,
    document.body
  );
}
