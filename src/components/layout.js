import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import { rhythm, scale } from "../utils/typography"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    const blogPath = `${__PATH_PREFIX__}/blog/`
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
      <Wrapper>
        <div
          style={{
            display: 'flex',
            justifyContent:'center',
            alignItems: 'center',
            minWidth: '100vw',
            minHeight: '100vh',
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          <header>{header}</header>
          <main>{children}</main>
        </div>
        <Footer>
          © {new Date().getFullYear()} Matan Borenkraout
        </Footer>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  position: relative;
  max-height: 100vh;
  color: #878787;
  background-image: linear-gradient(330deg, #fffcd4, #98e0ef);
  overflow: hidden;
`

const Footer = styled.footer`
  margin: 24px;
`

export default Layout
