import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
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
`

const Title = styled.h1`
    margin-top: 0;
`

const BannerCredit = styled.div`
    text-align: right;
    font-size: 12px;
    a {
        color: var(--colors-secondary);
    }
`

const SmallInfo = styled.small`
    display: block;
    font-size: 90%;
    font-weight: 300;
    line-height: 1.75rem;
    margin-top: -1.75rem;
    color: ${({theme}) => theme.isDayMode ? 'initial':'rgba(255,255,255,0.87)'}
`
const BlogHeader = styled.div`
    margin-bottom: 1.75rem;
`

const BlogFooter = styled.div``

const BlogPostTemplate = ({ data }) => {
    const post = data.mdx
    return (
        <React.Fragment>
            <Seo
                title={post.frontmatter.title}
                description={post.frontmatter.description || post.excerpt}
            />
            <BlogPostWrapper>
                <BlogHeader>
                    <Title>{post.frontmatter.title}</Title>
                    <SmallInfo>
                        {post.frontmatter.date} · {post.fields.readingTime.text}
                    </SmallInfo>
                </BlogHeader>
                <Img fluid={post.frontmatter.banner.childImageSharp.fluid} />
                <BannerCredit>
                    <Markdown>{post.frontmatter.bannerCredit}</Markdown>
                </BannerCredit>
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
                readingTime {
                    text
                }
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
