import React, { useEffect } from 'react'
import './login.sass'
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
            <img className='imageLogo' src = { Logo }/>
        </figure>
        <form className= 'access' onSubmit = {handleSubmit}>
            <i className="far fa-envelope fa-3x_access"></i>
            <input className= "access__input" name="email" type= "email" placeholder="email"/><br></br><br></br>
            <i className="fas fa-key"></i>
            <input  className= "access__input" name="password" type="password" placeholder="password"/>  <br></br> <br></br> 
            <div className='enter'>
                <button className="enter__button" href= "" >Enter</button>
                <button className="enter__button">
                    <a onClick = {handleGoToRegister}>Register</a>
                </button>
                
            </div>
        </form>
    </>
}


