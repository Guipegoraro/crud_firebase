import React, { useState } from 'react';
import Login from './Login';
import CreateAccount from './CreateAccount';
import { useAuth } from '../contexts/AuthContext';


export default function UserAccount() {
    const [userStatus, setUserStatus] = useState({
        logged: false,
        createAccount: false,
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [signIn, setSignIn] = useState(true);
    const [loading, setLoading] = useState(false);
    const { handleCreateAccountForm, handleLogOut, handleLoginForm, currentUser } = useAuth();




    const loggedInComponent = () => {
        return (
            <>
                <p>Logged in as: <i><b>{currentUser.email} </b></i> </p>
                <button onClick={() => handleLogOut(setUserStatus)}>Log Out</button>
            </>
        )
    };

    function logInComponent() {
        return (
            <div>
                <p>{errorMessage}</p>
                {signIn ? <Login loading={loading} handleLoginForm={(event) => handleLoginForm(event, setLoading, setErrorMessage, setUserStatus)} /> : <CreateAccount loading={loading} handleCreateAccountForm={(event) => handleCreateAccountForm(event, setLoading, setErrorMessage, setUserStatus)} />}
                {signIn ? <button onClick={() => setSignIn(false)}>Create Account</button> : <button onClick={() => setSignIn(true)}>Back to Login</button>}
            </div>
        )
    }

    return (
        <div>
            <h2>⋆｡°✩ Todo App ⋆｡°✩</h2>
            {userStatus.logged ? loggedInComponent() : logInComponent()}
        </div>

    );


}