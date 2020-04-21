import React from 'react'
import './contact.sass'
import './config.sass'
import Pet from './pet.jpg'

export default function(){

    return <>
      <section className="containerContact">
            <img src = {Pet} className="containerContact__image" alt="pet-care"/>
    
            <div className="containerContact__information">
                <h1>Contact our center</h1>
                <span>Email: </span><span> petcare@gmail.com</span><br></br>
                <span>Phone: </span><span> +34 93 999 99 99</span><br></br>
                <span>Adress: </span><span>Street Barcelona 3, 08184 Barcelona</span><br></br><br></br>
                <span>Attention Hours:</span>
                <p>Monday to Friday from 10:00h to 14:00h and from 16:30h to 20:30h</p>
                <p>Saturday from 10:00h to 14:00</p>
            </div>
        
      </section>
    </>

}