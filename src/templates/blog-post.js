import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import Markdown from "react-markdown"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

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
`

const BannerCredit = styled.div`
    text-align: right;
    font-size: 12px;
`

const BlogPostTemplate = ({ data, pageContext, location }) => {
    const post = data.mdx
    const siteTitle = data.site.siteMetadata.title
    const { previous, next } = pageContext
    console.log(data)
    return (
        <Layout location={location} title={siteTitle}>
            <SEO
                title={post.frontmatter.title}
                description={post.frontmatter.description || post.excerpt}
            />
            <BlogPostWrapper>
                <Title>{post.frontmatter.title}</Title>
                <small>{post.fields.readingTime.text}</small>
                <Img fluid={post.frontmatter.banner.childImageSharp.fluid} />
                <BannerCredit>
                    <Markdown>{post.frontmatter.bannerCredit}</Markdown>
                </BannerCredit>
                <p
                    style={{
                        ...scale(-1 / 5),
                        display: `block`,
                        marginBottom: rhythm(1),
                        marginTop: rhythm(-1),
                    }}
                >
                    {post.frontmatter.date}
                </p>
                <MDXRenderer>{post.body}</MDXRenderer>
                <hr
                    style={{
                        marginBottom: rhythm(1),
                    }}
                />
                <ul
                    style={{
                        display: `flex`,
                        flexWrap: `wrap`,
                        justifyContent: `space-between`,
                        listStyle: `none`,
                        padding: 0,
                    }}
                >
                    <li>
                        {previous && (
                            <Link
                                to={`/blog/${previous.slug}`}
                                rel="prev"
                            >
                                ← {previous.frontmatter.title}
                            </Link>
                        )}
                    </li>
                    <li>
                        {next && (
                            <Link to={`/blog/${next.slug}`} rel="next">
                                {next.frontmatter.title} →
                            </Link>
                        )}
                    </li>
                </ul>
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
