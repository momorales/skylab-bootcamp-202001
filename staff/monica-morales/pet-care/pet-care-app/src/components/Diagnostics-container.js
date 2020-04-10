import React from 'react'
import Diagnostic from './Diagnostic'
import './diagnostics-container.sass'

export default ({diagnostics}) =>{

    return <>  
        <section className = "container-diagnostic">
            <div className= "container-diagnostic__title">
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