import React from "react"
import styled from "styled-components"

const PostWrapper = styled.div`
    color: var(--colors-primary);
    /* color: white; */
    border-radius: 4px;
    overflow: hidden;
    /* background: var(--colors-background); */
    box-shadow: 0 5px 40px rgba(0,0,0,0.2);
    transition: all 250ms ease-in-out;
    :hover{
        box-shadow: 0 12px 28px 0 rgba(0,0,0,0.2),0 2px 4px 0 rgba(0,0,0,0.1);
    }
`

const StyledImage = styled.img`
    margin-bottom: 0;
`

const Title = styled.div`
    font-size: 16px;
`

const DataWrapper = styled.div`
    padding: 20px;
`

export const PostCard = ({ image, title, description, date }) => {
    return (
        <PostWrapper>
            {image && <StyledImage src={image} />}
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
