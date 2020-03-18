import React, { useEffect } from 'react'
import './register.sass'
import './config.sass'
import Logo from'./logo.png'


export default function ({ onSubmit, onGoToLogin, error, onMount }) {
    useEffect(() => {
        onMount()
    }, [])

    function handleSubmit(event) {
        event.preventDefault()

        const { target: {
            name: { value: name },
            username: { value: username },
            email: { value: email },
            password: { value: password }
        } } = event

        onSubmit(name, username, email, password)
    }

    function handleGoToLogin(event) {
        event.preventDefault()

        onGoToLogin()
    }

    return <>
        <div className="register">
            <figure className='register__logo'>
                <img className='register__imageLogo' src = {Logo }/>
            </figure>
            
            <h2 className='register__title'>Register</h2>

            <form className="register__form" onSubmit={handleSubmit}>
               
                <input className="register__input" type="text" id="fname" name="fname" placeholder="Name"/>
                <input className="register__input" type="text" id="lname" name="lname" placeholder= "username"/>
                <input className="register__input" type="text" id="lname" name="lname" placeholder="Email"/>
                <input className="register__input" type="text" id="lname" name="lname" placeholder="Password"/>
            </form>
            <div>
                <button className ="register__accept">Register</button>
                <a href="" className="fas fa-check" onClick = {handleGoToLogin}/>
            </div>
        </div>
    </>
}


