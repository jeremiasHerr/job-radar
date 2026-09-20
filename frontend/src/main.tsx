import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// In development, /?preview renders the UI from fixed fixtures (see src/dev/Preview.tsx).
async function bootstrap() {
  const showPreview = import.meta.env.DEV && new URLSearchParams(window.location.search).has('preview')
  const Root = showPreview ? (await import('./dev/Preview.tsx')).default : App

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Root />
    </StrictMode>,
  )
}

void bootstrap()
