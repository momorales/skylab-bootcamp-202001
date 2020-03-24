import React from 'react'
import './alerts.sass'
import Moment from 'react-moment'
Moment.globalFormat = 'D MMM YYYY'


export default ({key,alertList}) => {
    const {subject, description, telephone, creation, eventDate, id} = alertList

    return <>

        <section className="container">
            <div className="alert">
                <p>{subject} <Moment parse="YYYY-MM-DD">{eventDate}</Moment></p>
               
                {/* <button className="alerts__alert" onClick={event => {
                    event.preventDefault()
                    onGoToDetail(id)
                }}>View to alert</button> */}
            </div>
        </section>
        
    </>
}

