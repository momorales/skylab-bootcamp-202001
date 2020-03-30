import React from 'react'
// import './alert.sass'
import Moment from 'react-moment'
Moment.globalFormat = 'D MMM YYYY'


export default ({diagnostic}) => {
    const {name, test, description, lab, dateCreate, petId, id} = diagnostic

    return <>

        <section className="container1">
            <div className="diagnostic">
                <span>{name}</span>
                <span><Moment parse="YYYY-MM-DD">{dateCreate}</Moment></span>
                <span>{test}</span>
                <span>{lab}</span>
                <span>{description}</span>
            </div>
        </section>
    </>
}

