import React from 'react'
import styled from 'styled-components'
import logo from '../img/logo.png'
import { BsLinkedin, BsGithub } from 'react-icons/bs' 

const MainFooter = styled.div`
    height: 20vh;
    background-color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media(max-width:800px){
        height: 40vh;
        flex-direction: column;
    }
`

const Logo = styled.img`
    height: 50px;
    width: auto;
`

const ContainerMarca = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 2vw;
    margin-top: 4vh;

    @media(max-width:800px){
        margin-left: 4vw;
        margin-top: 2vh;
    }

`

const ContainerLegenda = styled.div`
    margin-left: 2vw;
    margin-top: 0;

    h5{
        margin-top: 0;
    }

    @media(max-width:800px){
        margin-left: 4vw;
    }
`

const ContainerDescicao = styled.div`
    margin-right: 2vw;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    h2{
        margin-bottom: 0;
    }

    h5 {
        margin-bottom: 0;
        margin-top: 0;
    }

    @media(max-width:800px){
        align-items: flex-start;
    }
`

const ContainerRedes = styled.div`
    display: flex;
    width: 6vw;
    justify-content: space-between;
    align-items: center;
    margin-top: 2vh;

    @media(max-width:800px){
        width: 20vw;
        margin-bottom: 2vh;
    }
`

function Footer () {
    return(
        <MainFooter>
            <div>
                <ContainerMarca>
                    <Logo src={logo} alt='logo reddit' />
                    <h2>Labeddit</h2>
                </ContainerMarca>
                <ContainerLegenda>
                    <h5>Rede social fictícia desenvolvida como atividade para o curso de desenvolvimento web da Labenu.</h5>
                </ContainerLegenda>
            </div>
            <ContainerDescicao>
                <h2>Desenvolvido por Silvio Dias Jr.</h2>
                <h5>Acompanhe minhas redes sociais:</h5>
                <ContainerRedes>
                    <a href='https://github.com/silviordjr' target='_blank'><BsGithub size={30} color={'white'} /></a>
                    <a href='https://www.linkedin.com/in/silvio-dias-junior/' target='_blank' ><BsLinkedin size={30} color='white' /></a>
                </ContainerRedes>
                

            </ContainerDescicao>
        </MainFooter>

    )
}

export default Footer