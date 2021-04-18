import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import Markdown from "react-markdown"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import SEO from "../components/seo"

const StyledLink = styled(Link)`
    color: var(--colors-secondary);
`

const BlogPostWrapper = styled.article`
    color: var(--colors-primary);
    max-width: 800px;
    margin: 0 auto;

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
`

const SmallInfo = styled.small`
    margin: 0 2px;
    font-weight: 300;
    &:first-of-type{
        &::after{
            content: '|';
            margin: 0 0 0 4px;
        }
    }
`

const BlogPostTemplate = ({ data, location }) => {
    const post = data.mdx
    const siteTitle = data.site.siteMetadata.title
    return (
        <Layout location={location} title={siteTitle}>
            <SEO
                title={post.frontmatter.title}
                description={post.frontmatter.description || post.excerpt}
            />
            <BlogPostWrapper>
                <SmallInfo>{post.frontmatter.date}</SmallInfo>
                <SmallInfo>{post.fields.readingTime.text}</SmallInfo>
                <Title>{post.frontmatter.title}</Title>
                <Img fluid={post.frontmatter.banner.childImageSharp.fluid} />
                <BannerCredit>
                    <Markdown>{post.frontmatter.bannerCredit}</Markdown>
                </BannerCredit>
                <MDXRenderer>{post.body}</MDXRenderer>
                <StyledLink
                    target="_blank"
                    rel="noopener noreferrer"
                    href={post.fields.editLink}
                >
                    Edit post on GitHub
                </StyledLink>
            </BlogPostWrapper>
        </Layout>
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
