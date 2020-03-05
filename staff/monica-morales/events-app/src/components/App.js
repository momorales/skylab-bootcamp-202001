import React, { useState, useEffect} from 'react'
import './App.sass'
import { registerUser, authenticateUser} from '../logic'
import {  Register, Login} from '../components'

function App({ name}) {
  
  const [view, setView] = useState('register')
 

  // function handleSetToken(token) {
  //   sessionStorage.token = token
  // }

  // function handleRetrieveToken() {
  //   return sessionStorage.token
  // }

  function handleRegister(name, surname, email, password) {
    try {
      registerUser(name, surname, email, password)
        .then(() => setView('login'))
      
    } catch (error) {
     
    }
  }

  const handleLogin = async (email, password) => {
    try{
      const token = await authenticateUser(email, password)

      sessionStorage.token = token
     
        setView("landing")
      
      
    }catch(error) {
      console.log(error)
    }
  }

  function handleGoToRegister() {
    setView("register")
  }

// useEffect(() => { sayHello(name).then(setHello) }, [])

return <div className="App">
{view === 'register' && < Register onToRegister = {handleRegister}/>}
{view === "login" && < Login onToLogin={handleLogin} onGoToRegister={handleGoToRegister}/>}
</div>
}
export default App