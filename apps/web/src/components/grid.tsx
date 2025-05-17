import { useDraggable, useDroppable } from '@dnd-kit/react';
import { useAtomValue } from 'jotai';
import { useRef } from 'react';

import { cn } from '@neomind/ui/cn';

import { activeDraggableItemAtom } from '@/atoms/active-draggable-item';
import { Layout, layoutAtom, LayoutItem } from '@/atoms/layout';
import { EmptyLayout } from '@/components/empty-layout';
import { useComposedRefs } from '@/hooks/use-composed-ref';
import { getDroppableItems, getRows } from '@/lib/grid';

const COL_WIDTH = 180;
const ROW_HEIGHT = 64;
const GRID_GAP = 16;

type GridItemProps = LayoutItem;

interface GridDroppableItemProps {
  id: string;
  x: number;
  y: number;
}

interface GridProps {
  layout: Layout;
}

function GridDroppableItem({ id, x, y }: GridDroppableItemProps) {
  const { ref: droppableRef } = useDroppable({
    id: id,
    data: {
      x,
      y
    }
  });

  return (
    <div ref={droppableRef} className="text-bold flex items-center justify-center rounded-sm bg-zinc-100 opacity-25">
      {id}
    </div>
  );
}

function GridItem({ id, x, y, w, h, config }: GridItemProps) {
  const activeDraggableItem = useAtomValue(activeDraggableItemAtom);
  const horizontalPosition = x * COL_WIDTH + x * GRID_GAP;
  const verticalPosition = y * ROW_HEIGHT + y * GRID_GAP;

  const containerRef = useRef<HTMLDivElement>(null);

  const { ref: draggableRef, isDragging: isDraggingDnd } = useDraggable({
    id: `draggable-${id}`,
    data: {
      id,
      x,
      y,
      w,
      h,
      context: 'grid',
      config
    }
  });

  const isDragging = activeDraggableItem?.id === id || isDraggingDnd;

  const composedRefs = useComposedRefs(containerRef, draggableRef);

  // TODO: trocar pra transform/translate para melhor performance.
  const style: React.CSSProperties = {
    width: COL_WIDTH * w + (w - 1) * 16,
    height: ROW_HEIGHT * h + (h - 1) * 16,
    top: verticalPosition,
    left: horizontalPosition
  };

  return (
    <div
      ref={composedRefs}
      className={cn(
        'text-bold absolute flex cursor-grab items-center justify-center rounded-sm',
        isDragging ? 'border border-dashed border-sky-500 bg-sky-200 outline-none' : 'bg-zinc-300'
      )}
      style={style}
    >
      {!isDragging && config.label}
    </div>
  );
}

function DroppableGrid({ layout }: GridProps) {
  const layoutRows = getRows(layout);
  const droppableRows = layoutRows > 0 ? layoutRows + 1 : 1;
  const droppableItems = getDroppableItems(4, droppableRows, 'main');

  return (
    <div className="absolute inset-0 -z-10 grid h-full w-full auto-rows-[4rem] grid-cols-4 gap-4">
      {droppableItems.map(({ id, x, y }) => (
        <GridDroppableItem key={id} id={id} x={x} y={y} />
      ))}
    </div>
  );
}

function DraggableGrid({ layout }: GridProps) {
  return Array.from(layout).map((item) => <GridItem key={item.id} {...item} />);
}

export function Grid() {
  const layout = useAtomValue(layoutAtom);
  const activeDraggableItem = useAtomValue(activeDraggableItemAtom);

  const isGridEmpty = layout.length === 0;

  return (
    <div className="relative mx-auto h-full w-full max-w-3xl">
      {isGridEmpty && !activeDraggableItem ? (
        <EmptyLayout />
      ) : (
        <>
          <DroppableGrid layout={layout} />
          <DraggableGrid layout={layout} />
        </>
      )}
    </div>
  );
}
