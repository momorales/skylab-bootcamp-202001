
import React, { useState } from 'react'
import Modal from 'react-modal'
import './pets.sass'


export default ({pet, onClick, onDelete, onUpdate}) => {
    const { name,_id} = pet
    
    const [modalIsOpen , setIsOpen] = useState(false)
    const [petId, setPetId] = useState('')

    function handleGoDetailPet(event) {
        event.preventDefault()

        onClick(event.target.name)
    }

    function handleGoToUpdatePet(event) {
        event.preventDefault()
        onUpdate(event.target.name)
    }

    function handleGoToDeletePet(event) {
        event.preventDefault()

        onDelete(petId)
    }

    function openModal(event) {
        event.preventDefault()
        setPetId(event.target.name)
        setIsOpen(true)
    }
 

    function closeModal(event){
        event.preventDefault()
        setIsOpen(false)
    }
    return <>
        <section className="container">
                  
            <a href="" onClick={handleGoDetailPet}><button className="pet" name={_id} >{name}</button></a>
            <a href="" onClick= {handleGoToUpdatePet}><button className="update fas fa-pencil-alt" name={_id}></button></a>
            <button onClick={openModal} className="delete far fa-trash-alt" name={_id}></button>
            <Modal className='container__modal'
                isOpen = {modalIsOpen}             
                // onRequestClose={closeModal}
                        
            >
                <div>
                    <p>Are you sure to delete {name}?</p>
                    <button onClick={handleGoToDeletePet} className='container__option' >Yes</button>
                    <button onClick={closeModal} className='container__option'>No</button>
                </div>
            </Modal>
        </section>
    </>
}
