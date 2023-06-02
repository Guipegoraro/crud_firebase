import React, { useState } from 'react';
import Login from './Login';
import CreateAccount from './CreateAccount';
import { useAuth } from '../contexts/AuthContext'



export default function UserAccount() {
    const [userStatus, setUserStatus] = useState({
        logged: false,
        createAccount: false,
    });
    const [errorMessage, setErrorMessage] = useState('')
    const [signIn, setSignIn] = useState(true)
    const [loading, setLoading] = useState(false)
    const { handleSignUp, handleSignOut, handleSignIn, currentUser } = useAuth() //current user


    async function handleCreateAccountForm(event) {
        event.preventDefault();
        setLoading(true)
        const form = event.target;
        if ((form.password.value !== form.confirmPassword.value) || (form.email.value !== form.confirmEmail.value)) {
            setLoading(false)
            return setErrorMessage('Email and/or password confirmation do not match')
        }
        setErrorMessage('')
        try {
            await handleSignUp(form.email.value, form.password.value)
            setUserStatus({ logged: true, createAccount: false })
        } catch (error) {
            setErrorMessage(`failed to create an account: ${error.message}`)
        } finally { setLoading(false) }
    }




    async function handleLoginForm(event) {
        event.preventDefault()
        const form = event.target
        setLoading(true)
        try {
            await handleSignIn(form.email.value, form.password.value);
            setUserStatus({ logged: true, createAccount: false });
        } catch (error) {
            setErrorMessage(`failed to login: ${error.message}`)

        } finally { setLoading(false) }

    }

    function logOut() {
        handleSignOut().then(setUserStatus({ logged: false, createAccount: false }));
        alert('logged out')
    }



    const loggedInComponent = () => {
        return (
            <>
                <p>Logged in as: <i><b>{currentUser.email} </b></i> </p>
                <button onClick={() => logOut()}>Log Out</button>
            </>
        )
    }

    function logInComponent() {
        return (
            <div>
                <p>{errorMessage}</p>
                {signIn ? <Login loading={loading} handleLoginForm={handleLoginForm} /> : <CreateAccount loading={loading} handleCreateAccountForm={handleCreateAccountForm} />}
                {signIn ? <button onClick={() => setSignIn(false)}>Create Account</button> : <button onClick={() => setSignIn(true)}>Back to Login</button>}
            </div>
        )
    }

    return (
        <div>
            <h2>⋆｡°✩ Todo App ⋆｡°✩</h2>
            {userStatus.logged ? loggedInComponent() : logInComponent()}
        </div>

    )


}