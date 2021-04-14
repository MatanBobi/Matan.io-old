import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { PostCard } from "../components/PostCard"

const PostsWrapper = styled.div`
    margin: 20px 0 40px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 50px;
    font-size: 14px;
`

class Blog extends React.Component {
    render() {
        const { data } = this.props
        const siteTitle = data.site.siteMetadata.title
        const posts = data.allMarkdownRemark.edges

        return (
            <Layout location={this.props.location} title={siteTitle}>
                <SEO title="All posts" />
                <PostsWrapper>
                    {posts.map(({ node }) => {
                        const {
                            banner,
                            title,
                            description,
                            date,
                        } = node.frontmatter
                        return (
                            <div key={node.fields.slug}>
                                <Link
                                    style={{ boxShadow: `none` }}
                                    to={`/blog${node.fields.slug}`}
                                >
                                    <PostCard
                                        image={banner}
                                        title={title}
                                        description={
                                            description || node.excerpt
                                        }
                                        date={date}
                                    />
                                </Link>
                            </div>
                        )
                    })}
                </PostsWrapper>
            </Layout>
        )
    }
}

export default Blog

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
            edges {
                node {
                    excerpt
                    fields {
                        slug
                    }
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
