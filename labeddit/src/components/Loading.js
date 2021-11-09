import React from 'react'
import styled from 'styled-components'
import logo from '../img/logo.png'
import loading from '../img/loading.gif'

const LogoReddit = styled.img`
    height: 150px;
    width: auto;
    margin-bottom: -30vh;
    margin-top: 8vh;

    @media(max-width: 800px){
        margin-bottom: -23vh;
        height: 100px;
    }
`

const Gif = styled.img`
    height: 250px;
    width: auto;
`

const MainContainerLoading = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
function Loading () {
    return(
        <MainContainerLoading>
            <LogoReddit src={logo} alt='logo' />
            <Gif src={loading} alt='loading' />
        </ MainContainerLoading>
    )
}

export default Loading