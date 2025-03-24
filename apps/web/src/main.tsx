import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@/styles/globals.css';
import '@fontsource/arimo/400.css';
import '@fontsource/arimo/500.css';
import '@fontsource/arimo/600.css';
import '@fontsource/arimo/700.css';

import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
