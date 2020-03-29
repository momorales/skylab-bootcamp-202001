import React, { useEffect, useContext, useState } from 'react'
import { Page,Login,Register,Home,Header,AlertsList, PetsList, CreateAlert, CreatePet, Pets, DetailPet, UpdatePet,Schedule } from '../components'
import { registerUser, login, isLoggedIn, retrieveUser,alerts,pets, createAlert, createPet, detailPet, deletePet, updatePet, createAppointment,
  retrieveAppointment, deleteAppointment } from '../logic'
import { Context } from './ContextProvider'
import { Route, withRouter, Redirect } from 'react-router-dom'
const jwt = require('jsonwebtoken')



export default withRouter(function ({ history }) {
  const [state, setState] = useContext(Context) //context
  const [user, setUser] = useState([]) // seteamos el usuario
  const [userToken, setUserToken] = useState() // seteamos el token del usuario logado
  const [alertsList, setAlerts] = useState([]) // seteamos las alertas
  const [petsList, setPets] = useState([]) //seteamos las pets del usuario
  const [petDetail, setPetDetail] = useState({}) //seteamos el detalle de la pet
  const [appointmentList, setAppointmentList] = useState([]) //seteamos los appointments de usuario
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

  //HANDLERS

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
  async function handleCreatePet(chipNumber, Name, dateOfBirth, specie, sex, sterilized, weight, race, typeOfRace, fur) {
    try {
      const user = jwt.verify(userToken, process.env.REACT_APP_TEST_JWT_SECRET) 
      const createdDate = new Date    
      const diagnostic = []
      const pet = await createPet(chipNumber, Name, dateOfBirth, specie, sex,sterilized, weight, race, typeOfRace, fur, user, createdDate, diagnostic)
      const petsList = await pets(user)
      setPets(petsList)
      history.push('/pets/')
    } catch ({ message }) {
      setState({ ...state, error: message })
    }
  }

  async function handleCreateAlert(petId, subject, eventDate, description,telephone) {
    try {
      const user = jwt.verify(userToken, process.env.REACT_APP_TEST_JWT_SECRET)
      const alert = await createAlert(subject, description,telephone, eventDate, petId, user.sub)
      const alertsList = await alerts(user)
      setAlerts(alertsList)
      history.push('/alerts/')
    } catch ({ message }) {
      setState({ ...state, error: message })
    }
  }

  async function handleAlerts() {
    try {
      const user = jwt.verify(userToken, process.env.REACT_APP_TEST_JWT_SECRET);
      const alertsList = await alerts(user)
      setAlerts(alertsList)
      history.push('/alerts/')
    } catch ({ message }) {
      setState({ ...state, error: message })
    }
  }

  async function handlePets() {
    try {
      const user = jwt.verify(userToken, process.env.REACT_APP_TEST_JWT_SECRET);
      const petsList = await pets(user)
      setPets(petsList)
      history.push('/pets/')
    } catch ({ message }) {
      setState({ ...state, error: message })
    }
  }

  async function handleRetrieveAppointment() {
    try {
      const user = jwt.verify(userToken, process.env.REACT_APP_TEST_JWT_SECRET) 
      const appointment = await retrieveAppointment(user) 
      const petsList = await pets(user)
      setPets(petsList)
      setAppointmentList(appointment)
      history.push('/user/appointments')
    } catch ({ message }) {
      setState({ ...state, error: message })
    }
  }

  async function handleDetailPet(idPet) {
    try {
      const user = jwt.verify(userToken, process.env.REACT_APP_TEST_JWT_SECRET);
      const pet = await detailPet(user, idPet)
      setPetDetail(pet)
      history.push('/pet/detail')
    } catch ({ message }) {
      setState({ ...state, error: message })
    }
  }
  
  async function handleDeletePet(idPet) {
    try {
      const user = jwt.verify(userToken, process.env.REACT_APP_TEST_JWT_SECRET);
      const pet = await deletePet(user, idPet)
      const petsList = await pets(user)
      setPets(petsList)
      history.push('/pets/')
    } catch ({ message }) {
      setState({ ...state, error: message })
    }
  }

    
  async function handleUpdatePet(dateOfBirth, specie, sex, sterilized, weight, race, typeOfRace, fur, idPet) {
    try {
      const user = jwt.verify(userToken, process.env.REACT_APP_TEST_JWT_SECRET);
      await updatePet(dateOfBirth, specie, sex, sterilized, weight, race, typeOfRace, fur, idPet, user)
      const petsList = await pets(user)
      setPets(petsList)
      history.push('/pets/')
    } catch ({ message }) {
      setState({ ...state, error: message })
    }
  }

  async function handleCreateAppointment(description, dateAppointment, hour, idPet) {
    try {
      const user = jwt.verify(userToken, process.env.REACT_APP_TEST_JWT_SECRET) 
      const appointment = await createAppointment(description, dateAppointment, hour, user, idPet) 
      const appointments = await retrieveAppointment(user) 
      const petsList = await pets(user)
      setPets(petsList)
      setAppointmentList(appointments)
      history.push('/user/appointments')
    } catch ({ message }) {
      setState({ ...state, error: message })
    }
  }


  async function handleDeleteAppointment(idPet, idAppointment) {
    try {
      const user = jwt.verify(userToken, process.env.REACT_APP_TEST_JWT_SECRET) 
      const appointment = await deleteAppointment(user, idPet, idAppointment) 
      history.push('/user/appointments')
    } catch ({ message }) {
      setState({ ...state, error: message })
    }
  }

     
//NAVIGATION


  function handleGoToRegister() {
    history.push('/register')
  }

  function handleGoToLogin() {
    history.push('/login')
  }
  
  async function handleOnGoToCreateAlert() {
    const user = jwt.verify(userToken, process.env.REACT_APP_TEST_JWT_SECRET);
    try {
      const petsList = await pets(user)
      setPets(petsList)
      history.push('/alert/create')
    } catch ({ message }) {
      setState({ ...state, error: message })
    }
  }

  async function handleOnGoToCreatePet() {
    try {
      history.push('/pet/create')
    } catch ({ message }) {
      setState({ ...state, error: message })
    }
  }

  async function handleOnGoToDiagnostic() {
    try {
      history.push('/home')
    } catch ({ message }) {
      setState({ ...state, error: message })
    }
  }

  async function handleGotoUpdatePet(idPet) {
    try {
      const user = jwt.verify(userToken, process.env.REACT_APP_TEST_JWT_SECRET)
      const pet = await detailPet(user, idPet)
      setPetDetail(pet)
      history.push('/pet/update')
    } catch ({ message }) {
      setState({ ...state, error: message })
    }
  }
//MOUNTS
  function handleMountLogin() {
    setState({ page: 'login' })
  }

  function handleMountRegister() {
    setState({ page: 'register' })
  }

  function handleMountAlerts() {
    setState({ page: 'Alerts' })
  }

  function handleMountPets() {
    setState({ page: 'Pets' })
  }

  function handleMountAlert() {
    setState({ page: 'CreateAlert' })
  }

  function handleMountPet() {
    setState({ page: 'CreatePet' })
  }
  
  return <div>
    <Page name={page}>
      <Route exact path="/" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Redirect to="/login" />} />
      <Route path="/login" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Login onSubmit={handleLogin} error={error} onGoToRegister={handleGoToRegister} onMount={handleMountLogin} />} />
      <Route path="/register" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Register onSubmit={handleRegister} error={error} onMount={handleMountRegister} />} />      
      <Route path="/home" render={() => isLoggedIn() ? <><Header user = {user}/><Home user = {user} onLoadAlerts={handleAlerts} onLoadPets={handlePets} onLoadAppointments={handleRetrieveAppointment} /></> : <Redirect to="/login" />} /> 
      <Route path='/alerts/' render={() => isLoggedIn() ? <><Header user = {user}/><AlertsList alerts={alertsList} onCreateAlert={handleOnGoToCreateAlert} onMount={handleMountAlerts}/></> : <Redirect to="/login" />} /> 
      <Route path='/pets/' render={() => isLoggedIn() ? <><Header user = {user}/><PetsList pets={petsList} onLoadDetailPet={handleDetailPet} onDelete={handleDeletePet} onUpdate={handleGotoUpdatePet} onMount={handleMountPets} onGoToCreatePet={handleOnGoToCreatePet}/></> : <Redirect to="/login" />} /> 
      <Route path='/alert/create' render={() => isLoggedIn() ? <><Header user = {user}/><CreateAlert myPets = {petsList} createAlert={handleCreateAlert} onMount={handleMountAlert}/></> : <Redirect to="/login" />} />
      <Route path='/pet/create' render={() => isLoggedIn() ? <><Header user = {user}/><CreatePet createPet={handleCreatePet} onMount={handleMountPet}/></> : <Redirect to="/login" />} />
      <Route path='/pet/detail'render={() => isLoggedIn() ? <><Header user = {user}/><DetailPet pet={petDetail} onGoToDiagnostic={handleOnGoToDiagnostic} error={error} /></> : <Redirect to="/login" />} />
      <Route path='/pet/update'render={() => isLoggedIn() ? <><Header user = {user}/><UpdatePet pet={petDetail} updatePet={handleUpdatePet} error={error} /></> : <Redirect to="/login" />} /> 
      <Route path='/user/appointments' render={() => isLoggedIn() ? <><Header user = {user}/><Schedule myPets = {petsList} appointmentList={appointmentList} onGoToCreateAppointment={handleCreateAppointment} onGoToDeleteAppointment ={handleDeleteAppointment} error={error} /></> : <Redirect to="/login" />} />       
    </Page>
  </div>

})
