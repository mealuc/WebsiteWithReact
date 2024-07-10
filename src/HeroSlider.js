import React, { useRef, useState } from 'react';
import './HeroSlider.css';
import image1 from './resources/heroSlider/1.jpg';
import image2 from './resources/heroSlider/2.jpg';
import image3 from './resources/heroSlider/3.jpeg';

function HeroSlider() {
    //Hero Slider 
    const [slideIndex, setSlideIndex] = useState(0);
    let slideElementRef = useRef([]);
    const slides = [
        { slideNumber: "1", slideDescription: "Slide One", slideImage: image1 },
        { slideNumber: "2", slideDescription: "Slide Two", slideImage: image2 },
        { slideNumber: "3", slideDescription: "Slide Three", slideImage: image3 }
    ]

    function changeSlides(index) {
        setSlideIndex((slideIndex) => ( slideIndex + index + slides.length) % slides.length)
    }

    return (
        <div className="slideContainer">
            <button className="arrows prev" onClick={() => changeSlides(-1)}>&#10094;</button>
            <button className="arrows next" onClick={() => changeSlides(1)}>&#10095;</button>
            {slides.map((slide, key) => {
                return (
                    <div key={key} ref={ref => slideElementRef.current[key] = ref}
                        className={`slide ${key == slideIndex ? 'active' : ''}`}>
                        <div className="slideNumber">{slide.slideNumber}</div>
                        <div className="slideDescription">{slide.slideDescription}</div>
                        <img src={slide.slideImage} alt={slide.slideDescription} />
                    </div>
                )
            })}

        </div>
    )
}

export default HeroSlider = React.memo(HeroSlider);