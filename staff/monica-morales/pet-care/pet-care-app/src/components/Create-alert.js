import React, { useEffect,useState } from 'react'
import './create-alert.sass'
import './config.sass'

export default function ({ myPets, createAlert, error, onMount }) {
    const [petId , setPetId] = useState()
    const [subjectSelected , setSubject] = useState()

    useEffect(() => {
        onMount()
    }, [])    

    function handleSubmit(event) {
        event.preventDefault()

        const { target: {            
            eventDate: { value: eventDate },
            description: { value: description },
            telephone : { value: telephone}
          
        } } = event

        createAlert(petId, subjectSelected, eventDate, description,telephone)
    }

    function handleSelectSubject(event){
        event.preventDefault()
        setSubject(event.target.value)
    }

    function handleSelectPetId(event){
        event.preventDefault()
        setPetId(event.target.value)
    }

    function onFocus(event){
        event.currentTarget.type = "date";
    }
    function onBlur(event){
        event.currentTarget.type = "text";
        event.currentTarget.placeholder = "Enter a Date";
    }

    return <>
        <section className = "newAlert">
            <h2 className='newAlert__title'>New alert</h2>

            <form className="newAlert__form" onSubmit={handleSubmit}>
                
                <select className="newAlert__select" onChange={handleSelectPetId} name = "subject">
                    <option disabled selected>Select Pet</option>
                    {myPets.map(pet => {
                        return (
                            <option value={pet._id}>{pet.name}</option>
                        )
                    })}
                </select>
                
                <select className="newAlert__select" onChange={handleSelectSubject} name = "subject">
                    <option disabled selected>Subject</option>
                    <option value ="vaccines">Vaccines</option>
                    <option value ="deworming">Deworming</option>
                    <option value ="medication">Medication</option>
                </select>
                                      
                <input className="newAlert__input" type="text" name="eventDate" placeholder="Event date" onFocus = {onFocus} onBlur={onBlur}/>
                <input className="newAlert__input" type="text" name="description" placeholder="Description"/>
                <input className="newAlert__input" type="text" name="telephone" placeholder="Telephone"/>
                <button className="newAlert__accept fas fa-check" type="submit"></button>
            </form>
        </section>
    </>
}