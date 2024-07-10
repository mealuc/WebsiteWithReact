import './Contact.css'
import Header from './Header';
import React from 'react';

function Contact() {
    return (
        <>
        <Header />
        <div className="registerContainer">
            <form className="registerForm">
                <label htmlFor="name">First Name:</label>
                <input name="name" placeholder="Name" type="text"/> 

                <label htmlFor="surname">Surname:</label>
                <input name="surname" placeholder="Surname" type="text"/>

                <label htmlFor="phone">Phone:</label>
                <input name="phone" placeholder="Phone" type="tel"/>
                <input name="submit" type="submit" value="Get Appointment"/>
            </form>
        </div>
        </>
    )

}

export default Contact = React.memo(Contact);