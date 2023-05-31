import React, { useState } from 'react';
import Login from './Login';
import CreateAccount from './CreateAccount';
import { useAuth } from '../contexts/AuthContext'




export default function UserAccount() {
    const [userStatus, setUserStatus] = useState({
        logged: false,
        createAccount: false,
        userName: null,
    });
    const [errorMessage, setErrorMessage] = useState('')
    const [signIn, setSignIn] = useState(true)
    const { signUp, currentUser } = useAuth()
    const [loading, setLoading] = useState(false)


   async function handleCreateAccountForm(event) {
        event.preventDefault();
        setLoading(true)
        const form = event.target;
        console.log(form.password.value)
        if ((form.password.value !== form.confirmPassword.value) || (form.email.value !== form.confirmEmail.value)){
            return setErrorMessage('Email and/or password confirmation do not match')
        } 
        setErrorMessage('')
        try {
            await signUp(form.email.value, form.password.value)
        } catch (error) {
            setErrorMessage(`failed to create an account: ${error.message}`)
        }
        setLoading(false)
    }
    const username = 'admin'
    const userPassword = '123'




    function handleLoginForm(event) {
        event.preventDefault()
        const form = event.target
        if (form.userName.value === username && form.password.value === userPassword){ 
            setUserStatus({...userStatus, logged: true, userName : username,})
            console.log('logado como admin')
        } else {setErrorMessage('Username and/or password not found')}
        setUserStatus({...userStatus, userName: currentUser})
    }

    function logOut() {
        setUserStatus({...userStatus, logged: false, userName: null})
        alert('loged out')
    }
    const loggedInComponent = () => {
        return (
            <>
            <p>Logged in as: {userStatus.userName}</p>
            <button onClick={() => logOut()}>Log Out</button>
            </>
        )
    }
    
    const logInComponent = () => {
        return (
            <div>
            <p>{errorMessage}</p>
          {signIn ? <Login loading={loading} handleLoginForm={handleLoginForm}/> : <CreateAccount loading={loading} handleCreateAccountForm={handleCreateAccountForm}/>}
          {signIn ? <button onClick={() => setSignIn(false)}>Create Account</button> : <button onClick={() => setSignIn(true)}>Back to Login</button>}
            </div>
        )
    }






    return (
        <div>
            { userStatus.logged ?  loggedInComponent() : logInComponent() }
            

        </div>

    )




}