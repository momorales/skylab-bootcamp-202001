import React, { useEffect } from 'react'
import Feedback from './Feedback'
import './login.sass'
import './feedback.sass'
import Logo from'./logo.png'

export default function ({ onSubmit, onGoToRegister, error,onMount }) {
    useEffect(() => {
        onMount()
    }, [])

    function handleSubmit(event) {
        event.preventDefault()
        
        const { target: {
            email: { value: email },
            password: { value: password }
        } } = event

        onSubmit(email, password)
    }

    function handleGoToRegister(event) {
        event.preventDefault()

        onGoToRegister()
    }

    return <>
        <figure className='logo'>
            <img className='imageLogo' src = { Logo } alt="logo"/>
        </figure>
        <form className= 'access' onSubmit = {handleSubmit}>
            <i className="far fa-envelope fa-3x_access"></i>
            <input className= "access__input" name="email" type= "email" autoComplete="off" placeholder="email"/><br></br><br></br>
            <i className="fas fa-key"></i>
            <input  className= "access__input" name="password" type="password" autoComplete="off" placeholder="password"/>  <br></br> <br></br> 
            <div className='enter'>
                {error && <Feedback message={error} level="warn" />}
                <button className="enter__button" href= "" >Enter</button>
                <button className="enter__button">
                    <a onClick = {handleGoToRegister}>Register</a>
                </button>
                
            </div>
        </form>
    </>
}


