import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import styled, { css } from "styled-components"
import Markdown from "react-markdown"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Seo from "../components/seo"

const StyledLink = styled(Link)`
    color: var(--colors-secondary);
    margin-top: 8px;
`

const BlogPostWrapper = styled.article`
    color: var(--colors-primary);
    max-width: 800px;
    margin: 40px auto;
    padding: 40px;
    background: var(--colors-background);
    border-radius: 10px;
    position: relative;

    img {
        width: 100%;
    }
`

const Title = styled.h1`
    text-align: center;
    margin: 0 0 30px;
`

const BannerCredit = styled.div`
    text-align: right;
    font-size: 12px;
    a {
        color: var(--colors-secondary);
    }
`

const SmallInfo = styled.small`
    margin: 0 2px;
    font-weight: 300;
    &:first-of-type {
        &::after {
            content: "|";
            margin: 0 0 0 4px;
        }
    }
`

const Overlay = styled.div`
    ${({ theme }) =>
        !theme.isDayMode &&
        css`
            border-radius: 10px;
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background: rgba(47, 72, 140, 0.15);
        `}
`
const ContentWrapper = styled.div`
    position: relative;
    z-index: 1;
`

const BlogFooter = styled.div``

const BlogPostTemplate = ({ data, location }) => {
    const post = data.mdx
    return (
        <React.Fragment>
            <Seo
                title={post.frontmatter.title}
                description={post.frontmatter.description || post.excerpt}
            />
            <BlogPostWrapper>
                <Overlay />
                <ContentWrapper>
                    <Title>{post.frontmatter.title}</Title>
                    <Img
                        fluid={post.frontmatter.banner.childImageSharp.fluid}
                    />
                    <BannerCredit>
                        <Markdown>{post.frontmatter.bannerCredit}</Markdown>
                    </BannerCredit>
                    <SmallInfo>{post.frontmatter.date}</SmallInfo>
                    {/* <SmallInfo>{post.fields.readingTime.text}</SmallInfo> */}
                    <MDXRenderer>{post.body}</MDXRenderer>
                    <BlogFooter>
                        <StyledLink
                            target="_blank"
                            rel="noopener noreferrer"
                            href={post.fields.editLink}
                        >
                            Edit post on GitHub
                        </StyledLink>
                    </BlogFooter>
                </ContentWrapper>
            </BlogPostWrapper>
        </React.Fragment>
    )
}

export default BlogPostTemplate

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!) {
        site {
            siteMetadata {
                title
                author
            }
        }
        mdx(slug: { eq: $slug }) {
            id
            excerpt(pruneLength: 160)
            body
            fields {
                editLink
            }
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                description
                banner {
                    ...bannerImage720
                }
                bannerCredit
            }
        }
    }
`
