import React, { useEffect,useState } from 'react'
import './create-pet.sass'
import './config.sass'
import Moment from 'react-moment'
Moment.globalFormat = 'D MMM YYYY'

export default function ({  createPet, error, onMount }) {

    useEffect(() => {
        onMount()
    }, [])    

    function handleSubmit(event) {
        event.preventDefault()

        const { target: {            
            chipNumber: { value: chipNumber },
            Name: { value: Name },
            dateOfBirth : { value: dateOfBirth},
            specie : { value: specie},
            sex : { value: sex},
            sterilized : { value: sterilized},
            weight : { value: weight},
            race : { value: race},
            typeOfRace : { value: typeOfRace},
            fur : { value: fur},
            
            
        } } = event

        createPet(chipNumber, Name, dateOfBirth, specie, sex, sterilized, Number(weight), race, typeOfRace, fur )

    }

    function onFocus(event){
        event.currentTarget.type = "date";
    }
    function onBlur(event){
        event.currentTarget.type = "text";
        event.currentTarget.placeholder = "Enter a Date";
    }

    return <>
        <div className="newPet__title">
            <p>New Pet</p>  
        </div>

        <section>
            <form className= "newPet" onSubmit={handleSubmit}>
             
                    <input className="newPet__input" type="text"  name="chipNumber" placeholder="Chip number"/>
                    <input className="newPet__input" type="text"  name="Name" placeholder="Pet name"/>
                    <input className="newPet__input" type="text"  name="dateOfBirth" placeholder="Date of birth" onFocus = {onFocus} onBlur={onBlur} />
                   
                    <select className="newPet__input" type="text" name="specie">
                        <option disabled selected>Specie</option>
                        <option value ="Cat">Cat</option>
                        <option value ="Dog">Dog</option>
                        <option value ="Rabbit">Rabbit</option>
                    </select>
                    
                    <select className="newPet__input" type="text" name="sex">
                        <option disabled selected>Sex</option>
                        <option value ="Male">Male</option>
                        <option value ="Famele">Famele</option>
                    </select>
                   
                    <select className="newPet__input" type="text" name="sterilized">
                        <option disabled selected>Sterilized</option>
                        <option value ="Yes">Yes</option>
                        <option value ="NO">No</option>
                    </select>
                   
                    <input className="newPet__input" type="text"  name="weight" placeholder="Weight"/>
                    <input className="newPet__input" type="text"  name="race" placeholder="Race"/>
                    
                    <select className="newPet__input" type="text" name="typeOfRace">
                        <option disabled selected>Type of race</option>
                        <option value ="Small">Small</option>
                        <option value ="Medium">Medium</option>
                        <option value ="Big">Big</option>
                    </select>
                   
                    <select className="newPet__input" type="text" name="fur">
                        <option disabled selected>Fur</option>
                        <option value ="Short">Short</option>
                        <option value ="Medium">Medium</option>
                        <option value ="Long">Long</option>
                    </select>
                <div className = "newPet__accept">
                    <button className="newPet__accept fas fa-check" type="submit"></button>
                </div>
            </form>
        </section>

        </>
    }

    