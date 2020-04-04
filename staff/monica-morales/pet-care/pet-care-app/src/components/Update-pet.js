import React, { useEffect,useState } from 'react'
import './detail-pet.sass'
import './config.sass'
// import Moment from 'react-moment'
// Moment.globalFormat = 'D MMM YYYY'
import moment from 'moment'

export default function ({pet, updatePet, error}) {
    const { numberChip, name, birthDate, specie, sex,sterilized, weight, race, typeRace, fur, _id} = pet

    function handleOnSubmit(event){
        event.preventDefault()
        const { target: {            
            birthDate : { value: birthDate},
            specie : { value: specie},
            sex : { value: sex},
            sterilized : { value: sterilized},
            weight : { value: weight},
            race : { value: race},
            typeOfRace : { value: typeOfRace},
            fur : { value: fur},
            id : { value : id}
           
            
            
        } } = event

        updatePet(birthDate, specie, sex, sterilized, Number(weight), race, typeOfRace, fur, id)
    }


    function onFocus(event){
        event.currentTarget.type = "date"
    }
    function onBlur(event){
        event.currentTarget.type = "text"
        event.currentTarget.placeholder = "Enter a Date"
    }

    return <>
    <div className="newPet__title">
        <p>Update Pet</p>  
    </div>

    <section>
        <form className= "newPet" onSubmit={handleOnSubmit}>
         
                <input type="hidden" name="id" value={_id}/>
                <input className="newPet__input" type="text" readOnly = {true} name="chipNumber"  defaultValue={numberChip} placeholder="Chip number"/>
                <input className="newPet__input" type="text" readOnly = {true} name="Name" defaultValue={name} placeholder="Pet name"/>
                <input className="newPet__input" type="text"  name="birthDate" defaultValue={birthDate} placeholder="Date of birth" onFocus = {onFocus} onBlur={onBlur} />
               
                <select className="newPet__input" type="text" name="specie" defaultValue={specie}>
                    <option value ="Cat">Cat</option>
                    <option value ="Dog">Dog</option>
                    <option value ="Rabbit">Rabbit</option>
                </select>
                
                <select className="newPet__input" type="text" name="sex" defaultValue={sex}>
                    <option value ="Male">Male</option>
                    <option value ="Famele">Famele</option>
                </select>
               
                <select className="newPet__input" type="text" name="sterilized" defaultValue={sterilized}>

                    <option value ="Yes">Yes</option>
                    <option value ="No">No</option>

                </select>
               
                <input className="newPet__input" type="text"  name="weight" defaultValue={weight} placeholder="Weight"/>
                <input className="newPet__input" type="text"  name="race" defaultValue={race} placeholder="Race"/>
                
                <select className="newPet__input" type="text" name="typeOfRace" defaultValue={typeRace}>
                    <option value ="Small">Small</option>
                    <option value ="Medium">Medium</option>
                    <option value ="Big">Big</option>
                </select>
               
                <select className="newPet__input" type="text" name="fur" defaultValue={fur}>
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
