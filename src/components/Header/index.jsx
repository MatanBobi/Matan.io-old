// 3rd Party
import React, { useContext } from "react"
import PropTypes from "prop-types"
import styled, { ThemeContext } from "styled-components"

// Icons
import lightIcon from "../../icons/favicon-light.png"
import darkIcon from "../../icons/favicon-dark.png"

const HeaderWrapper = styled.header`
    padding: 10px 15px;
    position: fixed;
    top: ${({ isVisible }) => (isVisible ? 0 : "-50px")};
    height: 50px;
    width: 100%;
    background: #ffffff;

    transition: all 500ms ease-in-out;
    z-index: 2;
    display: flex;
`

const FullNamePositioner = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    z-index: 2;
    position: fixed;
    padding: 150px;
    top: ${({ isVisible }) => (isVisible ? "90px" : "50%")};
    left: ${({ isVisible }) => (isVisible ? "0" : "50%")};
    transform: translate(-50%, -50%);
    transition: all 500ms ease-in-out;
`

const FullName = styled.div`
    font-family: "Montserrat", sans-serif;
    color: var(--colors-primary);
    font-size: 32px;
    font-weight: 900;
    z-index: 1;
    transition: color 500ms ease-in-out;
    margin-left: 400px;
    margin-bottom: 110px;
`

const SiteIcon = styled.img`
    width: 30px;
    height: 30px;
`

export const Header = ({ isVisible }) => {
    const theme = useContext(ThemeContext)
    return (
        <HeaderWrapper isVisible={isVisible}>
            <SiteIcon src={theme.isDayMode ? lightIcon : darkIcon} />
            <FullNamePositioner isVisible={isVisible}>
                <FullName>Matan Borenkraout</FullName>
            </FullNamePositioner>
        </HeaderWrapper>
    )
}

Header.propTypes = {
    isVisible: PropTypes.bool,
}
