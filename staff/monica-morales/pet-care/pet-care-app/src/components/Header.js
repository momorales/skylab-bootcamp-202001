import React from 'react'
import {  withRouter } from "react-router-dom"
import { logout } from '../logic'
import './header.sass'
import Logo from './logo.png'

export default withRouter (function ({ user,history }) {
    const { name } = user

    function handleLogout(event){
        event.preventDefault()
        logout()
        history.push('/')
    }

    function handleBack(event){
        event.preventDefault()
        history.push('/home')
    }

    return <>

        <section className ="login">
        
            <div className = "login__header">
                <a onClick={handleBack} className="fas fa-home"></a>
                <img className="login__logo" src = {Logo} alt="logo"/>
                <a onClick = {handleLogout}>
                    <i className="fas fa-power-off fa-3x_login"></i>
                </a>
            </div>
            <div className = 'login__username'>                    
                <span>Hello, {name}!</span>
            </div>
           
         </section>
 
    </>
})
