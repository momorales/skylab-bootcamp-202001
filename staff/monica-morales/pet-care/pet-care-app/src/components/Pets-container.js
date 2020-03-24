import React, { useEffect, useState } from 'react'
import Pet from './Pets'
import './pets-container.sass'

export default ({pets, onMount}) =>{

    useEffect(() => {
        onMount()
    }, [])

    return <>  
    <section className = "pets">
            <div className= "pets__title">
                <p>My pets</p>
            </div>
        {pets.map(pet => {
            return (
                <section key = {pet._id}>
                    <Pet pet={pet}/>
                </section>
            )
        })}
         <a href=""><button  className="pets__add fas fa-plus"></button></a>
        </section>
    </>
}