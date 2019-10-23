import React from "react"
import styled from "styled-components"

const Label = styled.label`
    position: absolute;
    top: 10%;
    left: 50%;
    display: inline-block;
    width: 72px;
    height: 40px;
    z-index: 2;
    transform: translate(-50%);
    
    input {
        opacity: 0;
        width: 0;
        height: 0;
    }
`

const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #0f142e;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;

    :before {
        position: absolute;
        border-radius: 50%;
        content: "";
        height: 32px;
        width: 32px;
        left: 4px;
        bottom: 4px;
        background-color: #4a5d91;
        -webkit-transition: 0.5s;
        transition: 0.5s;
    }
`
const String = styled.span`
    height: 10px;
    width: 1px;
`
const Checkbox = styled.input`
:checked + ${Slider} {
  background-color: #74bbcb;
}

:focus + ${Slider} {
  box-shadow: 0 0 1px #2196F3;
}

:checked + ${Slider}:before {
  -webkit-transform: translateX(32px);
  -ms-transform: translateX(32px);
  transform: translateX(32px);
  background-color: #fffbd7;
  box-shadow: 0px 0px 16px 5px rgba(255,251,215,0.75);
}
`
const Toggle = ({toggleNightMode, isDayMode}) => {
    return (
        <Label>
            <Checkbox type="checkbox" onChange={toggleNightMode} checked={isDayMode}/>
            <Slider />
            <String />
        </Label>
    )
}

export default Toggle
