import React, { useEffect } from 'react'
import './home.sass'

export default ({user, onLoadAlerts,onLoadPets, error, onLoadAppointments}) => {


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


    return <>
        <div className = "sections">
            <a href="" onClick={handleGoAlerts}><button className="sections__button" ><i className="fas fa-bell fa-3x"></i></button></a>
            <a href="" onClick={handleGoToAppointmetns}><button className="sections__button"><i className="fas fa-calendar-alt fa-3x"></i></button></a>
            <a href="" onClick={handleGoPets}><button className="sections__button"><i className="fas fa-paw fa-3x"></i></button></a>
        </div>
    </>
}

