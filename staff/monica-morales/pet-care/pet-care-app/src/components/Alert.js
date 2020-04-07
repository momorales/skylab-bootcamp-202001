import React from 'react'
import './alert.sass'
import Moment from 'react-moment'
Moment.globalFormat = 'D MMM YYYY'


export default ({alert}) => {
    const {subject, eventDate} = alert
    const {name} = alert.pets[0]

    return <>
        <section className="container1">
            <div className="alert">
                <p>{name}</p>
                <p>{subject} <Moment parse="YYYY-MM-DD">{eventDate}</Moment></p>               
            </div>
        </section>
    </>
}

