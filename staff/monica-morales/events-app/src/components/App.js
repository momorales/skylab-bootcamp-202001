import React, {
  useState,
  useEffect
} from 'react'
import './App.sass'
import {
  sayHello,
  registerUser,
  authenticateUser
} from '../logic'
import {
  Register,
  Login
} from '../components'

function App({
  name
}) {
  const [count, setCount] = useState(0)
  const [view, setView] = useState('register')
  const [hello, setHello] = useState()

  function countUp(event) {
    event.preventDefault()

    setCount(count + 1)
    count > 4 && setView('message')
  }

  function handleSetToken(token) {
    sessionStorage.token = token
  }

  function handleRetrieveToken() {
    return sessionStorage.token
  }

  function handleRegister(name, surname, email, password) {
    try {
      registerUser(name, surname, email, password)
        .then(() => setView('login'))
      // console.log('OK')

    } catch (error) {
      // console.log(error.message)
    }
  }

  function handleLogin(email, password) {
    try{
      authenticateUser(email, password)
      .then(response => {
        const token = response
        handleSetToken(token)
        setView("landing")
      })
      .catch((error) => console.log(error))
    }catch(error) {
      console.log(error)
    }
  }

  function handleGoToRegister() {
    setView("register")
  }

useEffect(() => { sayHello(name).then(setHello) }, [])

return <div className="App">
{view === 'register' && < Register onToRegister = {handleRegister}/>}
{view === "login" && < Login onToLogin={handleLogin} onGoToRegister={handleGoToRegister}/>}






  <h1>{hello}</h1>
  <form onSubmit={countUp}>
    <span>{count}</span>
    {view === 'message' && <h2>count {count} reached!</h2>}
    <button>++</button>
  </form>
</div>
}

export default App