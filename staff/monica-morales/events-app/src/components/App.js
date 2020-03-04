import React, {
  useState,
  useEffect
} from 'react'
import './App.sass'
import {
  sayHello,
  registerUser
} from '../logic'
import {
  Register
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

  function handleRegister(name, surname, email, password) {
    try {
      registerUser(name, surname, email, password)
        .then(() => setView('register'))
      // console.log('OK')

    } catch (error) {
      // console.log(error.message)
    }
  }

useEffect(() => { sayHello(name).then(setHello) }, [])

return <div className="App">
{view === 'register' && < Register onToRegister = {handleRegister}/>}
  <h1>{hello}</h1>
  <form onSubmit={countUp}>
    <span>{count}</span>
    {view === 'message' && <h2>count {count} reached!</h2>}
    <button>++</button>
  </form>
</div>
}

export default App