import React, { useState } from 'react';
import Login from './Login';
import CreateAccount from './CreateAccount';
import { useAuth } from '../contexts/AuthContext'
import { auth } from '../../firebase';



export default function UserAccount() {
    const [userStatus, setUserStatus] = useState({
        logged: false,
        createAccount: false,
    });
    const [errorMessage, setErrorMessage] = useState('')
    const [signIn, setSignIn] = useState(true)
    const [loading, setLoading] = useState(false)
    const { handleSignUp, handleSignOut, handleSignIn, currentUser } = useAuth() //current user
    //todo i feel like this code could be better, refactor it at a later stage, for now its working as intended (i hope)
    
   async function handleCreateAccountForm(event) {
        event.preventDefault();
        setLoading(true)
        const form = event.target;
        if ((form.password.value !== form.confirmPassword.value) || (form.email.value !== form.confirmEmail.value)){
            setLoading(false)  
            return setErrorMessage('Email and/or password confirmation do not match')
        } 
        setErrorMessage('')
        try {
            await handleSignUp(form.email.value, form.password.value)
            setUserStatus({logged: true, createAccount: false})
        } catch (error) {
            setErrorMessage(`failed to create an account: ${error.message}`)
            setLoading(false)
        }
        setLoading(false)   
    } //working




    async function handleLoginForm(event) {
        event.preventDefault()
        const form = event.target
        setLoading(true)
        try {
            await handleSignIn(form.email.value, form.password.value);
            setUserStatus({logged: true, createAccount: false});
        } catch (error) {
            setErrorMessage(`failed to login: ${error.message}`)
            setLoading(false)
        }
        setLoading(false) 
    }//working 

    function logOut() {
        handleSignOut().then(setUserStatus({...userStatus, logged: false}));
        alert('logged out')
    } //working //todo better logout message



    const loggedInComponent = () => {
        return (
            <>
            <p>Logged in as: {currentUser.email}</p>
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
    function logStuff() {
        console.log(auth.currentUser)
    }





    return (
        <div>
            { userStatus.logged ?  loggedInComponent() : logInComponent() }
            <button onClick={() => logStuff()} >logStuff</button>

        </div>

    )




}