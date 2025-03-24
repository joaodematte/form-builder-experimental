import { useAtomValue } from 'jotai';

import { Input } from '@neomind/ui/input';

import { sidebarAtom } from '@/atoms/sidebar';
import { FilterBy } from '@/components/filter-by';
import { SidebarItem } from '@/components/sidebar-item';

export function Sidebar() {
  const sidebarData = useAtomValue(sidebarAtom);

  return (
    <div className="w-full max-w-xs grow bg-zinc-100">
      <div className="text-foreground flex items-center justify-between bg-zinc-200 px-4 py-2 text-sm">
        <p className="text-sm font-bold">Campos</p>

        <p className="flex items-center gap-1 text-xs">
          Filtrar por <FilterBy />
        </p>
      </div>

      <div className="p-4">
        <Input className="bg-white text-sm" placeholder="Buscar" />

        <div className="mt-4 flex flex-col gap-1">
          {sidebarData.map((item) => (
            <SidebarItem key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
