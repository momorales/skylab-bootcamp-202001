import React from 'react'
// import './alert.sass'
// import Moment from 'react-moment'
// Moment.globalFormat = 'D MMM YYYY'


export default ({key,diagnostic}) => {
    const {name, test, description, lab, dateCreate, petId, id} = diagnostic

    return <>

        <section className="container1">
            <div className="diagnostic">
                {/* <p>{subject} <Moment parse="YYYY-MM-DD">{eventDate}</Moment></p> */}
               
            </div>
        </section>
        
    </>
}

