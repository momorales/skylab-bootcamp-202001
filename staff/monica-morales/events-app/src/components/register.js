import React from 'react'

export default

function({onToRegister}){
    return <form onSubmit={event=>{
        event.preventDefault()

        const name=event.target.name.value
        const surname=event.target.surname.value
        const email=event.target.email.value
        const password=event.target.password.value

        onToRegister(name, surname, email, password)
    }}>
        <h2>Register</h2>
        <input type="text" name="name" placeholder="Name"></input>
        <input type="text" name="surname" placeholder="Surname"></input>
        <input type="text" name="email" placeholder="Email"></input>
        <input type="password" name="password" placeholder="Password"></input>
        <button type="submit">REGISTER</button>

    </form>
}