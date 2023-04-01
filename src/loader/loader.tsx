import styled,{keyframes} from "styled-components"
import React from 'react';

const LoadingAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Loading = styled.div`
    display: inline-block;
    width: 80px;
    height: 80px;

    &:after { 
        content: " ";
        display: block;
        width: 64px;
        height: 64px;
        margin: 8px;
        border-radius: 50%;
        border: 6px solid #cef;
        border-color: #cef transparent #cef transparent;
        animation: ${LoadingAnimation} 1.2s linear infinite;
    }

    &
`

const Wrap = styled.div`
    width:100%;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
`

function Loader() {
    return(
        <Wrap>
            <Loading/>
        </Wrap>
    )
}

export default Loader