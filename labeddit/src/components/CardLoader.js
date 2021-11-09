import React from "react"
import ContentLoader from "react-content-loader"
import styled from "styled-components"

const MainCard = styled.div`
    min-height: 40vh;
    width: 70vw;
    background-color: black;
    margin-top: 4vh;
    padding: 2vw 2vh;
    border-radius: 12px;

    :hover{
        cursor: pointer;
        box-shadow: 2px 2px 25px lightgray;
    }
`

const CardLoader = (props) => (
    <MainCard>
        <ContentLoader 
            speed={8}
            width={600}
            height={260}
            viewBox="0 0 400 160"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect x="6" y="5" rx="0" ry="0" width="200" height="17" /> 
            <rect x="6" y="30" rx="0" ry="0" width="250" height="41" /> 
            <rect x="6" y="80" rx="0" ry="0" width="400" height="14" /> 
            <rect x="6" y="100" rx="0" ry="0" width="400" height="14" /> 
            <rect x="6" y="120" rx="0" ry="0" width="400" height="14" /> 
            <rect x="6" y="140" rx="0" ry="0" width="143" height="43" /> 
            <rect x="270" y="140" rx="0" ry="0" width="143" height="43" /> 
            <rect x="246" y="250" rx="0" ry="0" width="143" height="39" />
        </ContentLoader>
  </MainCard>
)

export default CardLoader
