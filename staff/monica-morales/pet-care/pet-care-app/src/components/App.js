import React, { useEffect, useContext, useState } from 'react'
import { Page,Login,Register,Home,Header,AlertsList, PetsList, CreateAlert } from '../components'
import { registerUser, login, isLoggedIn, retrieveUser,alerts,pets, createAlert } from '../logic'
import { Context } from './ContextProvider'
import { Route, withRouter, Redirect } from 'react-router-dom'
const jwt = require('jsonwebtoken')



export default withRouter(function ({ history }) {
  const [state, setState] = useContext(Context) //context
  const [user, setUser] = useState([]) // seteamos el usuario
  const [userToken, setUserToken] = useState() // seteamos el token del usuario logado
  const [alertsList, setAlerts] = useState([]) // seteamos las alertas
  const [petsList, setPets] = useState([]) //seteamos las pets del usuario
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
      setUserToken(await login(email, password))
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

  async function handleAlerts() {
    try {
      const alertsList = await alerts()
      setAlerts(alertsList)
      history.push('/alerts/')
    } catch ({ message }) {
      setState({ ...state, error: message })
    }
  }

  async function handleOnGoToCreateAlert() {
    try {
      const petsList = await pets()
      setPets(petsList)
      history.push('/alert/create')
    } catch ({ message }) {
      setState({ ...state, error: message })
    }
  }

  async function handleCreateAlert(petId, subject, eventDate, description,telephone) {
    try {
      const user = jwt.verify(userToken, process.env.REACT_APP_TEST_JWT_SECRET);
      const alert = await createAlert(subject, description,telephone, eventDate, petId, user.sub)
      const alertsList = await alerts()
      setAlerts(alertsList)
      history.push('/alerts/')
    } catch ({ message }) {
      setState({ ...state, error: message })
    }
  }

  function handleMountAlerts() {
    setState({ page: 'Alerts' })
  }

  async function handlePets() {
    try {
      const petsList = await pets()
      setPets(petsList)
      history.push('/pets/')
    } catch ({ message }) {
      setState({ ...state, error: message })
    }
  }

  function handleMountPets() {
    setState({ page: 'Pets' })
  }


  function handleMountAlert() {
    setState({ page: 'CreateAlert' })
  }
  
  return <div>
    <Page name={page}>
      <Route exact path="/" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Redirect to="/login" />} />
      <Route path="/login" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Login onSubmit={handleLogin} error={error} onGoToRegister={handleGoToRegister} onMount={handleMountLogin} />} />
      <Route path="/register" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Register onSubmit={handleRegister} error={error} onMount={handleMountRegister} />} />      
      <Route path="/home" render={() => isLoggedIn() ? <><Header user = {user}/><Home user = {user} onLoadAlerts={handleAlerts} onLoadPets={handlePets} /></> : <Redirect to="/login" />} /> 
      <Route path='/alerts/' render={() => isLoggedIn() ? <><Header user = {user}/><AlertsList alerts={alertsList} onCreateAlert={handleOnGoToCreateAlert} onMount={handleMountAlerts}/></> : <Redirect to="/login" />} /> 
      <Route path='/pets/' render={() => isLoggedIn() ? <><Header user = {user}/><PetsList pets={petsList} onMount={handleMountPets}/></> : <Redirect to="/login" />} /> 
      <Route path='/alert/create' render={() => isLoggedIn() ? <><Header user = {user}/><CreateAlert myPets = {petsList} createAlert={handleCreateAlert} onMount={handleMountAlert}/></> : <Redirect to="/login" />} /> 

    </Page>
  </div>

})
