import { useDraggable } from '@dnd-kit/react';
import { Plus, X } from 'lucide-react';

import { cn } from '@neomind/ui/cn';

import { SidebarItemProps } from '@/atoms/sidebar';

export function SidebarItem({ id, w, h, config }: SidebarItemProps) {
  const { ref: draggableRef } = useDraggable({
    id: `sidebar-${id}`,
    disabled: config.added,
    data: {
      id,
      w,
      h,
      context: 'sidebar',
      config: {
        label: config.label,
        kind: config.kind,
        editable: config.editable,
        required: config.required
      }
    }
  });

  return (
    <div
      ref={draggableRef}
      className={cn(
        'group border-border text-foreground relative rounded-md border bg-white px-4 py-2 text-xs font-bold outline-0 transition-all',
        !config.added &&
          'cursor-grab hover:border-sky-500 hover:ring-[2px] hover:ring-sky-500/50 focus-visible:border-sky-500 focus-visible:ring-[2px] focus-visible:ring-sky-500/50'
      )}
    >
      {config.added && <div className="absolute inset-0 w-1 rounded-l-full bg-sky-500" />}
      {config.label}
      <div className="text-primary-foreground absolute top-0 -right-2 z-10 flex h-full items-center opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        {config.added ? (
          <button className="focus-visible:border-ring focus-visible:ring-ring/50 text-foreground grid size-4 place-items-center rounded-sm bg-zinc-300 outline-0 transition-all hover:bg-zinc-400 focus-visible:ring-[2px]">
            <X className="size-3" strokeWidth={3} />
          </button>
        ) : (
          <button className="focus-visible:border-ring focus-visible:ring-ring/50 grid size-4 place-items-center rounded-sm bg-sky-500 text-white outline-0 transition-all hover:bg-sky-600 focus-visible:ring-[2px]">
            <Plus className="size-3" strokeWidth={3} />
          </button>
        )}
      </div>
    </div>
  );
}
