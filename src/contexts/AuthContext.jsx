import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from 'firebase/auth';
const AuthContext = React.createContext()

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();

    function handleSignIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }


    function handleSignOut(){
        return signOut(auth)
    }

    function handleSignUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    useEffect(() =>{
    const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user)})
    
        return unsubscribe
    },[])



    const value = {
        currentUser,
        handleSignUp,
        handleSignOut,
        handleSignIn
    };

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}
