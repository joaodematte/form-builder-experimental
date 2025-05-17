import { Plus } from 'lucide-react';

import { Button } from '@neomind/ui/button';

export function EmptyLayout() {
  return (
    <div className="border-border grid h-full w-full place-content-center rounded-sm border border-dashed bg-zinc-100 text-center">
      <div className="flex w-full max-w-md flex-col items-center gap-4 text-zinc-400">
        <p className="font-bold">Este layout está vazio</p>
        <p className="text-sm">
          Adicione as abas e campos individualmente ou adicione todos os componentes do formulário clicando no botão
          abaixo
        </p>

        <Button
          variant="outline"
          className="w-fit border-sky-500 text-xs font-bold text-sky-500 hover:border-sky-600 hover:text-sky-600"
        >
          <div className="grid size-4 place-content-center rounded border-2 border-sky-500">
            <Plus className="size-3" strokeWidth={3} />
          </div>
          Adicionar todos os componentes
        </Button>
      </div>
    </div>
  );
}
