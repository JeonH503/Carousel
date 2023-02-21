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
    const [slideIndex, setSlideIndex] = useState(1);
    const [slideSize, setSlideSize] = useState(0);
    const [clickedPos, setClickedPos] = useState(0); //마우스 클릭한 좌표
    const [dragPos, setDragPos] = useState(0) //클릭된 상태로 드래그된 좌표

    const slideRef = useRef(null)

    useEffect(() => {
        // slides 맨앞, 맨뒤에 하나씩 더 추가
        setSlides([slides[slides.length-1], ...slides,slides[0]])
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
        
        setSlideIndex(slideIndex+index)

        setTimeout(() => {
            setAnimating(false)
            relocation(slideIndex+index)
        },500)
    }

    // index가 맨끝 혹은 맨앞으로 이동될 경우 index및 translatex 이동
    const relocation = (index) => {
        if(index === 0)
            setSlideIndex(slides.length-2)
        else if(index === slides.length-1)
            setSlideIndex(1)
    }

    // 브라우저 resize 크기 다시 계산
    const handleReSize = () => {
        setSlideSize(slideRef.current.getBoundingClientRect().width)
    }

    const onMouseMove = (e) => {
        if(clickedPos)
            setDragPos(e.clientX - clickedPos)
    }

    const onMouseDown = (e) => {
        if(!animating)
            setClickedPos(e.clientX)
    }

    const onMouseUp = () => {
        if(dragPos < -50)
            move('next')
        else if(dragPos > 50)
            move('prev')

        setClickedPos(0)
        setDragPos(0) 
    }

    return (
        <div onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMove} onMouseLeave={onMouseUp} ref={slideRef} className="carousel">
            <div style={{transform:`translateX(${slideSize * -slideIndex + dragPos}px)`}} className={`slides ${animating ? "animating" : ""}`}>
                {slides.map(slide => <div className="slide">
                    {/* TODO  이미지 크기 반응형 대응 필요*/}   
                    <img alt={slide.name} className="thumnail" src={slide.image}></img>
                </div>)}
            </div>
            <div className="buttons">
                {/* <div className="buttonsflex"> */}
                    <div className="buttonsflex left">
                        <button className="left" onClick={()=>{move('prev')}}>&lt;</button>
                    </div>
                    <div className="buttonsflex right">
                        <button className="right" onClick={()=>{move('next')}}>&gt;</button>
                    </div>
                {/* </div> */}
            </div>
        </div>
    )
}

export default Carousel