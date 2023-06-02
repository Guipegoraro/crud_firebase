import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import { AuthProvider, useAuth } from './contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <App />
    </AuthProvider>
  </React.StrictMode>,
)
