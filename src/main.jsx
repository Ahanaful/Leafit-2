import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './dashboard.jsx'
import './dashboard.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
