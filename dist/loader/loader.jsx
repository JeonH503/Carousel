var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import styled, { keyframes } from "styled-components";
import React from 'react';
var LoadingAnimation = keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n"], ["\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n"])));
var Loading = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    display: inline-block;\n    width: 80px;\n    height: 80px;\n\n    &:after { \n        content: \" \";\n        display: block;\n        width: 64px;\n        height: 64px;\n        margin: 8px;\n        border-radius: 50%;\n        border: 6px solid #cef;\n        border-color: #cef transparent #cef transparent;\n        animation: ", " 1.2s linear infinite;\n    }\n\n    &\n"], ["\n    display: inline-block;\n    width: 80px;\n    height: 80px;\n\n    &:after { \n        content: \" \";\n        display: block;\n        width: 64px;\n        height: 64px;\n        margin: 8px;\n        border-radius: 50%;\n        border: 6px solid #cef;\n        border-color: #cef transparent #cef transparent;\n        animation: ", " 1.2s linear infinite;\n    }\n\n    &\n"])), LoadingAnimation);
var Wrap = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    width:100%;\n    height:100%;\n    display:flex;\n    justify-content:center;\n    align-items:center;\n"], ["\n    width:100%;\n    height:100%;\n    display:flex;\n    justify-content:center;\n    align-items:center;\n"])));
function Loader() {
    return (<Wrap>
            <Loading />
        </Wrap>);
}
export default Loader;
var templateObject_1, templateObject_2, templateObject_3;
