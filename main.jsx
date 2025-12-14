import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Pages/home.jsx'
import './index.css' // Nous allons créer ce fichier juste après

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
)