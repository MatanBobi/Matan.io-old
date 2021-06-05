import React, { Fragment, useContext } from "react"
import Image from "gatsby-image"
import { graphql, Link, StaticQuery } from "gatsby"
import styled, { css, ThemeContext } from "styled-components"
import Seo from "../components/seo"
import Toggle from "../components/Toggle"
import { PostCard } from "../components/PostCard"
const IndexPage = () => {
    const theme = useContext(ThemeContext)
    return (
        <StaticQuery
            query={indexQuery}
            render={(data) => {
                const { author } = data.site.siteMetadata
                const posts = data.allMdx.edges
                return (
                    <Fragment>
                        <Seo
                            title="Home"
                            keywords={[
                                `blog`,
                                `frontend developer`,
                                `javascript`,
                                `react`,
                            ]}
                        />
                        <IndexWrapper>
                            <TopWrapper>
                                <Toggle
                                    size="big"
                                    toggleDayMode={() => theme.toggleDayMode()}
                                    isDayMode={theme.isDayMode}
                                />
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
                            </TopWrapper>
                            <PostsWrapper>
                                {posts.map(({ node }) => {
                                    const { banner, title, description, date } =
                                        node.frontmatter
                                    return (
                                        <div key={node.slug}>
                                            <Link
                                                style={{ boxShadow: `none` }}
                                                to={`/blog/${node.slug}`}
                                            >
                                                <PostCard
                                                    image={banner}
                                                    title={title}
                                                    description={
                                                        description ||
                                                        node.excerpt
                                                    }
                                                    date={date}
                                                />
                                            </Link>
                                        </div>
                                    )
                                })}
                            </PostsWrapper>
                        </IndexWrapper>
                    </Fragment>
                )
            }}
        />
    )
}

const IndexWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: "Montserrat", sans-serif;
    width: 100%;
    height: 100%;
    z-index: 2;
    /* position: fixed; */
    /* padding: 150px; */
    /* top: 50%; */
    /* left: 50%; */
    /* transform: translate(-50%, -50%); */

    /* @media (max-width: 600px) { */
    /* flex-direction: column; */
    /* padding: 4px; */
    /* } */
`

const TopWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 40px 0;
`

const PostsWrapper = styled.div`
    @media only screen and (max-width: 480px) {
        margin: 20px 0 40px;
    }
    margin: 80px 0 60px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 40px;
    font-size: 14px;
    width: 100%;
`

const FullName = styled.div`
    color: var(--colors-primary);
    font-size: 32px;
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
        allMdx(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { isDraft: { ne: true } } }
        ) {
            edges {
                node {
                    excerpt
                    slug
                    frontmatter {
                        date(formatString: "MMMM DD, YYYY")
                        title
                        description
                        banner {
                            ...bannerImage260
                        }
                    }
                }
            }
        }
    }
`

export default IndexPage
