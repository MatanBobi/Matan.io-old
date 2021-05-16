// 3rd Party
import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

// Icons
import MediumIcon from "../icons/med.svg"
import LinkedinIcon from "../icons/in.svg"
import TwitterIcon from "../icons/twitter.svg"
import GithubIcon from "../icons/github.svg"

const Footer = props => {
    return (
        <FooterWrapper>
            <StyledLink
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com/matanbobi"
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
                href="https://github.com/matanbobi"
            >
                <Github />
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
    margin: 0 8px;
`

const FooterWrapper = styled.div`
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    z-index: 5;
`

const Medium = styled(MediumIcon)`
    width: 32px;
    height: 32px;
    cursor: pointer;
    fill: var(--colors-primary);
    transition: all 300ms ease-in-out;
`

const Linkedin = styled(LinkedinIcon)`
    width: 32px;
    height: 32px;
    cursor: pointer;
    fill: var(--colors-primary);
    transition: all 300ms ease-in-out;
`

const Twitter = styled(TwitterIcon)`
    width: 32px;
    height: 32px;
    cursor: pointer;
    fill: var(--colors-primary);
    transition: all 300ms ease-in-out;
`

const Github = styled(GithubIcon)`
    width: 32px;
    height: 36px;
    cursor: pointer;
    fill: var(--colors-primary);
    transition: all 300ms ease-in-out;
`

export default Footer
