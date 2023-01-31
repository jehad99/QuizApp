import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ContextProvider } from './hooks/useStateContext'
import './index.css'
import {
  Experimental_CssVarsProvider as CssVarsProvider,
} from '@mui/material/styles';
import ModeSwitcher from './hooks/useColorScheme';
import { CssBaseline } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssVarsProvider>
      <CssBaseline />
      <ModeSwitcher />
      <ContextProvider>
        <App />
      </ContextProvider>
    </CssVarsProvider>
  </React.StrictMode>,
)
