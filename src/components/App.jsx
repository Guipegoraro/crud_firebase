import { useState, useContext } from 'react'
import '../App.css'
import UserAccount from './UserAccount';
import { AuthProvider } from '../contexts/AuthContext';
/* import { ThemeProvider } from './ThemeContext'; */

function App() {
  const darkTheme = false;
  const styles = {
    body:{
    backgroundColor: darkTheme ? "#333333" : "white",
    color: darkTheme ? "white" : "black",
    width: '100vw',
    height: "100vh",
    padding: '15px',
    display: 'flex',
    justifyContent: "center"
  }
}

  return (
    <AuthProvider>
    <div style={styles.body}>
    <UserAccount/>

    </div>
    </AuthProvider>
  )
}

export default App
