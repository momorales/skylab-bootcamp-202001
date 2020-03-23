import React from 'react'
import './pets.sass'

export default ({pet}) => {
    const {numberChip, name, birthDate, specie, sex, race,typeRace,fur,sterilized,weight} = pet

    return <>
    <section className="container">
        <section className="pet">
            <h3>{name}</h3>
            {/* <p>{numberChip}</p>
            <span>{birthDate}</span>
            <span>{specie}</span>
            <span>{sex}</span> */}
        </section>
        </section>
    </>
}
