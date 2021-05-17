import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import Markdown from "react-markdown"
import { MDXRenderer } from "gatsby-plugin-mdx"
import SEO from "../components/seo"

const StyledLink = styled(Link)`
    color: var(--colors-secondary);
    margin-top: 8px;
`

const BlogPostWrapper = styled.article`
    color: var(--colors-primary);
    max-width: 800px;
    margin: 0 auto;
    padding-bottom: 60px;
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

const BlogFooter = styled.div``

const BlogPostTemplate = ({ data, location }) => {
    const post = data.mdx
    return (
        <React.Fragment>
            <SEO
                title={post.frontmatter.title}
                description={post.frontmatter.description || post.excerpt}
            />
            <BlogPostWrapper>
                <Title>{post.frontmatter.title}</Title>
                <Img fluid={post.frontmatter.banner.childImageSharp.fluid} />
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
