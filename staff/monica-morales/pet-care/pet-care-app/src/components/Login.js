import React from 'react'
import './login.sass'


export default function ({ onSubmit, onGoToRegister, error }) {
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
            <img class='imageLogo' src = "images/logo.png"/>
        </figure>
        <form className= 'access' onSubmit = {handleSubmit}>
            <i className="far fa-envelope fa-3x_access"></i>
            <input className= "access__input" type= "text" placeholder="email"/>
            <i className="fas fa-key"></i>
            <input  className= "access__input" type="text" placeholder="password"/>        
            <div className='enter'>
                <button className="enter__button">Enter</button>
                <a className="enter__button" href="" onClick = {handleGoToRegister}>Register</a>
            </div>
        </form>
    </>
}


