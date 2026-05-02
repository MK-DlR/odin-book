// frontend/src/main.jsx

// imports
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import "./styles/shared/theme.css"
import './styles/shared/base.css'
import './styles/shared/buttons.css'
import './styles/shared/icons.css'
import './styles/shared/layout.css'
import './styles/shared/text.css'

import './styles/CenterPanel/profile.css'
import './styles/LeftPanel/tabs.css'
import './styles/RightPanel/search.css'
import './styles/RightPanel/suggested.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
