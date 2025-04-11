import { createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

export const Context  = createContext(null)

createRoot(document.getElementById('root')).render(
  <Context.Provider>
     <App />
  </Context.Provider>,
)
