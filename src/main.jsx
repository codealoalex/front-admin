import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 1. Importación del TEMA (elije el que uses)
import 'primereact/resources/themes/lara-light-indigo/theme.css';
// 2. Importación de los estilos del CORE de PrimeReact
import 'primereact/resources/primereact.min.css';
// 3. Importación de los ICONOS (¡ESTE ES EL IMPORTANTE!)
import 'primeicons/primeicons.css';

import { BrowserRouter } from 'react-router'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    
      <App />
    </BrowserRouter>
  </StrictMode>
)
