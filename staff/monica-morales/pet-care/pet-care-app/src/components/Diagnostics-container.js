import React from 'react'
import Diagnostic from './Diagnostic'
// import './alerts-container.sass'

export default ({diagnostics}) =>{

    return <>  
        <section className = "diagnostic">
            <div className= "diagnostic__title">
                <p>Diagnostics</p>
            </div>

            {diagnostics.map(diagnostic => {
                return (
                    <section key = {diagnostic._id}>
                        <Diagnostic key={diagnostic._id} diagnostic={diagnostic}/>
                    </section>
                )
            })}
                   
        </section>
    </>
}   