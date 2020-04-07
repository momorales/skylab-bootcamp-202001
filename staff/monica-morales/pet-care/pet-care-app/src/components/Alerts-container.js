import React, { useEffect} from 'react'
import Alert from './Alert'
import './alerts-container.sass'

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
            
            {alerts.map(alert => {
                return (
                    <section key = {alert._id}>
                        <Alert key={alert._id} alert={alert}/>
                    </section>
                )
            })}
        
            <a href="" onClick={handleGoToCreateAlert}><button  className="alerts__add fas fa-plus"></button></a>
       
        </section>
    </>
}   