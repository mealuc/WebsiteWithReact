import React from 'react';
import './AboutUs.css';
import Header from './Header';
import Person from './resources/person.json';
import PersonImg1 from './resources/aboutUsImages/dummyicon1.jpg'
import PersonImg2 from './resources/aboutUsImages/dummyicon2.jpg'
import PersonImg3 from './resources/aboutUsImages/dummyicon3.png'

const personImages = [
    { imageData: PersonImg1 },
    { imageData: PersonImg2 },
    { imageData: PersonImg3 }
]

function AboutUs() {

    return (
        <>
            <Header />
            <div className="infoCardContainer">
                {Person.personData.map((data, key) => {
                    const image = personImages[key % personImages.length];
                    return (
                        <div className="infoCard" key={key}>
                            <div className="infoCardImage">
                                <img src={image.imageData} alt={`Profile of ${data.fullName}`} />
                            </div>
                            <div className="infoCardBody">
                                <h2>{data.fullName}</h2>
                                <p className="cardComment">{data.description}</p>
                                <div className="cardButton">Inspect</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>

    )
}

export default AboutUs = React.memo(AboutUs);