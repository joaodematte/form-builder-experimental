import { ChevronRight, LayoutDashboard, Redo2, Undo2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@neomind/ui/button';
import { ButtonGroup } from '@neomind/ui/button-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@neomind/ui/tooltip';

function TitleInput() {
  const [value, setValue] = useState<string>('Novo layout sem título');

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <div className="relative">
            <input
              type="text"
              placeholder="Renomear layout"
              className="focus-visible:border-ring hover:border-ring text-primary-foreground -ml-2 field-sizing-content max-w-md min-w-48 truncate rounded px-2 py-1.5 font-bold outline-0 outline-solid hover:ring-[2px] hover:ring-black/50 focus-visible:bg-black/25 focus-visible:ring-[2px] focus-visible:ring-black/50"
              value={value}
              onChange={handleOnChange}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>Renomear layout</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function Title() {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <div className="max-w-64">
            <h1 className="truncate font-bold">[SUP] Processo de Gerenciamento de Suporte</h1>
          </div>
        </TooltipTrigger>
        <TooltipContent>[SUP] Processo de Gerenciamento de Suporte</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default function Header() {
  return (
    <header className="flex w-full items-center justify-between bg-[#5A6273] px-4 py-2 text-sm">
      <div className="text-primary-foreground flex items-center gap-4 font-bold">
        <LayoutDashboard className="size-6" />
        <Title />
        <ChevronRight className="size-4" strokeWidth={3} />
        <TitleInput />
      </div>

      <div className="flex gap-4">
        <ButtonGroup>
          <Button size="icon" variant="outline">
            <Undo2 className="size-4" strokeWidth={3} />
          </Button>
          <Button size="icon" variant="outline">
            <Redo2 className="size-4" strokeWidth={3} />
          </Button>
        </ButtonGroup>

        <Button className="font-bold">Salvar</Button>
      </div>
    </header>
  );
}
