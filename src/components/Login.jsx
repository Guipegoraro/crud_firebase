/* eslint-disable react/prop-types */
import React from 'react'

export default function Login({ handleLoginForm, loading }) {


    return (
        <div>
            <h4>Log in:</h4>
            <form className='userAuthenticationForm' onSubmit={event => handleLoginForm(event)}>
                <label htmlFor='email'>email:</label>
                <input type='text' id='email' name='email' />
                <label htmlFor='password'>Password:</label>
                <input type='text' id='password' name='password' />
                <button disabled={loading}  type='submit'>Login</button>
            </form>
        </div>
    )
}
