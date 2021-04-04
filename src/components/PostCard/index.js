import React from "react"
import styled from "styled-components"

const PostWrapper = styled.div`
    color: var(--colors-primary);
`

const RoundedImage = styled.img`
    border-radius: 10px;
    margin-bottom: 0;
`

const Title = styled.div`
    font-size: 16px;
`

export const PostCard = ({ image, title, description, date }) => {
    return (
        <PostWrapper>
            {image && <RoundedImage src={image} />}
            <small>{date}</small>
            <Title>{title}</Title>
            <small
                dangerouslySetInnerHTML={{
                    __html: description,
                }}
            />
        </PostWrapper>
    )
}
