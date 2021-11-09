import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalContext'
import {BsFillHandThumbsUpFill, BsFillHandThumbsDownFill} from 'react-icons/bs'
import axios from 'axios'
import { BASE_URL } from '../constants/urls'

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

const ContainerNome = styled.div`
    height: 4vh;
`

const ContainerPubli = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    min-height: 30vh;
`

const ContainerInfos = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;


`

const ContainerVote = styled.div`
    width: 10vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media(max-width:800px){
        width: 20vw;
    }
`

const ContainerComentario = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 8vw;
    @media(max-width:800px){
        width: 30vw;
    }
`

function Card (props) {
    const history = useHistory()
    const {selectedPost, setSelectedPost} = useContext(GlobalContext)

    const goToPostPage = () => {
        if (props.post){
            setSelectedPost(props.publi)
            history.push(`/post/${props.publi.id}`)
        }
    }

    return (
        <MainCard>
            <ContainerNome>
                {props.publi.username}
            </ContainerNome>
            <ContainerPubli onClick={goToPostPage} > 
                <h2>{props.publi.title}</h2>
                <p>{props.publi.body}</p>
            </ContainerPubli>
            <ContainerInfos>
                <ContainerVote>
                    {(props.publi.userVote === 1) ? (<BsFillHandThumbsUpFill size={30} color={'#FF4500'} onClick={() => props.deletePostVote(props.publi.id)} />) : (<BsFillHandThumbsUpFill size={30} onClick={() => props.createVote(props.publi.id, props.publi.userVote, true)} />)}
                    {props.publi.voteSum === null ? (0) : (props.publi.voteSum)}
                    {(props.publi.userVote === -1) ? (<BsFillHandThumbsDownFill size={30} color={'#FF4500'} onClick={() => props.deletePostVote(props.publi.id)}  />) : (<BsFillHandThumbsDownFill size={30} onClick={() => props.createVote(props.publi.id, props.publi.userVote, false)}  />)}
                </ContainerVote>
                {(props.post) &&
                (<ContainerComentario>
                    {props.publi.commentCount === null ? (0) : (props.publi.commentCount)} {props.publi.commentCount > 1 ? (<p>Comentários</p>) : (<p>Comentário</p>)}
                </ContainerComentario>)}
            </ContainerInfos>
        </MainCard>
    )
}

export default Card