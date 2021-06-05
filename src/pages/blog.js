import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import Seo from "../components/seo"
import { PostCard } from "../components/PostCard"

const PostsWrapper = styled.div`
    @media only screen and (max-width: 480px) {
        margin: 20px 0 40px;
    }
    margin: 80px 0 60px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 50px;
    font-size: 14px;
`

class Blog extends React.Component {
    render() {
        const { data } = this.props
        const posts = data.allMdx.edges

        return (
            <React.Fragment>
                <Seo title="All posts" />
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
                                            description || node.excerpt
                                        }
                                        date={date}
                                    />
                                </Link>
                            </div>
                        )
                    })}
                </PostsWrapper>
            </React.Fragment>
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
