import './Contact.css'
import Header from './Header';
import React, { useState } from 'react';

function Contact() {
    const [image, setImage] = useState(null);

    function handleImage(data){
        setImage(data.target.files[0]);
    }

    function handleSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', image)
        fetch("http://localhost:5000/uploadImages",{
            method :'POST',
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) });
            }
            return response.json();
        })
        .then(d => {
            console.log("Succesfully Loaded:", d)
        })
        .catch(d =>{
            console.log("Loading Failed:", d)
        });        
    }

    return (
        <>
        <Header />
        <div className="registerContainer">
            <form className="registerForm" onSubmit={handleSubmit}>
                <label htmlFor="name">First Name:</label>
                <input className="contactFormInput" name="name" placeholder="Name" type="text"/> 

                <label htmlFor="surname">Surname:</label>
                <input className="contactFormInput" name="surname" placeholder="Surname" type="text"/>

                <label htmlFor="phone">Phone:</label>
                <input className="contactFormInput" name="phone" placeholder="Phone" type="tel"/>
                <input className="contactFormImageLoad" onChange={handleImage} type="file"/>
                <input className="contactFormInput" name="submit" type="submit" value="Get Appointment"/>
            </form>
        </div>
        </>
    )

}

export default Contact = React.memo(Contact);