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
    const [animating, setAnimating] = useState(false);
    const [slideindex, setSlideIndex] = useState(1);
    const [slideSize, setSlideSize] = useState(0);

    const slideRef = useRef(null)

    useEffect(() => {
        // slides 맨앞, 맨뒤에 하나씩 더 추가
        setSlides([slides[slides.length-1],...slides,slides[0]])
        setSlideSize(slideRef.current.getBoundingClientRect().width)

        // window resize event 추가
        window.addEventListener('resize', handleReSize)
    },[])

    const move = (type) => {
        if(animating)
            return

        setAnimating(true)

        let index = 1
        if(type === 'prev')
            index = -1
        
        setSlideIndex(slideindex+index)

        setTimeout(() => {
            setAnimating(false)
            relocation(slideindex+index)
        },500)
    }

    // index가 맨끝 혹은 맨앞으로 이동될 경우 index및 translatex 이동
    const relocation = (index) => {
        if(index === 0)
            setSlideIndex(slides.length-2)
        else if(index === slides.length-1)
            setSlideIndex(1)
    }

    const handleReSize = () => {
        setSlideSize(slideRef.current.getBoundingClientRect().width)
    }

    return (
        <div ref={slideRef} className="carousel">
            <div style={{transform:`translateX(${slideSize * -slideindex}px)`}} className={`slides ${animating ? "animating" : ""}`}>
                {slides.map(slide => <div className="slide">
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