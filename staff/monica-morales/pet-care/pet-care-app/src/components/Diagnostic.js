import React from 'react'
import './diagnostic.sass'
import Moment from 'react-moment'
Moment.globalFormat = 'D MMM YYYY'


export default ({diagnostic}) => {
    const {namePet, test, description, lab, dateCreate, nameDiagnostic} = diagnostic

    return <>

        <section className="diagnostic">
            <ul>
                <li className="diagnostic__data"><span>Pet: {namePet}</span></li>
                <li className="diagnostic__data"><span>Title: {nameDiagnostic}</span></li>
                <li className="diagnostic__data"><span><Moment parse="YYYY-MM-DD">Date: {dateCreate}</Moment></span></li>
                <li className="diagnostic__data"> <span>Type test: {test}</span></li>
                <li className="diagnostic__data"><span>Laboratory: {lab}</span></li>
                <li className="diagnostic"><span>Valoration: {description}</span></li>
            </ul>
        </section>
    </>
}

