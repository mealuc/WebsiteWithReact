import './Contact.css'
import Header from './Header';
import React, { useState } from 'react';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        phone: '',
        image: null
    });
    const [imageCollection, setImageCollection] = useState([]);
    const [imageChecked, setImageChecked] = useState(false);

    function handleChange(data) {
        const { name, value, type, files } = data.target
        if(type === "file"){
            setFormData(prevData => ({
                ...prevData,
                 [name]: files[0]
            }));
        }
        else{
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }))
        }

    }

    function handleSubmit(e) {
        e.preventDefault();
        const formDataToSend = new FormData();
        if (formData.image) {

            formDataToSend.append('name', formData.name)
            formDataToSend.append('surname', formData.surname)
            formDataToSend.append('phone', formData.phone)
            formDataToSend.append('file', formData.image)

            fetch("http://localhost:5000/postForm", {
                method: 'POST',
                body: formDataToSend,
            })
                .then(response => {
                    if (!response.ok) {
                        return response.text().then(text => { throw new Error(text) });
                    }
                    return response.json();
                })
                .then(d => {
                    console.log("Succesfully Loaded:", d)
                    setFormData({
                        name: "",
                        surname: "",
                        phone: "",
                        image: null
                    });
                })
                .catch(d => {
                    console.log("Loading Failed from FE:", d)
                });
        }
        else {
            alert("Please choose image!");
        }
    }

    function getImages() {
        setImageChecked(true);
        fetch("http://localhost:5000/getImages")
            .then(res => res.json())
            .then(data => {
                setImageCollection(data)
            })
            .catch(e => {
                console.log("Error occured when fetching images", e)
            });
    }

    return (
        <>
            <Header />
            <div className="registerContainer">
                <form className="registerForm" onSubmit={handleSubmit}>
                    <label htmlFor="name">First Name:</label>
                    <input
                        className="contactFormInput"
                        name="name"
                        placeholder="Name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <label htmlFor="surname">Surname:</label>
                    <input
                        className="contactFormInput"
                        name="surname"
                        placeholder="Surname"
                        type="text"
                        value={formData.surname}
                        onChange={handleChange}
                    />
                    <label htmlFor="phone">Phone:</label>
                    <input
                        className="contactFormInput"
                        name="phone"
                        placeholder="Phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <input
                        className="contactFormImageLoad"
                        name="image"
                        onChange={handleChange}
                        type="file"
                    />
                    <input
                        className="contactFormInput"
                        name="getImage"
                        type="button"
                        onClick={getImages}
                        value="Get Images"
                    />
                    <input
                        className="contactFormInput"
                        name="submit"
                        type="submit"
                        value="Get Appointment"
                    />
                    <div className='imageContainer'>
                        {imageCollection && imageCollection.length > 0 ? (
                            imageCollection.map((image) => {
                                return (
                                    <div key={image.filename}>
                                        <img src={image.image} alt={image.filename} className="uploadedImages" />
                                    </div>
                                )
                            })
                        ) : !imageChecked ? (
                            ''
                        ) : (
                            'No images found'
                        )}
                    </div>
                </form>
            </div>
        </>
    )

}

export default Contact = React.memo(Contact);