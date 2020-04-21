import React, { useEffect } from 'react'
import { withRouter } from "react-router-dom";
import './register.sass'
import './config.sass'
import Logo from'./logo.png'


export default withRouter (function ({ onSubmit, error, onMount, history }) {
    useEffect(() => {
        onMount()
    }, [])

    function handleBack(event){
        event.preventDefault()
        history.push('/login')
    }

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
            <div className='register__logo'>
                <a onClick={handleBack} className=" fas fa-arrow-left"></a>
                <img className='register__imageLogo' src = {Logo } alt="logo"/>
            </div>
            
            <h2 className='register__title'>Register</h2>

            <form className="register__form" onSubmit={handleSubmit}>
                <input className="register__input" type="text" name="name" autoComplete="off" placeholder="Name"/>
                <input className="register__input" type="text" name="username" autoComplete="off" placeholder= "username"/>
                <input className="register__input" type="email" name="email" autoComplete="off" placeholder="Email"/>
                <input className="register__input" type="password" name="password" autoComplete="off" placeholder="Password"/>
                <button type="submit" className="register__accept fas fa-check"></button>
            </form>
        </div>
    </>
})


