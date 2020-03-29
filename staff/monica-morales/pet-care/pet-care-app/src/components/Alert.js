import React from 'react'
import './alert.sass'
import Moment from 'react-moment'
Moment.globalFormat = 'D MMM YYYY'


export default ({key,alert}) => {
    const {subject, description, telephone, creation, eventDate, id} = alert

    return <>

        <section className="container1">
            <div className="alert">
                <p>{subject} <Moment parse="YYYY-MM-DD">{eventDate}</Moment></p>
               
            </div>
        </section>
        
    </>
}

