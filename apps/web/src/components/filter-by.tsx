import { useAtom } from 'jotai';
import { ChevronDown } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@neomind/ui/dropdown-menu';

import { Filter, filterAtom } from '@/atoms/filter';

const FILTER_KEYS: Record<Filter, string> = {
  all: 'Todos',
  available: 'Disponíveis',
  added: 'Adicionados'
};

export function FilterBy() {
  const [filter, setFilter] = useAtom(filterAtom);

  const handleOnChange = (value: string) => {
    setFilter(value as Filter);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:border-ring focus-visible:ring-ring/50 flex gap-1 transition-all outline-none focus-visible:ring-[2px]">
        <span className="flex items-center gap-1 font-bold">
          {FILTER_KEYS[filter]} <ChevronDown className="size-3" strokeWidth={3} />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={filter} onValueChange={handleOnChange}>
          <DropdownMenuRadioItem value="all">Todos</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="available">Disponíveis</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="added">Adicionados</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
