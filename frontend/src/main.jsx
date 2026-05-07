// frontend/src/main.jsx

// imports
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { FullsizeImageProvider } from './contexts/FullsizeImageContent.jsx'

import './styles/shared/base.css'
import './styles/shared/buttons.css'
import './styles/shared/icons.css'
import './styles/shared/layout.css'
import './styles/shared/text.css'
import "./styles/shared/theme.css"

import './styles/center/profile.css'
import './styles/individual/right-panel.css'
import './styles/individual/tabs.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FullsizeImageProvider>
      <App />
    </FullsizeImageProvider>
  </StrictMode>,
)
