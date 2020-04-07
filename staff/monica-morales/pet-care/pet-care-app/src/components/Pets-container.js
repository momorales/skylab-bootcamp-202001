import React, { useEffect} from 'react'
import Pet from './Pets'
import './pets-container.sass'

export default ({pets, onLoadDetailPet, onDelete, onUpdate, onMount, onGoToCreatePet}) =>{

    useEffect(() => {
        onMount()
    }, [])

    function handleGoToCreatePet(event) {
        event.preventDefault()

        onGoToCreatePet()
    }

    return <>  
    <section className = "pets">
            <div className= "pets__title">
                <p>My pets</p>
            </div>
        {pets.map(pet => {
            return (
                <section key = {pet._id}>
                    <Pet pet={pet} onClick={onLoadDetailPet} onDelete={onDelete} onUpdate={onUpdate}/>
                </section>
            )
        })}
         <a href="" onClick={handleGoToCreatePet}><button  className="pets__add fas fa-plus"></button></a>
        </section>
    </>
}