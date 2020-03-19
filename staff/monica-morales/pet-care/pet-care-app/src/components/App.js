import React, { useEffect, useContext, useState } from 'react'
import Page from './Page'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Header from './Header'
import { registerUser, login, isLoggedIn, retrieveUser } from '../logic'
import { Context } from './ContextProvider'
import { Route, withRouter, Redirect } from 'react-router-dom'


export default withRouter(function ({ history }) {
  const [state, setState] = useContext(Context) //context
  const [user, setUser] = useState([]) //state
  const { page, error } = state
  
  useEffect(() => {
    if (isLoggedIn()) {
      setState({ page: 'home' })

      history.push('/home')
    } else {
      setState({ page: 'login' })

      history.push('/login')
    }
  }, [])

  async function handleRegister(name, username, email, password) {
    try {
      await registerUser(name, username, email, password)
      setState({ page: 'login' })
      history.push('/')
    } catch ({ message }) {
      setState({ error: message })
    }
  }

  async function handleLogin(email, password) {
    try {
      await login(email, password)
      const user = await retrieveUser()
      setUser(user)
      history.push('/home')
    } catch ({ message }) {
      setState({ ...state, error: message })
    }
  }
  
  function handleGoToRegister() {
    history.push('/register')
  }

  function handleGoToLogin() {
    history.push('/login')
  }


  function handleMountLogin() {
    setState({ page: 'login' })
  }

  function handleMountRegister() {
    setState({ page: 'register' })
  }

  

  return <div>
    <Page name={page}>
      <Route exact path="/" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Redirect to="/login" />} />
      <Route path="/login" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Login onSubmit={handleLogin} error={error} onGoToRegister={handleGoToRegister} onMount={handleMountLogin} />} />
      {/* <Route path="/" render={() => <h1>Hello, All</h1>} /> */}
      {/* <Route path="/login" render={() => <h1>Hello, Login</h1>} /> */}
      {/* <Route path="/home/:id" render={props => <h1>{props.match.params.id}</h1>} />*/}
      <Route path="/register" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Register onSubmit={handleRegister} error={error} onMount={handleMountRegister} />} />      
      <Route path="/home" render={() => isLoggedIn() ? <><Header user = {user}/><Home/></> : <Redirect to="/login" />} /> 
    </Page>
  </div>

})
