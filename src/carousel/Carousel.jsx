import {useState,useRef} from "react";


function Carousel () {
    const [slides, setSlides] = useState([
        {name:1,image:"/images/(1).webp"},
        {name:2,image:"/images/(2).webp"},
        {name:3,image:"/images/(3).webp"},
        {name:4,image:"/images/(4).webp"},
        {name:5,image:"/images/(5).webp"},
        {name:6,image:"/images/(6).webp"},
        {name:7,image:"/images/(7).webp"},
        {name:8,image:"/images/(8).webp"},
        {name:9,image:"/images/(9).webp"},
        {name:10,image:"/images/(10).webp"},
        {name:11,image:"/images/(11).webp"},
        {name:12,image:"/images/(12).webp"},
        {name:1,image:"/images/(1).webp"},
    ])
    const [tranlatex, setTranlatex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const slideRef = useRef(null)

    const next = () => {
        if(animating)
            return

        setAnimating(true)
        let size = slideRef.current.offsetWidth * 6
        setTranlatex(orgSize => orgSize-size)

        setTimeout(() => {
            setAnimating(false)
        },750)
    }

    const prev = () => {
        if(animating)
            return

        setAnimating(true)
        let size = slideRef.current.offsetWidth * 6
        setTranlatex(orgSize => orgSize+size)

        setTimeout(() => {
            setAnimating(false)
        },750)
    }

    return (
        <div className="carousel">
            <div style={{transform:`translateX(${tranlatex}px)`}} className={`slides ${animating ? "animating" : ""}`}>
                {slides.map(slide => <div ref={slideRef} className="slide" key={slide.name}>
                    <img className="thumnail" src={slide.image}></img>
                    <h4>{slide.name}</h4>
                </div>)}
            </div>
            <button onClick={prev}>prev</button>
            <button onClick={next}>next</button>
        </div>
    )
}

export default Carousel