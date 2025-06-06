import { useDraggable } from '@dnd-kit/react';
import { useAtomValue } from 'jotai';
import { Asterisk, Pencil, Plus, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { useShallow } from 'zustand/shallow';

import { cn } from '@neomind/ui/cn';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@neomind/ui/tooltip';

import { activeDraggableItemAtom } from '@/atoms/active-draggable-item';
import { SidebarItemProps } from '@/atoms/sidebar';
import { useLayoutStore } from '@/stores/layout';
import { ItemConfig } from '@/types';

export function SidebarItem({ id, w, h, config }: SidebarItemProps) {
  const { layout, updateLayout } = useLayoutStore(
    useShallow((state) => ({
      layout: state.layout,
      updateLayout: state.updateLayout
    }))
  );

  const activeDraggableItem = useAtomValue(activeDraggableItemAtom);

  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);

  const spanRef = useRef<HTMLSpanElement>(null);

  const itemInLayout = layout.find((item) => item.id === id);
  const isInLayout = Boolean(itemInLayout);
  const isDragging = activeDraggableItem?.id === id;

  const { ref: draggableRef } = useDraggable({
    id: `sidebar-${id}`,
    disabled: isInLayout,
    data: {
      id,
      w,
      h,
      context: 'sidebar',
      config: {
        label: config.label,
        kind: config.kind,
        editable: itemInLayout?.config.editable,
        required: itemInLayout?.config.required
      }
    }
  });

  const onDelete = () => {
    updateLayout(layout.filter((item) => item.id !== id));
  };

  const updateLayoutConfig = (configToUpdate: Partial<ItemConfig>) => {
    updateLayout(
      layout.map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          config: {
            ...item.config,
            ...configToUpdate
          }
        };
      })
    );
  };

  const isTruncated =
    spanRef.current?.offsetWidth !== undefined &&
    spanRef.current?.scrollWidth !== undefined &&
    spanRef.current.offsetWidth < spanRef.current.scrollWidth;

  return (
    <TooltipProvider>
      <Tooltip
        delayDuration={0}
        disableHoverableContent
        open={isTruncated ? isTooltipOpen : false}
        onOpenChange={setIsTooltipOpen}
      >
        <TooltipTrigger asChild>
          <div
            ref={draggableRef}
            className={cn(
              'group border-border text-foreground relative h-8 rounded-sm border bg-white text-left text-xs font-bold outline-0',
              !isInLayout &&
                'cursor-grab hover:border-sky-500 hover:ring-[2px] hover:ring-sky-500/50 focus-visible:border-sky-500 focus-visible:ring-[2px] focus-visible:ring-sky-500/50',
              isDragging && 'border-dashed border-sky-500 opacity-50'
            )}
          >
            <div className="relative flex h-full items-center justify-between overflow-hidden rounded-sm px-4">
              {isInLayout && <div className="absolute inset-0 w-1 rounded-l-full bg-sky-500" />}
              <span ref={spanRef} className="block w-full truncate">
                {config.label}
              </span>
              {isInLayout && (
                <div className="flex grow-0 gap-0.5">
                  <button
                    onClick={() => updateLayoutConfig({ editable: !itemInLayout?.config.editable })}
                    className={cn(
                      'focus-visible:border-ring focus-visible:ring-ring/50 text-foreground grid size-5 place-items-center rounded-sm p-0.5 outline-0 hover:bg-zinc-100 hover:text-green-600 focus-visible:text-green-600 focus-visible:ring-[2px]',
                      itemInLayout?.config.editable && 'text-green-600'
                    )}
                  >
                    <Pencil className="size-4" strokeWidth={3} />
                  </button>

                  <button
                    onClick={() => updateLayoutConfig({ required: !itemInLayout?.config.required })}
                    className={cn(
                      'focus-visible:border-ring focus-visible:ring-ring/50 text-foreground grid size-5 place-items-center rounded-sm p-0.5 outline-0 hover:bg-zinc-100 hover:text-green-600 focus-visible:text-green-600 focus-visible:ring-[2px]',
                      itemInLayout?.config.required && 'text-green-600'
                    )}
                  >
                    <Asterisk className="size-4" strokeWidth={3} />
                  </button>
                </div>
              )}
            </div>

            <div className="text-primary-foreground absolute top-0 -right-2 z-10 hidden h-full items-center group-hover:flex group-focus-visible:flex">
              {isInLayout ? (
                <button
                  onClick={onDelete}
                  className="focus-visible:border-ring focus-visible:ring-ring/50 text-foreground grid size-4 place-items-center rounded-sm bg-zinc-300 outline-0 hover:bg-zinc-400 focus-visible:ring-[2px]"
                >
                  <X className="size-3" strokeWidth={3} />
                </button>
              ) : (
                <button className="focus-visible:border-ring focus-visible:ring-ring/50 grid size-4 place-items-center rounded-sm bg-sky-500 text-white outline-0 hover:bg-sky-600 focus-visible:ring-[2px]">
                  <Plus className="size-3" strokeWidth={3} />
                </button>
              )}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={10}>
          {config.label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
