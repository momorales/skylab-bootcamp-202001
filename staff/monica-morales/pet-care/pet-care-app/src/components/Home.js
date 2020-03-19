import React, { useState, useEffect, useContext } from 'react'
// import CreateEvent from './CreateEvent'
import { retrieveUser, isLoggedIn, logout} from '../logic'
import './home.sass'
import { Context } from './ContextProvider'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


// const element = <FontAwesomeIcon icon={faCoffee} />

// ReactDOM.render(element, document.body)

export default withRouter(function ({ history }) {
    const [, setState] = useContext(Context)
    const [name, setName] = useState()

    useEffect(() => {
        if (isLoggedIn())
            (async () => {
                try {
                    const { name } = await retrieveUser()

                    setName(name)
                    
                    setState({ page: 'home' })
                } catch ({ message }) {
                    setState({ error: message, page: 'login' })
                }
            })()
        else setState({ page: 'login' })
    }, [])

    // function handleLogout() {
    //     logout()

    //     setState({ page: 'login' })

    //     history.push('/login')
    // }

    // function handleCreateEvent(title, description, date, location) {
    //     // TODO
    // }

    return <>
        {/* <h1>Hello, {name}!</h1> */}
        {/* <button onClick={handleLogout}>Logout</button> */}
        <div className = "sections">
            <a href=""><button className="sections__button"><i className="fas fa-bell fa-3x"></i></button></a>
            <a href=""><button className="sections__button"><i className="fas fa-calendar-alt fa-3x"></i></button></a>
            <a href=""><button className="sections__button"><i className="fas fa-paw fa-3x"></i></button></a>
            {/* <CreateEvent onSubmit={handleCreateEvent} /> */}

        </div>
    </>
})

