import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import NotFoundImage from "../icons/not-found-image.svg"

const StyledNotFoundImage = styled(NotFoundImage)`
    height: 60%;
    width: 60%;
    .animated-fill {
        transition: fill 250ms ease-in-out;
    }
`

const NotFoundWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Montserrat", sans-serif;
    color: ${({ theme }) => (theme.isDayMode ? "#363636" : "#FFFFFF")};
    height: 100%;
    z-index: 2;
    position: relative;

    @media (max-width: 600px) {
        flex-direction: column;
    }
`

class NotFoundPage extends React.Component {
    render() {
        const { data } = this.props
        const siteTitle = data.site.siteMetadata.title

        return (
            <Layout location={this.props.location} title={siteTitle}>
                <NotFoundWrapper>
                    <SEO title="404: Not Found" />
                    <StyledNotFoundImage />
                    <h1>Oops, that didn't suppose to happen!</h1>
                </NotFoundWrapper>
            </Layout>
        )
    }
}

export default NotFoundPage

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
    }
`
