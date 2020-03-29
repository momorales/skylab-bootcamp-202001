import React, { useEffect, useState } from 'react'
import {Calendar,momentLocalizer} from "react-big-calendar"
import moment from "moment"
import 'react-big-calendar/lib/sass/styles.scss'
import './schedule.sass'
import Popup from "reactjs-popup"

export default ({myPets,appointmentList, onGoToCreateAppointment, onGoToDeleteAppointment}) =>{
    const localizer = momentLocalizer(moment)
    const [appointments, setAppointments] = useState([])
    const [appointmetSelected, setAppointmentSelected] = useState("")
    const [petId , setPetId] = useState()

    useEffect(() => {
        const myEventsList = []
        appointmentList.forEach(data => {
            var previousShortDate = moment(data.dateAppointment).format("YYYY-MM-DD")
            var startDateAppointment = moment(previousShortDate + " " + data.hour)
            var endDateAppointment = moment(startDateAppointment).add(1, 'hours')
            const appointment = {
                title: data.description,
                start: startDateAppointment,
                end : endDateAppointment
            }
            myEventsList.push(appointment)
        })
        setAppointments(myEventsList)

    }, [])

    function handleGoToCreateAppointment(event) {
        event.preventDefault()
        const { target: {            
            subject: { value: subject },
            dateAppointment: { value: dateAppointment },
            hour : { value: hour}
          
        } } = event

        onGoToCreateAppointment(subject, dateAppointment, hour, petId)
    }

    function handleGoToCancelAppointment(event) {
        event.preventDefault()
        
        appointmentList.forEach(item=>{
            if (item._id===appointmetSelected)
                setPetId(item.petId)
        })

        onGoToDeleteAppointment(petId,appointmetSelected)
    }

    function onFocus(event){
        event.currentTarget.type = "date"
    }
    function onBlur(event){
        event.currentTarget.type = "text"
        event.currentTarget.placeholder = "Enter a Date"
    }

    function handleSelectAppointment(event){
        event.preventDefault()
        setAppointmentSelected(event.target.value)
    }

    function handleSelectPetId(event){
        event.preventDefault()
        setPetId(event.target.value)
    }

  
    return <>  
        <div  className="bigCalendar-container">
            <Calendar 
                selectable
                localizer={localizer}
                events = {appointments}
                startAccessor="start"
                endAccessor = "end"
            ></Calendar>
        </div>

        <Popup key={1} trigger={
            <button className="buttonAppointments">New visit</button>
        }>
            <form key={1} onSubmit={handleGoToCreateAppointment} className="popup">
                <select className="newPet__input" onChange={handleSelectPetId} name = "pet">
                    <option disabled selected>Select Pet</option>
                    {myPets.map(pet => {
                        return (
                            <option key={pet._id} value={pet._id}>{pet.name}</option>
                        )
                    })}
                </select>
                <input className="newPet__input" type="text"  name="subject" placeholder="Subject"/>
                <input className="newPet__input" type="text"  name="dateAppointment" placeholder="Date Appointment" onFocus = {onFocus} onBlur={onBlur} />
                <select className="newPet__input" type="text" name="hour">
                    <option disabled selected>Select Hour</option>
                    <option value ="9:00">9:00</option>
                    <option value ="10:00">10:00</option>
                    <option value ="12:00">12:00</option>
                    <option value ="13:00">13:00</option>
                    <option value ="15:00">15:00</option>
                    <option value ="16:00">16:00</option>
                    <option value ="17:00">17:00</option>
                </select>
                <div className = "newPet__accept">
                    <button className="newPet__accept fas fa-check" type="submit"></button>
                </div>
            </form>
        </Popup>

        <Popup key={2} trigger={
            <button className="buttonAppointments">Cancel visit</button>
        } position="center center">
            <form key={2} onSubmit={handleGoToCancelAppointment}>
                <select className="newAlert__select" name = "subject" onChange={handleSelectAppointment}>
                    <option disabled selected>Select Appointment</option>
                    {appointmentList.map(appointment => {
                        return (
                            <option value={appointment._id}>{appointment.dateAppointment} - {appointment.description}</option>
                        )
                    })}
                </select>
                <div className = "newPet__accept">
                    <button className="newPet__accept fas fa-check" type="submit"></button>
                </div>
            </form>
        </Popup>
   
    </>
}