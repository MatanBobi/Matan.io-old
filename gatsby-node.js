const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions

    const blogPost = path.resolve(`./src/templates/blog-post.js`)
    return graphql(
        `
            {
                allMdx(
                    sort: { fields: [frontmatter___date], order: DESC }
                    limit: 1000
                ) {
                    edges {
                        node {
                            slug
                            frontmatter {
                                title
                            }
                        }
                    }
                }
            }
        `
    ).then(result => {
        if (result.errors) {
            throw result.errors
        }

        // Create blog posts pages.
        const posts = result.data.allMdx.edges

        posts.forEach((post, index) => {
            const previous =
                index === posts.length - 1 ? null : posts[index + 1].node
            const next = index === 0 ? null : posts[index - 1].node

            createPage({
                path: `blog/${post.node.slug}`,
                component: blogPost,
                context: {
                    slug: post.node.slug,
                    previous,
                    next,
                },
            })
        })

        return null
    })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions

    if (node.internal.type === `Mdx`) {
        const value = createFilePath({ node, getNode })
        createNodeField({
            name: `slug`,
            node,
            value,
        })
        createNodeField({
            name: "editLink",
            node,
            value: `https://github.com/matanbobi/matan.io/edit/master${node.fileAbsolutePath.replace(
                __dirname,
                ""
            )}`,
        })
    }
}
