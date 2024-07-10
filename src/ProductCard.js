import React, { useEffect, useRef, useState } from "react";
import './ProductCard.css';
import image1 from './resources/productCartImages/elephant.jpg';
import image2 from './resources/productCartImages/giraffe.jpg';
import image3 from './resources/productCartImages/windmill.jpg';

const productImages = [
    { imageSource: image1, imageAlt: "elephant" },
    { imageSource: image2, imageAlt: "giraffe" },
    { imageSource: image3, imageAlt: "windmill" }
]

function ProductCard() {

    const productCardContainer = useRef(null);
    const productCardContext = useRef(null);
    const [productCardPerWidth, setProductCardPerWidth] = useState(0);

    useEffect(() => {
        if (productCardContainer.current && productCardContext.current) {
            setProductCardPerWidth( productCardContainer.current.clientWidth / productImages.length );
        }
    }, []);
    
    function productCardSlide(event) {
        event.preventDefault();
        const leftOffset = productCardContainer.current.offsetLeft; 
        const position = event.pageX - leftOffset; 
        for (let i = 0; i < productImages.length; i++) {
            const start = i * productCardPerWidth; 
            const end = start + productCardPerWidth; 

            if (position >= start && position <= end) {
                productCardContext.current.style.left = `-${i * productCardContainer.current.clientWidth}px`;
                break;
            }
        }
    }


    return (
        <div className="productCardContainer" ref={productCardContainer} onMouseMove={productCardSlide}>
            <div className="card-context" ref={productCardContext}>
                {productImages.map((data, key) => {
                    return <img src={data.imageSource} alt={data.imageAlt} key={key} />
                })}
            </div>
        </div>
    )
}

export default React.memo(ProductCard);