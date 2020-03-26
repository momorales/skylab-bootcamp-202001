import React from 'react'
import './pets.sass'

export default ({pet, onClick, onDelete, onUpdate}) => {
    const {numberChip, name, birthDate, specie, sex, race,typeRace,fur,sterilized,weight, _id} = pet

    function handleGoDetailPet(event) {
        event.preventDefault()

        onClick(event.target.name)
    }

    function handleGoToDeletePet(event) {
        event.preventDefault()

        onDelete(event.target.name)
    }

    function handleGoToUpdatePet(event) {
        event.preventDefault()

        onUpdate(event.target.name)
    }

    return <>
        <section className="container">
            {/* <section className="pet">
                <p>{name}</p>
            </section> */}           
            <a href="" onClick={handleGoDetailPet}><button className="pet" name={_id} >{name}</button></a>
            <a href="" onClick= {handleGoToUpdatePet}><button className="update fas fa-pencil-alt" name={_id}></button></a>
            <a href="" onClick= {handleGoToDeletePet}><button className="delete far fa-trash-alt" name={_id}></button></a>

        </section>
    </>
}
