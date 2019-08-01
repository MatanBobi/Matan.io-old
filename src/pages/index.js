import React, { Fragment } from "react"
import Image from "gatsby-image"
import { graphql, Link, StaticQuery } from "gatsby"
import styled, { keyframes, css } from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"

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
                                    <Clouds index={1} />
                                    <Clouds index={2} />
                                    <Sun />
                                    <ImageWrapper>
                                        <Image
                                            fixed={
                                                data.avatar.childImageSharp
                                                    .fixed
                                            }
                                            alt={author}
                                            style={{
                                                minWidth: 200,
                                                borderRadius: `100%`,
                                            }}
                                            imgStyle={{
                                                borderRadius: `50%`,
                                            }}
                                        />
                                    </ImageWrapper>
                                    <FullName>Matan Borenkraout</FullName>
                                    Frontend developer
                                    <Link to="/blog/">
                                        <Button marginTop="35px">
                                            Go to Blog
                                        </Button>
                                    </Link>
                                </IndexWrapper>
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

const Clouds = styled.div`
    position: absolute;
    top: ${Math.random() * 50}px;
    right: 0;
    animation-delay: ${({ index }) => (index - 1) * 10000}ms;
    ${({ index }) => css`
        animation: ${animateRightToLeft}
            ${index * (Math.random() + 1) * 50000}ms ease-in-out infinite;
    `}
    ${({ index }) => {
        const randomNumber = Math.random()
        const size =
            index * randomNumber * 18 < 12 ? 12 : index * randomNumber * 18
        return css`
            width: ${size}ch;
            height: ${size}ch;
        `
    }};
    background-size: cover;
    background-image: url(https://image.flaticon.com/icons/svg/414/414927.svg);
`

const Sun = styled.div`
    position: absolute;
    z-index: 1;
    transform: rotate(135deg);
    right: -68px;
    top: -68px;
    height: 20ch;
    width: 20ch;
    background-size: cover;
    background-image: url(https://image.flaticon.com/icons/svg/979/979585.svg);
`

const IndexWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    font-family: "Montserrat", sans-serif;
    height: 100%;
`

const FullName = styled.div`
    color: #1c1c1c;
    font-size: 24px;
    margin-top: 8px;
`

const Spin1 = keyframes`
  0% {
    transform: rotate(0);
}
  100% {
    transform: rotate(360deg);
}`

const Spin2 = keyframes`
  0% {
    transform: rotate(-144deg);
}
  100% {
    transform: rotate(216deg);
}`

const Spin3 = keyframes`
  0% {
    transform: rotate(216deg);
}
  100% {
    transform: rotate(-144deg);
}`

const Circle = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    transition: all 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
    border-radius: 121% 128% 125% 124%/125% 120% 127% 125%;
`

const FirstCircle = styled(Circle)`
    left: -5px;
    top: -5px;
    height: 210px;
    width: 210px;
    margin: 0 auto;
    //background: #028090;
    ${Circle}:nth-child(1) {
        transform-origin: 50%-0.3% 50%;
        animation: ${Spin1} 3.5s linear infinite reverse;
        animation-play-state: paused;
        background: #028090;
    }
    ${Circle}:nth-child(2) {
        transform-origin: 50% 50%+0.3%;
        animation: ${Spin2} 3.5s linear infinite reverse;
        animation-play-state: paused;
        background: #028090;
    }
    ${Circle}:nth-child(3) {
        transform-origin: 50%+0.3% 50%;
        animation: ${Spin3} 3.5s linear infinite reverse;
        animation-play-state: paused;
        background: #028090;
    }
    ${Circle}:nth-child(4) {
        box-sizing: border-box;
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 121% 128% 125% 124%/125% 120% 127% 125%;
        background: #028090;
    }
`

const SecondCircle = styled(Circle)`
    left: -5px;
    top: -5px;
    height: 210px;
    width: 210px;
    margin: 0 auto;
    ${Circle}:nth-child(1) {
        transform-origin: 50%-0.3% 50%;
        animation: ${Spin1} 2s linear infinite;
        animation-play-state: paused;
        background: #00a896;
    }
    ${Circle}:nth-child(2) {
        transform-origin: 50% 50%+0.3%;
        animation: ${Spin2} 2s linear infinite;
        animation-play-state: paused;
        background: #00a896;
    }
    ${Circle}:nth-child(3) {
        transform-origin: 50%+0.3% 50%;
        animation: ${Spin3} 2s linear infinite;
        animation-play-state: paused;
        background: #00a896;
    }
    ${Circle}:nth-child(4) {
        box-sizing: border-box;
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 121% 128% 125% 124%/125% 120% 127% 125%;
        background: #00a896;
    }
`

const ThirdCircle = styled(Circle)`
    left: -5px;
    top: -5px;
    height: 210px;
    width: 210px;
    margin: 0 auto;
    ${Circle}:nth-child(1) {
        transform-origin: 50%-0.3% 50%;
        animation: ${Spin1} 2.5s linear infinite reverse;
        animation-play-state: paused;
        background: #02c39a;
    }
    ${Circle}:nth-child(2) {
        transform-origin: 50% 50%+0.3%;
        animation: ${Spin2} 2.5s linear infinite reverse;
        animation-play-state: paused;
        background: #02c39a;
    }
    ${Circle}:nth-child(3) {
        transform-origin: 50%+0.3% 50%;
        animation: ${Spin3} 2.5s linear infinite reverse;
        animation-play-state: paused;
        background: #02c39a;
    }
    ${Circle}:nth-child(4) {
        box-sizing: border-box;
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 121% 128% 125% 124%/125% 120% 127% 125%;
        background: #02c39a;
    }
`

const FourthCircle = styled(Circle)`
    left: -5px;
    top: -5px;
    height: 210px;
    width: 210px;
    margin: 0 auto;
    ${Circle}:nth-child(1) {
        transform-origin: 50%-0.3% 50%;
        animation: ${Spin1} 4s linear infinite;
        animation-play-state: paused;
        background: #05668d;
    }
    ${Circle}:nth-child(2) {
        transform-origin: 50% 50%+0.3%;
        animation: ${Spin2} 4s linear infinite;
        animation-play-state: paused;
        background: #05668d;
    }
    ${Circle}:nth-child(3) {
        transform-origin: 50%+0.3% 50%;
        animation: ${Spin3} 4s linear infinite;
        animation-play-state: paused;
        background: #05668d;
    }
    ${Circle}:nth-child(4) {
        box-sizing: border-box;
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 121% 128% 125% 124%/125% 120% 127% 125%;
        background: #05668d;
    }
`

const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &:hover {
        ${Circle} {
            animation-play-state: running;
        }
        ${FirstCircle} {
            top: -16px;
            left: -16px;
        }
        ${SecondCircle} {
            top: 16px;
            left: 16px;
        }
        ${ThirdCircle} {
            top: -12px;
            left: 12px;
        }
        ${FourthCircle} {
            top: 12px;
            left: -12px;
        }
    }
`

const indexQuery = graphql`
    query IndexQuery {
        avatar: file(absolutePath: { regex: "/profile-pic.jpeg/" }) {
            childImageSharp {
                fixed(width: 200, height: 200) {
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
