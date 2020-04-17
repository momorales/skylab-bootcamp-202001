import React, { useEffect} from 'react'
import {  withRouter } from "react-router-dom"
import Pet from './Pets'
import './pets-container.sass'

export default withRouter (function({pets, onLoadDetailPet, onDelete, onUpdate, onMount, onGoToCreatePet, history}){

    useEffect(() => {
        onMount()
    }, [])

    function handleBack(event){
        event.preventDefault()
        history.push('/home')
    }

    function handleGoToCreatePet(event) {
        event.preventDefault()

        onGoToCreatePet()
    }

    return <>  
    <section className = "pets">
            <div className= "pets__title">
                <p>My Pets</p>
            </div>
        {pets.map(pet => {
            return (
                <section key = {pet._id}>
                    <Pet pet={pet} onClick={onLoadDetailPet} onDelete={onDelete} onUpdate={onUpdate}/>
                </section>
            )
        })}
         <a onClick={handleBack} className=" pets__back fas fa-arrow-left"></a>
         <a href="" onClick={handleGoToCreatePet}><button  className="pets__add fas fa-plus"></button></a>
        </section>
    </>
})