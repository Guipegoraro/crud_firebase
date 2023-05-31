import React, { useState } from 'react';

export default function UserAccount() {
    const [userStatus, setUserStatus] = useState({
        logged: false,
        createAccount: false,
        userName: null,
    });
    const [errorMessage, setErrorMessage] = useState('')

    function handleCreateAccountForm(event) {
        event.preventDefault();

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
            <h4>Log in:</h4>
            <form className='userAuthenticationForm' onSubmit={(event) => handleLoginForm(event)}>
                <label htmlFor='userName'>Username:</label>
                <input type='text' id='userName' name='userName'/>
                <label htmlFor='password'>Password:</label>
                <input type='text' id='password' name='password'/>
                <button type='submit'>Login</button>
            </form>
            <h4>Create account:</h4>
            <form className='userAuthenticationForm' onSubmit={(event) => handleCreateAccountForm(event)}>
                <label htmlFor='userName'>Username:</label>
                <input type='text' id='userName' name='userName'/>
                <label htmlFor='email'>Email:</label>
                <input type='text' id='email' name='email'/>
                <label htmlFor='confirmEmail'>Confirm Email:</label>
                <input type='text' id='confirmEmail' name='confirmEmail'/>
                <label htmlFor='password'>Password:</label>
                <input type='text' id='password' name='password'/>
                <label htmlFor='confirmPassword'>Confirm Password:</label>
                <input type='text' id='confirmPassword' name='confirmPassword'/>
                <button type='submit'>Login</button>
            </form>
            </div>
        )
    }






    return (
        <div>
            { userStatus.logged ?  loggedInComponent() : logInComponent() }


        </div>

    )




}