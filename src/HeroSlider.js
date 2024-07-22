import React, { useEffect, useRef, useState } from 'react';
import './HeroSlider.css';
import image1 from './resources/heroSlider/1.jpg';
import image2 from './resources/heroSlider/2.jpg';
import image3 from './resources/heroSlider/3.jpeg';

function HeroSlider() {
    //Hero Slider 
    const [slideIndex, setSlideIndex] = useState(0);
    const [focusIndex, setFocusIndex] = useState(0);

    const slides = [
        { slideNumber: 0, slideDescription: "Slide One", slideImage: image1 },
        { slideNumber: 1, slideDescription: "Slide Two", slideImage: image2 },
        { slideNumber: 2, slideDescription: "Slide Three", slideImage: image3 }
    ]
    const slideContextRef = useRef(null);
    const slideElementRef = useRef([]);
    const paginationRefs = useRef([]);

    useEffect(() => {
        changeSlide(slideIndex);
        if (paginationRefs.current[slideIndex]) {
            paginationRefs.current[slideIndex].focus();
        }
    }, [slideIndex])

    function changeIndex(index) {
        setSlideIndex(() => {
            const newIndex = (index > slides.length - 1) ? 0 : (index < 0) ? slides.length - 1 : index;
            changeSlide(newIndex);
            return newIndex;
        });
    }

    function changeFocus(index){
        setFocusIndex(index);
    }

    function changeSlide(newIndex) {
        slideContextRef.current.style.left = `-${newIndex * slideContextRef.current.clientWidth}px`;
    }

    return (
        <div className="slideContainer" >
            <button className="arrows prev" onClick={() => changeIndex(slideIndex - 1)}>&#10094;</button>
            <button className="arrows next" onClick={() => changeIndex(slideIndex + 1)}>&#10095;</button>
            <ul className="paginationContainer">
                {slides.map((element, index) => {
                    return (
                        <li key={index}>
                            <input
                                ref={ref => paginationRefs.current[index] = ref}
                                className={`paginationInput ${index === focusIndex ? 'focused' : ''}`}
                                type="button"
                                role="tab"
                                onClick={() => changeIndex(index)} 
                                onFocus={() => changeFocus(index)}
                                />
                        </li>
                    )
                })}
            </ul>
            <div className="slideContext" ref={slideContextRef}>
                {slides.map((slide, key) => {
                    return (
                        <div key={key} className="slide" ref={ref => slideElementRef.current[key] = ref}>
                            <div className="slideNumber">{slide.slideNumber + 1}</div>
                            <img src={slide.slideImage} alt={slide.slideDescription} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default React.memo(HeroSlider);