import React from 'react'
import {  withRouter } from "react-router-dom"
import Diagnostic from './Diagnostic'
import './diagnostics-container.sass'

export default withRouter(function ({diagnostics, history}){

    function handleBack(event){
        event.preventDefault()
        history.goBack()
    }

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
              <a onClick={handleBack} className=" container-diagnostic__back fas fa-arrow-left"></a>     
        </section>
    </>
}) 