import React, { useEffect,  useState } from 'react'
import './header.sass'
import Logo from './logo.png'

export default ({ user }, onMount) => {
    const {name} = user

    useEffect(() => {
        onMount()
    }, [])
    
    
    return <>

        <section class ="login">
        
        <div className = "login__header">
           <i className="fas fa-arrow-left"></i>
           <img className="login__logo" src = {Logo}/>
           <i className="fas fa-power-off fa-3x_login"></i>
         </div>
            <div className = 'login__username'>
                <p>Hello {user}</p>
        </div>
           
         </section>
 
    </>
}
