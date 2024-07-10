import React, { useRef } from "react";
import './RecommendSlider.css';
import image1 from './resources/recWidget/giraffe.jpg';
import image2 from './resources/recWidget/elephant.jpg';
import image3 from './resources/recWidget/windmill.jpg';
import image4 from './resources/recWidget/windTurbine.jpg';

const images = [
    { imageSource: image1, imageAlt: "giraffe" },
    { imageSource: image2, imageAlt: "elephant" },
    { imageSource: image3, imageAlt: "windMill" },
    { imageSource: image4, imageAlt: "windTurbine" },
    { imageSource: image1, imageAlt: "giraffe2" }
];

function RecommendSlider() {
    let mouseHoldDown = false;
    let mouseStartPos;
    let mouseStopPos;
    let distance = 0;
    let scrollLeft;

    const cardContainer = useRef();

    function recSlideStart(data) {
        data.preventDefault();
        mouseHoldDown = true;
        mouseStartPos = data.pageX - cardContainer.current.offsetLeft;
        scrollLeft = cardContainer.current.scrollLeft;
    }

    function recSlideDrag(data) {
        if (!mouseHoldDown) return;
        mouseStopPos = data.pageX - cardContainer.current.offsetLeft;
        distance = mouseStopPos - mouseStartPos;
        cardContainer.current.scrollLeft = scrollLeft - distance;
    }

    function recSlideStop() {
        mouseHoldDown = false;
    }

    return (
        <div 
            ref={cardContainer} 
            onMouseDown={recSlideStart} 
            onMouseMove={recSlideDrag} 
            onMouseUp={recSlideStop} 
            onMouseLeave={recSlideStop} 
            className="cardContainer"
        >
            {images.map((data, key) => (
                <div key={key} className="card">
                    <img src={data.imageSource} alt={data.imageAlt} />
                </div>
            ))}
        </div>
    );
}

export default React.memo(RecommendSlider);
