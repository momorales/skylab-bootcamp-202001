import React, { useEffect, useState } from 'react'
import {Calendar,momentLocalizer} from "react-big-calendar"
import moment from "moment"
import 'react-big-calendar/lib/sass/styles.scss'
import './schedule.sass'
import Modal from 'react-modal';
export default ({myPets,appointmentList, onGoToCreateAppointment, onGoToDeleteAppointment, onMount}) =>{
    const localizer = momentLocalizer(moment)
    const [appointments, setAppointments] = useState([])
    const [petId , setPetId] = useState("")
    const [modalIsOpen, setIsOpen] = useState(false)
    const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false)
    const [modalAcceptVisit, setModalAcceptVisit] = useState(false)
    const [modalError, setModalError] = useState(false)
    const [selectedDate, setSelectedDate] = useState(Date)
    const [deleteAppointmentId, setDeletedAppointmentId] = useState("")
    const [subjectSelected , setSubject] = useState("")
    const [descriptionAppointment, setDescriptionAppointment] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    // Section Modal
    const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'center',
          bottom                : 'center',
          left                  : 'center',
          width                 : '100%',
          heigth                : '100%',
          background            :   'white'
        }
      }
    useEffect(() => {
        onMount()
        const myEventsList = []
        appointmentList.forEach(data => {
            let startDateAppointment = new Date(data.dateAppointment)
            let endDateAppointment = new Date(moment(startDateAppointment).add(1, 'hours'))
            const appointment = {
                title: data.description,
                id :   data.appointmentId,
                start: startDateAppointment,
                end : endDateAppointment
            }
            myEventsList.push(appointment)
        })
        setAppointments(myEventsList)
        Modal.setAppElement("#Schedule")
    }, [])
    function handleGoToCreateAppointment(event) {
        event.preventDefault()
        onGoToCreateAppointment(descriptionAppointment, selectedDate, "0:00", petId, subjectSelected)
    }
    function handleGoToCancelAppointment(event) {
        event.preventDefault()
        let idPet=undefined
        appointmentList.forEach(item=>{
            if (item.appointmentId===deleteAppointmentId){
                idPet= item.petId
            }
        })
        onGoToDeleteAppointment(idPet,deleteAppointmentId)
    }
    function handleSelectPetId(event){
        event.preventDefault()
        setPetId(event.target.value)
    }
    function EventAgenda({ event }) {
        return <span>
        <em style={{ color: 'magenta'}}>{event.title}</em>
        <p>{ event.desc }</p>
      </span>
    }
    function openModalNewVisit({start}){
        setSelectedDate(start)
        setIsOpen(true)
    }
    function closeModal(event){
        event.preventDefault()
        setIsOpen(false)
    }
    function openModalDeleteVisit({id}){    
        setDeletedAppointmentId(id)
        setModalDeleteIsOpen(true)
    }
    function closeModalDeleteVisit(event){
        event.preventDefault()
        setModalDeleteIsOpen(false)
    }
    function handleSelectSubject(event){
        event.preventDefault()
        setSubject(event.target.value)
    }
    
    function openModalAcceptVisit(event){  
        event.preventDefault()  
        const { target: {            
            description: { value: description }
          
        } } = event
        if (subjectSelected && petId && description){
            setDescriptionAppointment(description)
            setModalAcceptVisit(true);
        }
        else{
            openModalError()
        }
    }
    function closeModalAcceptVisit(event){
        event.preventDefault()
        setModalAcceptVisit(false)
    }
    function openModalError(event){    
        setErrorMessage("You need to selected subject, pet and description")
        setModalError(true);
    }
    function closeModalError(event){
        event.preventDefault()
        setModalError(false)
    }
    return <>  
        <div id="Schedule" className="bigCalendar-container">
            <Calendar 
                popup={true}
                selectable={true}
                defaultDate={new Date}
                defaultView='week'
                views={['week','agenda']}
                localizer={localizer}
                events = {appointments}
                longPressThreshold ={250}
                onSelectSlot={openModalNewVisit}
                onSelectEvent={openModalDeleteVisit}
                scrollToTime={new Date}
                components={{
                    agenda: {
                        event: EventAgenda
                    }
                }}
            />
            <Modal 
                key = {1}
                isOpen={modalIsOpen}
                contentLabel="New Appointment"
                onRequestClose={closeModal}
                style={customStyles}
            >                
                <form key={1} onSubmit={openModalAcceptVisit}>
                    <p>New Appointment</p>
                    <select className="newPet__input" onChange={handleSelectPetId} name = "pet">
                        <option disabled selected>Select Pet</option>
                        {myPets.map(pet => {
                            return (
                                <option key={pet._id} value={pet._id}>{pet.name}</option>
                            )
                        })}
                    </select>
                    <select className="newAlert__select" onChange={handleSelectSubject} name = "subject">
                        <option disabled selected>Subject</option>
                        <option value ="vaccines">Vaccines</option>
                        <option value ="deworming">Deworming</option>
                        <option value ="medication">Medication</option>
                        <option value ="appointment">Appointment</option>
                    </select>
                    <input className="newPet__input" type="text"  name="description" placeholder="Description"/>                   
                    <div className = "newPet__accept">
                        <button className="newPet__accept fas fa-check" type="submit"></button>
                    </div>
                </form>
            </Modal>
            <Modal 
                key = {2}
                isOpen={modalDeleteIsOpen}
                contentLabel="Delete Appointment"
                style={customStyles}
            >
                <p>Delete Appointment</p>
                <p>Are you sure to delete appointment?</p>
                <button onClick={handleGoToCancelAppointment}>Yes</button>
                <button onClick={closeModalDeleteVisit}>No</button>
            </Modal>
            <Modal 
                key = {3}
                isOpen={modalAcceptVisit}
                contentLabel="Save Appointment"
                style={customStyles}
            >
                <p>Save Appointment</p>
                <p>Are you sure to save new appointment?</p>
                <button onClick={handleGoToCreateAppointment}>Yes</button>
                <button onClick={closeModalAcceptVisit}>No</button>
            </Modal>
            <Modal 
                key = {4}
                isOpen={modalError}
                style={customStyles}
            >
                <p>Validation Error</p>
                <p>{errorMessage}</p>
                <button onClick={closeModalError}>Accept</button>
            </Modal>
        </div>   
    </>
}