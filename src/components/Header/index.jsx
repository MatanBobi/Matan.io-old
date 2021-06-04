// 3rd Party
import React, { useContext } from "react"
import PropTypes from "prop-types"
import styled, { ThemeContext } from "styled-components"
import { Link } from "gatsby"

// Components
import Toggle from "../Toggle"

// Icons
import lightIcon from "../../icons/favicon-light.png"
import darkIcon from "../../icons/favicon-dark.png"

const HeaderWrapper = styled.header`
    padding: 10px 15px;
    position: absolute;
    top: ${({ isVisible }) => (isVisible ? 0 : "-60px")};
    height: 50px;
    width: 100%;
    transition: all 500ms ease-in-out;
    z-index: 2;
    display: flex;
    align-items: center;
`

const FullNameLink = styled(Link)`
    font-family: "Montserrat", sans-serif;
    color: var(--colors-primary);
    font-size: 16px;
    margin: 0 8px;
    font-weight: 700;
    z-index: 1;
    transition: color 500ms ease-in-out;
    box-shadow: none;
`

const SiteIcon = styled.img`
    width: 30px;
    height: 30px;
    margin-bottom: 0;
`

export const Header = ({ isVisible }) => {
    const theme = useContext(ThemeContext)
    return (
        <HeaderWrapper isVisible={isVisible}>
            <SiteIcon src={theme.isDayMode ? lightIcon : darkIcon} />
            <FullNameLink to="/">Matan Borenkraout</FullNameLink>
            <Toggle
                size="small"
                toggleDayMode={() => theme.toggleDayMode()}
                isDayMode={theme.isDayMode}
            />
        </HeaderWrapper>
    )
}

Header.propTypes = {
    isVisible: PropTypes.bool,
}
