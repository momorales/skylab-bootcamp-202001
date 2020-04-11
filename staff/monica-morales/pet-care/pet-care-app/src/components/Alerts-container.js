import React, { useEffect, useState} from 'react'
import Alert from './Alert'
import './alerts-container.sass'
import Moment from 'react-moment'
import moment from 'moment'
Moment.globalFormat = 'D MMM YYYY'

export default ({alerts, onCreateAlert, onMount}) =>{

    useEffect(() => {
        onMount()
    }, [])
    
    function handleGoToCreateAlert(event) {
        event.preventDefault()

        onCreateAlert()
    }

    return <>  
        <section className = "alerts">
            <div className= "alerts__title">
                <p>My alerts</p>
            </div>
            
            {alerts.sort((a,b)=> (a.eventDate > b.eventDate) ? 1 : ((b.eventDate > a.eventDate) ? -1 : 0))
                .map(alert => {
                if(moment(new Date(alert.eventDate)).add(23,'hours').isSameOrAfter(new Date())){
                    return (
                        <section key = {alert._id}>
                            <Alert key={alert._id} alert={alert}/>
                        </section>
                    )
                }
                
            })}
        
            <a href="" onClick={handleGoToCreateAlert}><button  className="alerts__add fas fa-plus"></button></a>
       
        </section>
    </>
}   


