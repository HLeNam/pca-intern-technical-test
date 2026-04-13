import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ReactQueryProvider from '@/providers/QueryClientProvider.tsx';
import { ThemeProvider } from '@/providers/ThemeProvider.tsx';
import { Toaster } from '@/components/ui/sonner.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
        <Toaster richColors position="top-right" />
      </ThemeProvider>
    </ReactQueryProvider>
  </StrictMode>
);
