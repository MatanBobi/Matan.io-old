import React, { Fragment } from "react"
import Image from "gatsby-image"
import { graphql, Link, StaticQuery } from "gatsby"
import styled, { css } from "styled-components"
import SEO from "../components/seo"
class IndexPage extends React.Component {
    render() {
        return (
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
                                <ImageWrapper>
                                    <Image
                                        fixed={
                                            data.avatar.childImageSharp.fixed
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
                                    <StyledLink to="/blog">
                                        <Button>Check out my blog</Button>
                                    </StyledLink>
                                </DataContainer>
                            </IndexWrapper>
                        </Fragment>
                    )
                }}
            />
        )
    }
}

const IndexWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Montserrat", sans-serif;
    height: 100%;
    z-index: 2;
    position: fixed;
    padding: 150px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    @media (max-width: 600px) {
        flex-direction: column;
        padding: 4px;
    }
`

const FullName = styled.div`
    color: var(--colors-primary);
    font-size: 32px;
    height: 56px;
    font-weight: 900;
    margin-top: 8px;
    z-index: 1;
    transition: color 500ms ease-in-out;
`

const Description = styled.div`
    font-size: 20px;
    color: #ffffff;
    transition: color 500ms ease-in-out;
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

const Button = styled.button`
    cursor: pointer;
    margin-top: 35px;
    background-color: ${({ theme }) =>
        theme.isDayMode ? "#5ebccf" : "#0f142e"};
    border-radius: 34px;
    padding: 10px 15px;
    border: none;
    color: ${({ theme }) => (theme.isDayMode ? "#FFFFFF" : "#c0c0c0")};
    transition: all 500ms ease-in-out;
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
