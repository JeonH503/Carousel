var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useMemo, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Loader from "../../loader/loader";
var Button = styled.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n    border: 0;\n    background: rgb(0, 0, 0, 0.5);\n    height: 30%;\n    font-size: 20px;\n    font-weight: 300;\n    color:white;\n    float:", ";\n    min-height:30px;\n    display:none;\n    cursor:pointer;\n"], ["\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n    border: 0;\n    background: rgb(0, 0, 0, 0.5);\n    height: 30%;\n    font-size: 20px;\n    font-weight: 300;\n    color:white;\n    float:", ";\n    min-height:30px;\n    display:none;\n    cursor:pointer;\n"])), function (props) { return props.float; });
var ButtonFlex = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    display: flex;\n    height: 100%;\n    align-items: center;\n    justify-content:", ";\n    float:", ";\n"], ["\n    display: flex;\n    height: 100%;\n    align-items: center;\n    justify-content:", ";\n    float:", ";\n"])), function (props) { return props.justify; }, function (props) { return props.justify; });
var Buttons = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top:0px;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n    border: 0;\n\n    &:hover div button {\n        display:block;\n    }\n"], ["\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top:0px;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n    border: 0;\n\n    &:hover div button {\n        display:block;\n    }\n"])));
var CarouselWrap = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    position: relative;\n    overflow: hidden;\n    width: 100%;\n    height:100%;\n    user-select:none;\n"], ["\n    position: relative;\n    overflow: hidden;\n    width: 100%;\n    height:100%;\n    user-select:none;\n"])));
var Slides = styled.div.attrs(function (props) { return ({
    style: {
        transform: "translateX(".concat(props.slideSize * -props.slideIndex + props.dragPos, "px)"),
        transition: props.animating ? "transform 0.30s ease 0s" : "none"
    }
}); })(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    display: flex;\n"], ["\n    display: flex;\n"])));
var Slide = styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    flex: 0 0 100%;\n    min-height:30px;\n\n    & *{\n        width: 100%;\n    }\n"], ["\n    flex: 0 0 100%;\n    min-height:30px;\n\n    & *{\n        width: 100%;\n    }\n"])));
function Carousel(_a) {
    var children = _a.children;
    var _b = useState(false), animating = _b[0], setAnimating = _b[1];
    var _c = useState(1), slideIndex = _c[0], setSlideIndex = _c[1];
    var _d = useState(0), slideSize = _d[0], setSlideSize = _d[1];
    var _e = useState(0), clickedPos = _e[0], setClickedPos = _e[1]; //마우스 클릭한 좌표
    var _f = useState(0), dragPos = _f[0], setDragPos = _f[1]; //클릭된 상태로 드래그된 좌표
    var _g = useState(true), loading = _g[0], setLoading = _g[1];
    var slideRef = useRef();
    useEffect(function () {
        handleReSize();
        window.addEventListener('load', handleReSize);
        window.addEventListener('resize', handleReSize);
    }, []);
    var move = function (type) {
        if (animating)
            return;
        setAnimating(true);
        var index = 1;
        if (type === 'prev')
            index = -1;
        setSlideIndex(slideIndex + index);
        setTimeout(function () {
            setAnimating(false);
            relocation(slideIndex + index);
        }, 300);
    };
    // index가 맨끝 혹은 맨앞으로 이동될 경우 index및 translatex 이동
    var relocation = function (index) {
        if (children) {
            if (index === 0)
                setSlideIndex(Array.isArray(children) ? children.length : 1);
            else if (index === (Array.isArray(children) ? children.length + 1 : 2))
                setSlideIndex(1);
        }
    };
    // 브라우저 resize 크기 다시 계산
    var handleReSize = function () {
        if (slideRef.current) {
            setSlideSize(slideRef.current.getBoundingClientRect().width);
            setLoading(false);
        }
    };
    var onMouseMove = function (e) {
        if (clickedPos)
            setDragPos(e.clientX - clickedPos);
    };
    var onMouseDown = function (e) {
        if (!animating)
            setClickedPos(e.clientX);
    };
    var onMouseUp = function () {
        if (dragPos < -50)
            move('next');
        else if (dragPos > 50)
            move('prev');
        setClickedPos(0);
        setDragPos(0);
    };
    var onTouchStart = function (e) {
        if (!animating)
            setClickedPos(e.touches[0].clientX);
    };
    var onTouchMove = function (e) {
        if (clickedPos)
            setDragPos(e.touches[0].clientX - clickedPos);
    };
    var onTouchEnd = function () {
        if (dragPos < -50)
            move('next');
        else if (dragPos > 50)
            move('prev');
        setClickedPos(0);
        setDragPos(0);
    };
    var RenderSlides = useMemo(function () {
        // slides 맨앞, 맨뒤에 하나씩 더 추가
        var childrens;
        if (children) {
            var temp = [];
            if (Array.isArray(children))
                temp = __spreadArray(__spreadArray([children[children.length - 1]], children, true), [children[0]], false);
            else
                temp = [children, children, children];
            childrens = temp.map(function (e, i) {
                return <Slide key={i}>
                    {e}
                </Slide>;
            });
        }
        return <>{childrens}</>;
    }, [children]);
    return (<CarouselWrap onTouchEnd={onTouchEnd} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMove} onMouseLeave={onMouseUp} ref={slideRef}>
            {loading ?
            <Loader />
            :
                <>
                    <Slides slideSize={slideSize} slideIndex={slideIndex} dragPos={dragPos} animating={animating}>
                        {RenderSlides}
                    </Slides>
                    
                    <Buttons>
                        <ButtonFlex justify="left">
                            <Button float="left" onClick={function () { move('prev'); }}>&lt;</Button>
                        </ButtonFlex>
                        <ButtonFlex justify="right">
                            <Button float="right" onClick={function () { move('next'); }}>&gt;</Button>
                        </ButtonFlex>
                    </Buttons>
                </>}
            
            
        </CarouselWrap>);
}
export default Carousel;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
