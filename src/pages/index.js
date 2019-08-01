import React, { Fragment } from "react"
import Image from "gatsby-image"
import { graphql, Link, StaticQuery } from "gatsby"
import styled, { keyframes, css } from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"
import SunIcon from "../../content/assets/sun.svg"
import CloudIcon from "../../content/assets/cloud.svg"

class IndexPage extends React.Component {
    render() {
        const siteTitle = "Hello! I'm Matan."

        return (
            <Layout location={this.props.location} title={siteTitle}>
                <StaticQuery
                    query={indexQuery}
                    render={data => {
                        const { author, social } = data.site.siteMetadata

                        return (
                            <Fragment>
                                <Clouds index={1} />
                                <Clouds index={2} />
                                <Clouds index={3} />
                                <Clouds index={4} />
                                <Clouds index={5} />
                                <Sun />
                                <SEO
                                    title="Home"
                                    keywords={[
                                        `blog`,
                                        `frontend developer`,
                                        `javascript`,
                                        `react`,
                                    ]}
                                />
                                <IndexWrapper>
                                    <ImageWrapper>
                                        <Image
                                            fixed={
                                                data.avatar.childImageSharp
                                                    .fixed
                                            }
                                            alt={author}
                                            style={{
                                                maxWidth: 200,
                                                maxHeight: 200,
                                                transform: `rotate(16deg)`,
                                                borderRadius: `30px`,
                                                boxShadow: `70px 70px 70px 5px rgba(94,188,207,0.25)`,
                                                margin: `0 100px`,
                                            }}
                                            imgStyle={{
                                                top: -18,
                                                left: -16,
                                                minWidth: 240,
                                                minHeight: 240,
                                                transform: `rotate(-16deg)`,
                                            }}
                                        />
                                    </ImageWrapper>
                                    <DataContainer>
                                        <FullName>Matan Borenkraout</FullName>
                                        <Description>
                                            Frontend developer
                                        </Description>
                                        <StyledLink to="/blog/">
                                            <Button
                                                marginTop="35px"
                                                background="#5ebccf"
                                                radius="40px"
                                                display="inline-block"
                                            >
                                                Visit blog
                                            </Button>
                                        </StyledLink>
                                    </DataContainer>
                                </IndexWrapper>
                                <BigCircle index={1} />
                                <BigCircle index={2} />
                                <BigCircle index={3} />
                                <BigCircle index={4} />
                            </Fragment>
                        )
                    }}
                />
            </Layout>
        )
    }
}

const animateRightToLeft = keyframes`
  0%{
    transform: translateX(-100vw);
  }
  100%{
      transform: translateX(100vw);
  }
`

const Clouds = styled(CloudIcon)`
    position: absolute;

    ${({ index }) => {
        switch (index) {
            case 1:
                return css`
                    width: 167px;
                    height: 102px;
                    top: 200px;
                    left: 290px;
                `
            case 2:
                return css`
                    width: 313px;
                    height: 191px;
                    top: 170px;
                    left: 374px;
                    opacity: 0.3;
                `
            case 3:
                return css`
                    width: 176px;
                    height: 107px;
                    top: 44px;
                    left: 591px;
                `
            case 4:
                return css`
                    width: 431px;
                    height: 263px;
                    top: 64px;
                    left: 65%;
                    opacity: 0.3;
                `
            case 5:
                return css`
                    width: 203px;
                    height: 124px;
                    top: 218px;
                    left: 80%;
                `
        }
    }};
`

const Sun = styled(SunIcon)`
    position: absolute;
    z-index: 1;
    left: -100px;
    top: -100px;
    height: 250px;
    width: 250px;
`

const BigCircle = styled.div`
    position: absolute;
    background: #5ebccf;
    opacity: 0.15;
    border-radius: 50%;
    height: 60vw;

    ${({ index }) => {
        switch (index) {
            case 1:
                return css`
                    bottom: -49vw;
                    left: -58vw;
                    width: 100vw;
                `
            case 2:
                return css`
                    bottom: -55vw;
                    left: -37vw;
                    width: 110vw;
                `
            case 3:
                return css`
                    bottom: -54vw;
                    left: 0;
                    width: 140vw;
                `
            case 4:
                return css`
                    bottom: -51vw;
                    left: 25vw;
                    width: 130vw;
                `
        }
    }}
`

const IndexWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Montserrat", sans-serif;
    height: 100%;
`

const FullName = styled.div`
    color: #363636;
    font-size: 32px;
    font-weight: 900;
    margin-top: 8px;
`

const Description = styled.div`
    font-size: 20px;
    color: #ffffff;
`

const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`

const DataContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    width: max-content;
    box-shadow: none;
`

const indexQuery = graphql`
    query IndexQuery {
        avatar: file(absolutePath: { regex: "/profile-pic.jpeg/" }) {
            childImageSharp {
                fixed(width: 400, height: 400) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        site {
            siteMetadata {
                author
                social {
                    twitter
                }
            }
        }
    }
`

export default IndexPage
