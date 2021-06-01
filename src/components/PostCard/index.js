import React from "react"
import styled from "styled-components"
import Img from 'gatsby-image'

const PostWrapper = styled.div`
    color: ${({theme}) => theme.isDayMode ? '#24292e':'#FFFFFF'};
    background: ${({theme}) => theme.isDayMode ? '#FFFFFF':'rgba(75, 178, 249, 0.08)'};
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 5px 40px rgba(0,0,0,0.2);
    transition: all 250ms ease-in-out;
    :hover{
        box-shadow: 0 12px 28px 0 rgba(0,0,0,0.2),0 2px 4px 0 rgba(0,0,0,0.1);
    }
`

const Title = styled.div`
    font-size: 16px;
`

const DataWrapper = styled.div`
    padding: 20px;
    min-height: 180px;
`

export const PostCard = ({ image, title, description, date }) => {
    return (
        <PostWrapper>
            {image && <Img fluid={image.childImageSharp.fluid} /> }
            <DataWrapper>
                <time>{date}</time>
                <Title>{title}</Title>
                <small
                    dangerouslySetInnerHTML={{
                        __html: description,
                    }}
                />
            </DataWrapper>
        </PostWrapper>
    )
}
