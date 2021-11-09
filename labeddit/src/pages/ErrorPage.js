import React from 'react'
import styled from 'styled-components'
import logo from '../img/logo.png'
import { useHistory } from 'react-router-dom'

const HeaderError = styled.header`
    height: 15vh;
    background-color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Logo = styled.img`
    height: 50px;
    width: auto;
`

const ContainerMarca = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 2vw;
    margin-top: 4vh;

`

const MainContainerError = styled.div`
    min-height: 100vh;

`

const ContainerLogout = styled.div`
    button{
        height: 4vh;
        width: 8vw;
        border: none;
        margin-bottom: 2vh;
        border-radius: 8px;
        background-color: #FF4500;
        color: ghostwhite;
        margin-top: 4vh;
        margin-right: 2vw;

        :hover {
            cursor: pointer;
            background-color: #FF4544;
        }

        :active {
            cursor: pointer;
            background-color: #FF5544;
        }

        @media(max-width:800px){
            width: 20vw;
        }
    }
`

const ContainerButton = styled.div`
    @media(max-width:800px){
        display: flex;
        justify-content: center;
        align-items: center;
    }
    button{
        height: 6vh;
        width: 16vw;
        border: none;
        margin-bottom: 2vh;
        border-radius: 8px;
        background-color: #FF4500;
        color: ghostwhite;
        margin-top: 4vh;
        margin-right: 2vw;

        :hover {
            cursor: pointer;
            background-color: #FF4544;
        }

        :active {
            cursor: pointer;
            background-color: #FF5544;
        }

        @media(max-width:800px){
            height: 8vh;
            width: 30vw;
        }
    }
`

const MainError = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1{
        font-size: 25px;
    }
    h3{
        text-align: center;
    }

    h5{
        text-align: center;
    }
`

const LogoError = styled.img`
    height: 150px;
    width: auto;

    @media(max-width:800px){
            height: 100px;
            width: auto;
    }
`

function ErrorPage () {
    const history = useHistory()
    const logout = () => {
        window.localStorage.removeItem("token")
        history.push('/login')
    }

    const voltarPagina = () => {
        history.goBack()
    }

    const goToHome = () => {
        history.push('/')
    }
    return(
        <MainContainerError>
            <HeaderError>
                <ContainerMarca>
                    <Logo src={logo} alt='logo reddit' />
                    <h2>Labeddit</h2>
                </ContainerMarca>
                <ContainerLogout>
                    <button onClick={logout} >Logout</button>
                </ContainerLogout>
            </HeaderError>
            <MainError>
                <LogoError src={logo} alt='logo' />
                <h1>Ops... Algo deu errado por aqui!</h1>
                <h3>Você pode voltar para a página anterior ou para a Home clicando nos botões abaixo.</h3>
                <h5>Ou pode verificar algumas causas de erro que são comuns na lista a seguir: </h5>
                <ol>
                    <li>Verifique sua conexão com a internet;</li>
                    <li>Tente fazer o logout e o login novamente;</li>
                    <li>Verifique se o endereço solicitado está correto.</li>
                </ol>
                <ContainerButton>
                    <button onClick={voltarPagina} >Voltar para página anterior</button>
                    <button onClick={goToHome} >Ir para a Home</button>
                </ContainerButton>
            </MainError>
        </ MainContainerError>
    )
}

export default ErrorPage