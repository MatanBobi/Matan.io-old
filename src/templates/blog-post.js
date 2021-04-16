import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import Markdown from "react-markdown"

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

class BlogPostTemplate extends React.Component {
    render() {
        const post = this.props.data.markdownRemark
        const siteTitle = this.props.data.site.siteMetadata.title
        const { previous, next } = this.props.pageContext

        return (
            <Layout location={this.props.location} title={siteTitle}>
                <SEO
                    title={post.frontmatter.title}
                    description={post.frontmatter.description || post.excerpt}
                />
                <BlogPostWrapper>
                    <Title>{post.frontmatter.title}</Title>
                    <Img
                        fluid={post.frontmatter.banner.childImageSharp.fluid}
                    />
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
                    <div dangerouslySetInnerHTML={{ __html: post.html }} />
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
                                    to={`/blog${previous.fields.slug}`}
                                    rel="prev"
                                >
                                    ← {previous.frontmatter.title}
                                </Link>
                            )}
                        </li>
                        <li>
                            {next && (
                                <Link
                                    to={`/blog${next.fields.slug}`}
                                    rel="next"
                                >
                                    {next.frontmatter.title} →
                                </Link>
                            )}
                        </li>
                    </ul>
                </BlogPostWrapper>
            </Layout>
        )
    }
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
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            excerpt(pruneLength: 160)
            html
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
