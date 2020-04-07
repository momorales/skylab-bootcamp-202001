import React from 'react'
import './update-pet.sass'
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
    <div className="updatePet__title">
        <p>Update {name}</p>  
    </div>

    <section>
        <form className= "updatePet" onSubmit={handleOnSubmit}>
         
                <input type="hidden" name="id" value={_id}/>
                <input className="updatePet__input" type="hidden" readOnly = {true} name="chipNumber"  defaultValue={numberChip} placeholder="Chip number"/>
                <input className="updatePet__input" type="hidden" readOnly = {true} name="Name" defaultValue={name} placeholder="Pet name"/>
                <input className="updatePet__input" type="hidden"  name="birthDate" defaultValue={moment(birthDate).format('D MMM YYYY')} placeholder="Date of birth" onFocus = {onFocus} onBlur={onBlur} />
               
                <span className="updatePet__span">Specie</span>
                <select className="updatePet__input" type="text" name="specie" defaultValue={specie}>
                    <option value ="Cat">Cat</option>
                    <option value ="Dog">Dog</option>
                    <option value ="Rabbit">Rabbit</option>
                </select>
                
                <span className="updatePet__span">Sex</span>
                <select className="updatePet__input" type="text" name="sex" defaultValue={sex}>
                    <option value ="Male">Male</option>
                    <option value ="Famele">Famele</option>
                </select>
               
                <span className="updatePet__span">Sterilized</span>
                <select className="updatePet__input" type="text" name="sterilized" defaultValue={sterilized}>
                    <option value ="Yes">Yes</option>
                    <option value ="No">No</option>
                </select>

                <span className="updatePet__span">Type of Race</span>
                <select className="updatePet__input" type="text" name="typeOfRace" defaultValue={typeRace}>
                    <option value ="Small">Small</option>
                    <option value ="Medium">Medium</option>
                    <option value ="Big">Big</option>
                </select>
               
                <span className="updatePet__span">Fur</span>
                <select className="updatePet__input" type="text" name="fur" defaultValue={fur}>
                    <option value ="Short">Short</option>
                    <option value ="Medium">Medium</option>
                    <option value ="Long">Long</option>
                </select>

                <span className="updatePet__span">Weight</span>
                <input className="updatePet__input" type="text"  name="weight" defaultValue={weight}/>
                <input className="updatePet__input" type="hidden"  name="race" defaultValue={race}/>

            <div className = "updatePet__accept">
                <button className="newPet__accept fas fa-check" type="submit"></button>
            </div>
        </form>
    </section>

    </>
}
