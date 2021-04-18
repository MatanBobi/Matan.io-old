// 3rd Party
import React, { useEffect } from "react"
import styled, {
    css,
    ThemeProvider,
    keyframes,
    createGlobalStyle,
} from "styled-components"
import { MDXProvider } from "@mdx-js/react"

// Components
import Footer from "./Footer.js"
import Toggle from "./Toggle"
import { components } from "./Markdown"

// Hooks
import useToggle from "../hooks/useToggle"

// Utils
import { rhythm } from "../utils/typography"
import GroundOne from "../icons/ground-1.svg"
import GroundTwo from "../icons/ground-2.svg"
import GroundThree from "../icons/ground-3.svg"
import GroundFour from "../icons/ground-4.svg"
import Stars from "../icons/stars.svg"
import SunIcon from "../icons/sun.svg"
import CloudIcon from "../icons/cloud.svg"
import MoonIcon from "../icons/moon.svg"

const setModeByTime = (setLightMode, setDarkMode, isDayMode) => {
    const currentTime = new Date().getHours()
    if (currentTime > 6 && currentTime < 20 && !isDayMode) {
        setLightMode()
        return
    } else if ((currentTime <= 6 || currentTime >= 20) && isDayMode) {
        setDarkMode()
        return
    }
}

const Layout = ({ location, title, children }) => {
    const blogPath = `${__PATH_PREFIX__}/blog/`
    let currentTime = new Date().getHours()
    const [isDayMode, toggleDayMode, setLightMode, setDarkMode] = useToggle(
        currentTime > 6 && currentTime < 20
    )

    useEffect(() => {
        const timer = setInterval(() => {
            setModeByTime(setLightMode, setDarkMode, isDayMode)
        }, 60000 * 60)
        return () => {
            clearInterval(timer)
        }
    }, [isDayMode, setLightMode, setDarkMode])

    useEffect(() => {
        document.body.dataset.theme = isDayMode ? "light" : "dark"
    }, [isDayMode])

    useEffect(() => {
        setModeByTime(setLightMode, setDarkMode, isDayMode)
    }, [])

    const theme = {
        isDayMode,
    }

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Wrapper>
                <MDXProvider components={components}>
                    <div
                        style={{
                            minWidth: "100vw",
                            minHeight: "100vh",
                            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
                        }}
                    >
                        <Toggle
                            size={
                                location.pathname.includes(blogPath)
                                    ? "small"
                                    : "big"
                            }
                            toggleDayMode={() => toggleDayMode()}
                            isDayMode={isDayMode}
                        />
                        <Clouds index={1} />
                        <Clouds index={2} />
                        <Clouds index={3} />
                        <Clouds index={4} />
                        <Clouds index={5} />
                        <Sun />
                        <Moon />
                        <StyledMain>{children}</StyledMain>
                        <GroundOneStyled />
                        <GroundTwoStyled />
                        <GroundThreeStyled />
                        <GroundFourStyled />
                        <StarsStyled />
                    </div>
                    <Footer />
                </MDXProvider>
            </Wrapper>
        </ThemeProvider>
    )
}

const GlobalStyles = createGlobalStyle`
    body[data-theme='light'] {
        --colors-primary: #24292e;
        --colors-secondary: #6a737d;
        --colors-background: rgba(255,255,255,0.7)
    }
    body[data-theme='dark'] {
        --colors-primary: #FFFFFF;
        --colors-secondary: #98e0ef;
        --colors-background: rgba(255,255,255,0.7)
    }
`

const Wrapper = styled.div`
    position: relative;
    color: #878787;
    transition: all 500ms ease-in-out;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: opacity 700ms ease-in-out;
        background-image: linear-gradient(330deg, #fffcd4, #98e0ef);
        ${({ theme }) => {
            return theme.isDayMode
                ? css`
                      opacity: 1;
                  `
                : css`
                      opacity: 0;
                  `
        }}
    }
    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: opacity 700ms ease-in-out;
        background-image: radial-gradient(circle at 60% 50%, #638aba, #222e54);
        ${({ theme }) => {
            return theme.isDayMode
                ? css`
                      opacity: 0;
                  `
                : css`
                      opacity: 1;
                  `
        }}
    }
`

const StyledMain = styled.main`
    position: relative;
    z-index: 5;
    max-width: 1200px;
    padding: 0 20px;
    margin: 0 auto;
`

const GroundOneStyled = styled(GroundOne)`
    width: 2469px;
    height: 786px;
    position: fixed;
    top: 82%;
    left: -25%;
    z-index: 1;
    transition: fill 500ms ease-in-out;
    fill: ${({ theme }) =>
        theme.isDayMode ? "rgba(94,188,207, 0.15)" : "#4C64A0"};

    @media (max-width: 600px) {
        width: 618px;
        height: 196px;
    }
`

const GroundFourStyled = styled(GroundFour)`
    width: 1958px;
    height: 537px;
    position: fixed;
    top: 91%;
    left: -22%;
    z-index: 4;
    transition: fill 500ms ease-in-out;
    fill: ${({ theme }) =>
        theme.isDayMode ? "rgba(94,188,207, 0.15)" : "#293060"};

    @media (max-width: 600px) {
        width: 489px;
        height: 268px;
        top: 83%;
    }
`

const GroundTwoStyled = styled(GroundTwo)`
    width: 2204px;
    height: 592px;
    position: fixed;
    top: 87%;
    left: -7%;
    z-index: 2;
    transition: fill 500ms ease-in-out;
    fill: ${({ theme }) =>
        theme.isDayMode ? "rgba(94,188,207, 0.15)" : "#2f488c"};

    @media (max-width: 600px) {
        width: 551px;
        height: 148px;
        top: 88%;
        left: -6%;
    }
`

const GroundThreeStyled = styled(GroundThree)`
    width: 2225px;
    height: 601px;
    position: fixed;
    top: 87%;
    left: 37%;
    z-index: 3;
    transition: fill 500ms ease-in-out;
    fill: ${({ theme }) =>
        theme.isDayMode ? "rgba(94,188,207, 0.15)" : "#485f9c"};

    @media (max-width: 600px) {
        width: 556px;
        height: 150px;
        top: 92%;
        left: 32%;
    }
`

const StarsStyled = styled(Stars)`
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: 750ms opacity ease-in-out;
    @media (max-width: 600px) {
        width: 200%;
    }

    ${({ theme }) => {
        return theme.isDayMode
            ? css`
                  opacity: 0;
                  visibility: hidden;
              `
            : css`
                  visibility: visible;
                  opacity: 0.75;
              `
    }};
`

const animateRightToLeft = keyframes`
  0%{
    transform: translateX(0);
  }
  100%{
      transform: translateX(0);      
  }
`

const Clouds = styled(CloudIcon)`
    position: fixed;
    //animation: ${animateRightToLeft} 500000ms ease-in infinite;
    transition: all 500ms ease-in-out;
    ${({ theme }) => {
        return theme.isDayMode
            ? css`
                  opacity: 1;
              `
            : css`
                  opacity: 0;
              `
    }};
    ${({ index }) => {
        switch (index) {
            case 1:
                return css`
                    width: 167px;
                    height: 102px;
                    top: 200px;
                    left: 190px;

                    @media (max-width: 600px) {
                        width: 84px;
                        height: 51px;
                        top: 10%;
                        left: 10%;
                    }
                `
            case 2:
                return css`
                    width: 313px;
                    height: 191px;
                    top: 170px;
                    left: 274px;
                    opacity: 0.3;

                    @media (max-width: 600px) {
                        width: 157px;
                        height: 96px;
                        top: 5%;
                        left: 15%;
                    }
                `
            case 3:
                return css`
                    width: 176px;
                    height: 107px;
                    top: 44px;
                    left: 491px;
                    opacity: 0.4;
                    @media (max-width: 600px) {
                        width: 88px;
                        height: 54px;
                        top: 2%;
                        left: 70%;
                    }
                `
            case 4:
                return css`
                    width: 431px;
                    height: 263px;
                    top: 64px;
                    left: 65%;
                    opacity: 0.3;
                    @media (max-width: 600px) {
                        width: 216px;
                        height: 132px;
                        top: 1%;
                        left: 85%;
                    }
                `
            case 5:
                return css`
                    width: 203px;
                    height: 124px;
                    top: 218px;
                    left: 80%;
                    opacity: 0.5;
                    @media (max-width: 600px) {
                        display: none;
                    }
                `
        }
    }};
`

const Sun = styled(SunIcon)`
    position: fixed;
    z-index: 1;
    height: 250px;
    width: 250px;
    fill: #fffcd4;
    transition: all 750ms ease-in-out;
    ${({ theme }) => {
        return theme.isDayMode
            ? css`
                  left: -100px;
                  top: -100px;
              `
            : css`
                  left: -260px;
                  top: 48px;
              `
    }};

    @media (max-width: 600px) {
        height: 200px;
        width: 200px;
        ${({ theme }) => {
            return theme.isDayMode
                ? css`
                      left: -80px;
                      top: -80px;
                  `
                : css`
                      left: -60%;
                      top: 48px;
                  `
        }}
    }
`

const Moon = styled(MoonIcon)`
    position: fixed;
    z-index: 1;
    height: 140px;
    width: 140px;
    filter: drop-shadow(0 0 60px rgba(255, 255, 255, 0.95));
    transition: all 700ms ease-in-out;

    ${({ theme }) => {
        return theme.isDayMode
            ? css`
                  right: -150px;
                  top: 34%;
              `
            : css`
                  right: 4%;
                  top: 5%;
              `
    }};

    @media (max-width: 600px) {
        height: 100px;
        width: 100px;
        ${({ theme }) => {
            return theme.isDayMode
                ? css`
                      right: -40%;
                      top: 30%;
                  `
                : css`
                      right: 4%;
                      top: 2%;
                  `
        }};
    }
`

export default Layout
