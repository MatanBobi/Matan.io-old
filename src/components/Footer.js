// 3rd Party
import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

// Icons
import MediumIcon from "../icons/med.svg"
import LinkedinIcon from "../icons/in.svg"
import TwitterIcon from "../icons/tw.svg"

const Footer = props => {
    return (
        <FooterWrapper>
            <StyledLink
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com/matan_bobi"
            >
                <Twitter />
            </StyledLink>
            <StyledLink
                target="_blank"
                rel="noopener noreferrer"
                href="https://medium.com/@matanbobi"
            >
                <Medium />
            </StyledLink>
            <StyledLink
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/matan-borenkraout-45b08742"
            >
                <Linkedin />
            </StyledLink>
        </FooterWrapper>
    )
}

Footer.propTypes = {}

const StyledLink = styled.a`
    box-shadow: none;
`

const FooterWrapper = styled.div`
    position: fixed;
    bottom: 20px;
    left: 50%;
    z-index: 5;
`

const Medium = styled(MediumIcon)`
    width: 32px;
    height: 32px;
    margin: 0 8px;
    cursor: pointer;
    fill: ${({ theme }) => (theme.isDayMode ? "#363636" : "#FFFFFF")};
    transition: all 300ms ease-in-out;
`

const Linkedin = styled(LinkedinIcon)`
    width: 32px;
    height: 32px;
    margin: 0 8px;
    cursor: pointer;
    fill: ${({ theme }) => (theme.isDayMode ? "#363636" : "#FFFFFF")};
    transition: all 300ms ease-in-out;
`

const Twitter = styled(TwitterIcon)`
    width: 32px;
    height: 32px;
    margin: 0 8px;
    cursor: pointer;
    fill: ${({ theme }) => (theme.isDayMode ? "#363636" : "#FFFFFF")};
    transition: all 300ms ease-in-out;
`

export default Footer
