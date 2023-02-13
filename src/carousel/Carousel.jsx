import {useState,useEffect,useRef} from "react";


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
    ])
    const [tranlatex, setTranlatex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [slideindex, setSlideIndex] = useState(1);
    const [slideSize, setSlideSize] = useState(0);

    const slideRef = useRef(null)

    useEffect(() => {
        setSlides([slides[slides.length-1],...slides,slides[0]])
        let size = slideRef.current.offsetWidth
        setTranlatex(-size)
        setSlideSize(size)
    },[])

    const move = (type) => {
        if(animating)
            return

        setAnimating(true)

        let index = 1
        if(type === 'prev')
            index = -1
        
        setSlideIndex(slideindex+index)
        setTranlatex(orgSize => orgSize+slideSize*-1*index)

        setTimeout(() => {
            setAnimating(false)
            relocation(slideindex+index)
        },750)
    }

    const relocation = (index) => {
        if(index === 0) {
            let size = slides.length-3
            setSlideIndex(size)
            setTranlatex(slideSize*-1*(size+1))
        } else if (index === slides.length-2) {
            let size = 1
            setSlideIndex(size)
            setTranlatex(slideSize*-1*size)
        }
    }

    return (
        <div className="carousel">
            <div style={{transform:`translateX(${tranlatex}px)`}} className={`slides ${animating ? "animating" : ""}`}>
                {slides.map(slide => <div ref={slideRef} className="slide">
                    <img className="thumnail" src={slide.image}></img>
                    <h4>{slide.name}</h4>
                    <h4>{slideindex}</h4>
                </div>)}
            </div>
            <button onClick={()=>{move('prev')}}>prev</button>
            <button onClick={()=>{move('next')}}>next</button>
        </div>
    )
}

export default Carousel