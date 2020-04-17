import React, { useEffect,useState } from 'react'
import {  withRouter } from "react-router-dom"
import './detail-pet.sass'
import './config.sass'

export default withRouter (function ({pet, onGoToDiagnostic, history}) {
    const { numberChip, name, specie, sterilized, weight, _id} = pet

    const [petId , setPetId] = useState()

    useEffect(() => {
       setPetId(_id)
    }, [])    

    function handleBack(event){
        event.preventDefault()
        history.goBack()
    }

    function handleDiagnostic(event) {
        event.preventDefault()

        onGoToDiagnostic(petId)
    }

    return <>
        <section className = "container-detail">
            <div className="container-detail__detailPet">
                <p>My pet {name}</p>  
            </div>
            <ul>
                <li><span>Pet Name: {name}</span></li>
                <li><span> Chip number: {numberChip}</span></li>
                <li><span> Specie: {specie}</span></li>
                <li><span> Sterilized: {sterilized}</span></li>
                <li><span> Weight: {weight} Kg</span></li>
            </ul>

            <button onClick= {handleDiagnostic} className= "container-detail__buttonDiagnostics">Diagnostics</button>
            <a onClick={handleBack} className=" container-detail__back fas fa-arrow-left"></a>
        </section>

    </>
})
