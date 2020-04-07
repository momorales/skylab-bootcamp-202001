import React from 'react'
import './home.sass'

export default ({user, onLoadAlerts,onLoadPets, error, onLoadAppointments, onLoadContact }) => {


    function handleGoAlerts(event) {
        event.preventDefault()

        onLoadAlerts()
    }
    
    function handleGoToAppointmetns(event){
        event.preventDefault()

        onLoadAppointments()
    }

    function handleGoPets(event) {
        event.preventDefault()

        onLoadPets()
    }

    function handleGoToContact(event) {
        event.preventDefault()

        onLoadContact()
    }


    return <>
        <div className = "sections">
            <a href=" " onClick={handleGoAlerts}><button className="sections__button" ><i className="fas fa-bell fa-3x"></i><br></br><br></br>Alerts</button></a>
            <a href=" " onClick={handleGoToAppointmetns}><button className="sections__button"><i className="fas fa-calendar-alt fa-3x"></i><br></br><br></br>Calendary</button></a>
            <a href=" " onClick={handleGoPets}><button className="sections__button"><i className="fas fa-paw fa-3x"></i><br></br><br></br>My pets</button></a>
            <a href=" " onClick={handleGoToContact}><button className="sections__button"><i className="fas fa-home"></i><br></br><br></br>Contact</button></a>
        </div>
    </>
}

    