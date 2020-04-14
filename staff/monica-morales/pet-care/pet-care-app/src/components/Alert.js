import React, { useState } from 'react'
import Modal from 'react-modal'
import './alert.sass'
import moment from 'moment'



export default ({alert, onDelete}) => {
    const {subject, eventDate} = alert
    const {name} = alert.pets[0]

    const [modalIsOpen , setIsOpen] = useState(false)
    const [eventToDelete, setEventToDelete] = useState(new Date)


    function handleGoToDeleteAlert(event) {
        event.preventDefault()

        onDelete(eventToDelete)
    }

    function openModal(event) {
        event.preventDefault()
        setEventToDelete(event.target.value)
        setIsOpen(true)
    }

    function closeModal(event){
        event.preventDefault()
        setIsOpen(false)
    }


    return <>
        <section className="container1">
            <div className="alert">
                <p>{name}</p>
                <p>{subject} </p>   
                <p>{moment(eventDate).format('DD/MM/YYYY HH:mm a')}</p>
            </div>
                <button onClick={openModal} className="delete far fa-trash-alt" value={eventDate}></button>

                <Modal className='container1__modal'
                isOpen = {modalIsOpen}             
                         
                >
                <div>
                    <p>Are you sure to delete this alert?</p>
                    <button onClick={handleGoToDeleteAlert} className='container1__option' >Yes</button>
                    <button onClick={closeModal} className='container1__option'>No</button>
                </div>
            </Modal>
          
        </section>
    </>
}

