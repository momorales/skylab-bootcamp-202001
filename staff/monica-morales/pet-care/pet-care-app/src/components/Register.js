import React, { useEffect } from 'react'
import './register.sass'
import './config.sass'
import Logo from'./logo.png'


export default function ({ onSubmit, error, onMount }) {
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

    return <>
        <div className="register">
            <figure className='register__logo'>
                <img className='register__imageLogo' src = {Logo }/>
            </figure>
            
            <h2 className='register__title'>Register</h2>

            <form className="register__form" onSubmit={handleSubmit}>
               
                <input className="register__input" type="text" name="name" placeholder="Name"/>
                <input className="register__input" type="text" name="username" placeholder= "username"/>
                <input className="register__input" type="email" name="email" placeholder="Email"/>
                <input className="register__input" type="password" name="password" placeholder="Password"/>
                <button type="submit" className="register__accept fas fa-check"></button>
            </form>
        </div>
    </>
}


