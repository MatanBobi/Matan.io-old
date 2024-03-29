// 3rd Party
import React, { useEffect } from "react"
import styled, { css, ThemeProvider } from "styled-components"
import { createGlobalStyle } from "styled-components"
// Components
import Footer from "./Footer.js"
import Toggle from "./Toggle"
// Hooks
import useToggle from "../hooks/useToggle"

// Utils
import { rhythm, scale } from "../utils/typography"

const GlobalStyle = createGlobalStyle`
    :root {
    --primary-color: ${({ theme }) =>
        theme.isDayMode ? "#5ebccf" : "#485f9c"};
    }
`

const Layout = ({ location, title, children }) => {
    const rootPath = `${__PATH_PREFIX__}/`
    const blogPath = `${__PATH_PREFIX__}/blog/`
    let currentTime = new Date().getHours()
    const [isDayMode, toggleDayMode] = useToggle(
        currentTime > 6 && currentTime < 20
    )

    useEffect(() => {
        const timer = setInterval(() => {
            currentTime = new Date().getHours()
            if (
                (currentTime > 6 && !isDayMode) ||
                (currentTime > 19 && isDayMode)
            ) {
                toggleDayMode()
            }
        }, 60000 * 60)
        return () => {
            clearInterval(timer)
        }
    }, [isDayMode, toggleDayMode])

    useEffect(() => {
        currentTime = new Date().getHours()
        if (currentTime > 6 && currentTime < 20 && !isDayMode) {
            toggleDayMode()
        }
    }, [])

    const theme = {
        isDayMode,
    }

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Wrapper>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minWidth: "100vw",
                        minHeight: "100vh",
                        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
                    }}
                >
                    <Toggle
                        toggleDayMode={() => toggleDayMode()}
                        isDayMode={isDayMode}
                    />
                    <main>{children}</main>
                </div>
                <Footer />
            </Wrapper>
        </ThemeProvider>
    )
}

const Wrapper = styled.div`
    position: relative;
    max-height: 100vh;
    color: #878787;
    transition: all 500ms ease-in-out;
    overflow: hidden;

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

export default Layout
