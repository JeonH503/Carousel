import React,{useMemo,useState,useEffect,useRef,MouseEvent,TouchEvent} from "react";
import styled from "styled-components"; 

interface slideProps {
    slideSize:number;
    slideIndex:number;
    dragPos:number;
    animating:boolean;
}

const Button = styled.button<{float:string}>`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 0;
    background: rgb(0, 0, 0, 0.5);
    height: 30%;
    font-size: 20px;
    font-weight: 300;
    color:white;
    float:${(props)=>props.float};
    min-height:30px;
    display:none;
    cursor:pointer;
`

const ButtonFlex = styled.div<{justify:string}>`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content:${(props)=>props.justify};
    float:${(props)=>props.justify};
`

const Buttons = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top:0px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 0;

    &:hover div button {
        display:block;
    }
`

const CarouselWrap = styled.div`
    position: relative;
    overflow: hidden;
    width: 100%;
    height:100%;
    user-select:none;
    margin-bottom:20px;
`

const Slides = styled.div.attrs<slideProps>(props => ({
    style: {
        transform: `translateX(${props.slideSize * -props.slideIndex + props.dragPos}px)`,
        transition : props.animating ? "transform 0.30s ease 0s" : "none"
    }
}))<slideProps>`
    display: flex;
`

const Slide =styled.div`
    flex: 0 0 100%;
    min-height:30px;

    & *{
        width: 100%;
    }
` 

function Carousel ({children}:{children:React.ReactNode[] | React.ReactNode}) {
    const [animating, setAnimating] = useState(false);
    const [slideIndex, setSlideIndex] = useState(1);
    const [slideSize, setSlideSize] = useState(0);
    const [clickedPos, setClickedPos] = useState(0); //마우스 클릭한 좌표
    const [dragPos, setDragPos] = useState(0) //클릭된 상태로 드래그된 좌표

    const slideRef = useRef() as React.RefObject<HTMLDivElement> 

    useEffect(() => {
        if(slideRef.current)
            setSlideSize(slideRef.current.getBoundingClientRect().width)

        // window resize event 추가
        window.addEventListener('resize', handleReSize)
    },[])

    const move = (type:string) => {
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
        },300)
    }

    // index가 맨끝 혹은 맨앞으로 이동될 경우 index및 translatex 이동
    const relocation = (index:number) => {
        if(children) {
            if(index === 0)
                setSlideIndex(Array.isArray(children) ? children.length : 1)
            else if(index === (Array.isArray(children) ? children.length+1 : 2))
                setSlideIndex(1)
        }
    }

    // 브라우저 resize 크기 다시 계산
    const handleReSize = () => {
        if(slideRef.current)
            setSlideSize(slideRef.current.getBoundingClientRect().width)
    }

    const onMouseMove = (e:MouseEvent) => {
        if(clickedPos)
            setDragPos(e.clientX - clickedPos)
    }

    const onMouseDown = (e:MouseEvent) => {
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

    const onTouchStart = (e:TouchEvent) => {
        if(!animating)
            setClickedPos(e.touches[0].clientX)
    }

    const onTouchMove = (e:TouchEvent) => {
        if(clickedPos)
            setDragPos(e.touches[0].clientX - clickedPos)   
    }

    const onTouchEnd = () => {
        if(dragPos < -50)
            move('next')
        else if(dragPos > 50)
            move('prev')

        setClickedPos(0)
        setDragPos(0) 
    }

    const RenderSlides = useMemo(() => {
        // slides 맨앞, 맨뒤에 하나씩 더 추가
        let childrens
        if(children) {
            let temp = []
            if(Array.isArray(children))
                temp = [children[children.length-1], ...children,children[0]]
            else
                temp = [children,children,children]
            childrens = temp.map((e,i) => {
                return <Slide key={i}>
                    {e}
                </Slide>
            })
        }

        return <>{childrens}</>
    },[children])

    return (
        <CarouselWrap onTouchEnd={onTouchEnd} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMove} onMouseLeave={onMouseUp} ref={slideRef}>
            <Slides slideSize={slideSize} slideIndex={slideIndex} dragPos={dragPos} animating={animating}>
                {RenderSlides}
                {/* <Slide>d</Slide> */}
            </Slides>
            
            <Buttons>
                <ButtonFlex justify="left">
                    <Button float="left" onClick={()=>{move('prev')}}>&lt;</Button>
                </ButtonFlex>
                <ButtonFlex justify="right">
                    <Button float="right" onClick={()=>{move('next')}}>&gt;</Button>
                </ButtonFlex>
            </Buttons>
        </CarouselWrap>

    )
}

export default Carousel