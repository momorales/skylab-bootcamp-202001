import React, { useEffect,useState } from 'react'
import './detail-pet.sass'
import './config.sass'
// import Moment from 'react-moment'
// Moment.globalFormat = 'D MMM YYYY'

export default function ({pet, onGoToDiagnostic, error}) {
    const { numberChip, name, dateOfBirth, specie, sex,sterilized, weight, race, typeRace, fur, user,createdDate, diagnostic } = pet

    return <>
        <div className="detailPet">
            <p>My pet {name}</p>  
        </div>
        <ul>
            <li><span>Pet Name: {name}</span></li>
            <li><span> Chip number: {numberChip}</span></li>
            <li><span> Specie: {specie}</span></li>
            <li><span> Sterilized: {sterilized}</span></li>
            <li><span> Weight: {weight} Kg</span></li>
        </ul>
    </>
}
