import React, { Fragment } from "react"
import Image from "gatsby-image"
import { graphql, Link, StaticQuery } from "gatsby"
import styled, { keyframes, css } from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"

// Icons
import SunIcon from "../icons/sun.svg"
import CloudIcon from "../icons/cloud.svg"
import MoonIcon from "../icons/moon.svg"
import GroundOne from "../icons/ground-1.svg"
import GroundTwo from "../icons/ground-2.svg"
import GroundThree from "../icons/ground-3.svg"
import GroundFour from "../icons/ground-4.svg"
import Stars from "../icons/stars.svg"

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
                                <Moon />
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
                                        {/*<StyledLink to="/blog/">*/}
                                        {/*    <Button*/}
                                        {/*        marginTop="35px"*/}
                                        {/*        radius="40px"*/}
                                        {/*        display="inline-block"*/}
                                        {/*    >*/}
                                        {/*        Visit blog*/}
                                        {/*    </Button>*/}
                                        {/*</StyledLink>*/}
                                    </DataContainer>
                                </IndexWrapper>
                                <GroundOneStyled />
                                <GroundTwoStyled />
                                <GroundThreeStyled />
                                <GroundFourStyled />
                                <StarsStyled />
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
    transform: translateX(0);
  }
  100%{
      transform: translateX(0);      
  }
`

const GroundOneStyled = styled(GroundOne)`
    width: 2469px;
    height: 786px;
    position: absolute;
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
    position: absolute;
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
    position: absolute;
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
    position: absolute;
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
    position: absolute;
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

const Clouds = styled(CloudIcon)`
    position: absolute;
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
                    left: 290px;

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
                    left: 374px;
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
                    left: 591px;

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
                    @media (max-width: 600px) {
                        display: none;
                    }
                `
        }
    }};
`

const Sun = styled(SunIcon)`
    position: absolute;
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
                  left: -20%;
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
    position: absolute;
    z-index: 1;
    height: 140px;
    width: 140px;
    filter: drop-shadow(0 0 60px rgba(255, 255, 255, 0.95));
    transition: all 700ms ease-in-out;

    ${({ theme }) => {
        return theme.isDayMode
            ? css`
                  right: -12%;
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

const IndexWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Montserrat", sans-serif;
    height: 100%;
    z-index: 2;
    position: relative;

    @media (max-width: 600px) {
        flex-direction: column;
    }
`

const FullName = styled.div`
    color: #363636;
    font-size: 32px;
    font-weight: 900;
    margin-top: 8px;
    z-index: 1;
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

    .gatsby-image-wrapper {
        transition: all 750ms ease-in-out;
        transition-delay: 150ms;
        ${({ theme }) =>
            theme.isDayMode
                ? css`
                      box-shadow: 70px 70px 70px 5px rgba(94, 188, 207, 0.25);
                  `
                : css`
                      box-shadow: -50px 50px 50px 5px rgba(21, 28, 68, 0.25);
                  `};
    }
`

const DataContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;

    @media (max-width: 600px) {
        margin: 4px 0;
        align-items: center;
    }

    ${({ theme }) => {
        return theme.isDayMode
            ? css``
            : css`
                  & > ${FullName} {
                      color: #ffffff;
                  }

                  & > ${Description} {
                      color: #c0c0c0;
                  }
              `
    }};
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
