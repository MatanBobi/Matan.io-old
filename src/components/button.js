import React from "react"
import styled from "styled-components"

const Button = props => (
    <ButtonWrapper props={props}>{props.children}</ButtonWrapper>
)

const ButtonWrapper = styled.button`
    display: ${props => props.props.display || "block"};
    text-align: center;
    box-sizing: border-box;
    text-decoration: none;
    padding: 10px 40px;
    cursor: pointer;
    text-transform: uppercase;
    border: none;
    transition: all 300ms ease-in-out;

    &:active {
        outline: none;
    }

    background: ${props => props.props.background || (props.theme.isDayMode ? '#5ebccf':'#7d9ef1')};
    color: ${props => props.props.color || "rgb(255, 255, 255)"};
    font-size: ${props => props.props.fontSize || "15px"};
    font-weight: ${props => props.props.fontWeight || "400"};
    border-radius: ${props => props.props.radius || "6px"};
    margin-top: ${props => props.props.marginTop};
    margin-bottom: ${props => props.props.marginBottom};
`

export default Button
