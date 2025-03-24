import { DragDropProvider } from '@dnd-kit/react';

import { DragDropWrapper } from '@/components/drag-drop-wrapper';
import { Grid } from '@/components/grid';
import Header from '@/components/header';
import { Sidebar } from '@/components/sidebar';

export function App() {
  return (
    <DragDropProvider>
      <DragDropWrapper>
        <Header />
        <div className="flex grow">
          <Sidebar />
          <div className="max-h-screen grow overflow-y-auto p-8">
            <Grid />
          </div>
        </div>
      </DragDropWrapper>
    </DragDropProvider>
  );
}
