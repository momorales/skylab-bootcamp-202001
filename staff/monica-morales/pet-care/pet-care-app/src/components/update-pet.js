import React, { useEffect,useState } from 'react'
import './detail-pet.sass'
import './config.sass'
// import Moment from 'react-moment'
// Moment.globalFormat = 'D MMM YYYY'

export default function ({pet, updatePet, error}) {
    const { numberChip, name, dateOfBirth, specie, sex,sterilized, weight, race, typeRace, fur, user,createdDate, diagnostic } = pet

    function handleOnSubmit(event){
        event.preventDefault()
        updatePet(event.target.value)
    }

    return <>
    <div className="newPet__title">
        <p>Update Pet</p>  
    </div>

    <section>
        <form className= "newPet" onSubmit={handleOnSubmit}>
         
                <input className="newPet__input" type="text" readOnly = {true} name="chipNumber" value={numberChip} placeholder="Chip number"/>
                <input className="newPet__input" type="text" readOnly = {true} name="Name" value={name} placeholder="Pet name"/>
                <input className="newPet__input" type="text"  name="dateOfBirth" value={dateOfBirth} placeholder="Date of birth" onFocus = {onFocus} onBlur={onBlur} />
               
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
                    <option value ="NO">No</option>
                </select>
               
                <input className="newPet__input" type="text"  name="weight" value={weight} placeholder="Weight"/>
                <input className="newPet__input" type="text"  name="race" value={race} placeholder="Race"/>
                
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
