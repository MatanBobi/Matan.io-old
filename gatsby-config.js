module.exports = {
    siteMetadata: {
        // edit below
        title: `Matan Borenkraout`,
        author: `Matan Borenkraout`,
        description: `Matan Borenkraout's personal site`,
        siteUrl: `https://matan.io`,
        social: {
            twitter: `matanbobi`,
        },
    },
    plugins: [
        `gatsby-plugin-netlify-cms`,
        `gatsby-plugin-styled-components`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-offline`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-sitemap`,
        `gatsby-remark-reading-time`,
        {
            resolve: `gatsby-plugin-nprogress`,
            options: {
                // Setting a color is optional.
                color: "white",
                // Disable the loading spinner.
                showSpinner: false,
            },
        },
        {
            resolve: "gatsby-plugin-react-svg",
            options: {
                path: `${__dirname}/src/icons`,
                name: `assets`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/blog`,
                name: `blog`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/assets`,
                name: `assets`,
            },
        },
        {
            resolve: `gatsby-plugin-mdx`,
            options: {
                extensions: [`.mdx`, `.md`],
                gatsbyRemarkPlugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 590,
                        },
                    },
                    `gatsby-remark-vscode`,
                    `gatsby-remark-copy-linked-files`,
                    `gatsby-remark-smartypants`,
                ],
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Matan Borenkraout`,
                short_name: `MatanBobi`,
                start_url: `/`,
                background_color: `#ffffff`,
                theme_color: `#98e0ef`,
                display: `minimal-ui`,
                // edit below
                // icon: `content/assets/gatsby-icon.png`,
            },
        },
        {
            resolve: `gatsby-plugin-typography`,
            options: {
                pathToConfigModule: `src/utils/typography`,
            },
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: "UA-150733110-1",
            },
        },
    ],
}
