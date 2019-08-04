// 3rd Party
import React from "react"
import { Link } from "gatsby"
import styled, { css, ThemeProvider } from "styled-components"

// Components
import Footer from "./Footer.js"

// Hooks
import useToggle from '../hooks/useToggle';

// Utils
import { rhythm, scale } from "../utils/typography"

const Layout = ({location, title, children}) => {
    const rootPath = `${__PATH_PREFIX__}/`
    const blogPath = `${__PATH_PREFIX__}/blog/`
    const currentTime = new Date().getHours()
    const [isDayMode, toggleDayMode] = useToggle(
        currentTime > 6 && currentTime < 20
    )
    const theme = {
        isDayMode
    }

    let header

    if (location.pathname === rootPath || location.pathname === blogPath) {
        header = (
            <h1
                style={{
                    ...scale(1.5),
                    marginBottom: rhythm(1.5),
                    marginTop: 0,
                }}
            >
                {/*<Link*/}
                {/*style={{*/}
                {/*boxShadow: `none`,*/}
                {/*textDecoration: `none`,*/}
                {/*color: `inherit`,*/}
                {/*}}*/}
                {/*to={location.pathname === blogPath ? `/blog/` : `/`}*/}
                {/*>*/}
                {/*{title}*/}
                {/*</Link>*/}
            </h1>
        )
    } else {
        header = (
            <h3
                style={{
                    fontFamily: `Montserrat, sans-serif`,
                    marginTop: 0,
                }}
            >
                <Link
                    style={{
                        boxShadow: `none`,
                        textDecoration: `none`,
                        color: `inherit`,
                    }}
                    to={`/blog/`}
                >
                    {title}
                </Link>
            </h3>
        )
    }
    return (
        <ThemeProvider theme={theme}>
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
                <button onClick={() => toggleDayMode()}>Toggle</button>
                <header>{header}</header>
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
    ${({theme}) => {
        return theme.isDayMode
            ? css`
                  background-image: linear-gradient(330deg, #fffcd4, #98e0ef);
              `
            : css`
                  background-image: radial-gradient(
                      circle at 60% 50%,
                      #638aba,
                      #222e54
                  );
              `
    }};
    overflow: hidden;
`

export default Layout
