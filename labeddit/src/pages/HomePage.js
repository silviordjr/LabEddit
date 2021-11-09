import React, { useContext, useEffect, useState } from "react";
import { useProtectedPage } from "../hooks/useProtectedPage";
import styled from 'styled-components'
import logo from '../img/logo.png'
import axios from "axios";
import { BASE_URL } from "../constants/urls";
import Card from "../components/Card";
import { useForm } from "../hooks/useForm";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import Loading from "../components/Loading";

const MainContainerHome = styled.div`
    min-height: 100vh;
    margin-bottom: 4vh;
`

const HeaderHome = styled.header`
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

    @media(max-width: 800px){
        h2 {
            display: none;
        }
    }
`

const ContainerPubli = styled.div`
    
`

const PubliButton = styled.button`
    height: 4vw;
    width: 24vw;
    border: none;
    border-radius: 8px;
    background-color: #111111;
    color: ghostwhite;
    margin-top: 4vh;

    :hover{
        cursor: pointer;
    }

    @media(max-width: 800px){
        height: 12vh;
        font-size: 10px;
        margin-top: 0;
    }
`

const FiltrosButton = styled.button`
    height: 4vw;
    width: 24vw;
    border: none;
    border-radius: 8px;
    background-color: #111111;
    color: ghostwhite;
    margin-top: 4vh;

    :hover{
        cursor: pointer;
    }

    @media(max-width: 800px){
        height: 12vh;
        font-size: 10px;
        margin-top: 0;
    }
`

const PubliContainer = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 4vh;
   
    button{
        height: 4vw;
        width: 20vw;
        border: none;
        margin-bottom: 2vh;
        border-radius: 8px;
        background-color: #FF4500;
        color: ghostwhite;

        :hover {
            cursor: pointer;
            background-color: #FF4544;
        }

        :active {
            cursor: pointer;
            background-color: #FF5544;
        }

        @media(max-width:800px){
            height: 6vh;
        }
    }
`

const InputPubli = styled.input`
    height: 20vw;
    width: 70vw;
    border: none;
    margin-bottom: 2vh;
    border-radius: 8px;
    background-color: #111111;
    color: ghostwhite;
    @media(max-width:800px){
        height: 20vh;
    }
`

const TitlePubli = styled.input`
    height: 5vw;
    width: 70vw;
    border: none;
    margin-bottom: 2vh;
    border-radius: 8px;
    background-color: #111111;
    color: ghostwhite;

    @media(max-width:800px){
        height: 6vh;
    }
`

const ContainerFiltros = styled.div`
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
            width: 12vw;
            font-size: 10px;
        }
    }
`

const MainHome = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const SelecionaFiltros = styled.div`
    display: flex;
    @media(max-width:800px){
        width: 50vw;
        justify-content: space-between;
        align-items: center;
    }

    select {
        height: 4vh;
        width: 8vw;
        border: none;
        margin-bottom: 2vh;
        border-radius: 8px;
        background-color: #111111;
        color: ghostwhite;
        margin-left: 1vw;
        margin-top: 3vh;

        @media(max-width:800px){
            width: 24vw;
        }

    }
`

const ContainerDosFiltros = styled.div`
    display: flex;
    width: 26vw;
    justify-content: space-between;
    align-items: center;
    @media(max-width:800px){
        width: 80vw;
    }

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
            width: 18vw
        }
    }

    input {
        height: 5vw;
        width: 15vw;
        border: none;
        margin-bottom: 2vh;
        border-radius: 8px;
        background-color: #111111;
        color: ghostwhite;

        @media(max-width:800px){
            height: 8vh;
            width: 50vw;
        }
    }
`

const BottomButton = styled.button`
    height: 2vw;
    width: 24vw;
    border: none;
    border-radius: 8px;
    background-color: #111111;
    color: ghostwhite;
    margin-top: 4vh;

    :hover{
        cursor: pointer;
    }

    @media(max-width:800px){
        height: 10vh;
        width: 40vw;
    }
`
function HomePage () {
    useProtectedPage()

    const [isPubli, setIsPubli] = useState(false)
    const [publiList, setPubliList] = useState([])
    const [flagVote, setFlagVote] = useState(false)
    const [form, onChange] = useForm({title:'', body:''})
    const history = useHistory()
    const [isFilter, setIsFilter] = useState(false)
    const [formFilters, onChangeFormFilters] = useForm({title: '', body: ''})
    const [filtersOn, setFiltersOn] = useState(false)
    const [pagPubli, setPagPubli] = useState(2)
    const [publisFilter, setPublisFilter] = useState([])
    const {loading, setLoading} = useContext(GlobalContext)


    
    useEffect(() => {
        const headers = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: window.localStorage.getItem('token')
            }
        }

        if (publiList.length === 0){
            setLoading(true)
            axios.get(`${BASE_URL}/posts?page=1&size=10`, headers)
            .then((res) => {
                setPubliList(res.data)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                if (window.localStorage.getItem('token')){
                    alert("Ocorreu um erro com a requisição! \nVerifique se você está logado e sua conexão com a internet")
                    history.push('/error')
                }
            })
        } else{
            axios.get(`${BASE_URL}/posts?page=1&size=10`, headers)
            .then((res) => {
                setPubliList(res.data)
            })
            .catch((err) => {
                alert("Ocorreu um erro com a requisição! \nVerifique se você está logado e sua conexão com a internet")
                history.push('/error')
            })
        }
        
    }, [flagVote])

    const startPubli = () => {
        setIsPubli(!isPubli)
        setIsFilter(false)
    }

    const createVote = (id, userVote, like) =>{
        const headers = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: window.localStorage.getItem('token')
            }
        }

        let body = {}

        if (like === true){
            body = {
                direction: 1
            }
        } else {
            body = {
                direction: -1
            }
        }

        if (userVote === null){
            axios.post(`${BASE_URL}/posts/${id}/votes`, body, headers)
            .then((res) => {
                setFlagVote(!flagVote)
            })
            .catch((err) =>{
                alert("Ocorreu um erro com a requisição! \nVerifique se você está logado e sua conexão com a internet")
                history.push('/error')
            })
        } else if (userVote === -body.direction){
            axios.put(`${BASE_URL}/posts/${id}/votes`, body, headers)
            .then((res) => {
                setFlagVote(!flagVote)
            })
            .catch((err) =>{
                alert("Ocorreu um erro com a requisição! \nVerifique se você está logado e sua conexão com a internet")
                history.push('/error')
            })
        }
    }

    const deletePostVote = (id) => {
        const headers = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: window.localStorage.getItem('token')
            }
        }

        axios.delete(`${BASE_URL}/posts/${id}/votes`, headers)
        .then((res) => {
            setFlagVote(!flagVote)
        })
        .catch((err) => {
            alert("Ocorreu um erro com a requisição! \nVerifique se você está logado e sua conexão com a internet")
            history.push('/error')
        })
    }

    const createPost = (event) => {
        event.preventDefault()

        const headers = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: window.localStorage.getItem('token')
            }
        }

        setLoading(true)
        axios.post(`${BASE_URL}/posts`, form, headers)
        .then((res) => {
            alert(res.data)
            form.title = ''
            form.body = ''
            setFlagVote(!flagVote)
            setIsPubli(false)
            setLoading(false)
        })
        .catch((err) => {
            alert("Ocorreu um erro com a requisição! \nVerifique se você está logado e sua conexão com a internet")
            history.push('/error')
            setLoading(false)
        })

    }

    const renderizaPubli = publiList && publiList.map((publi) => {
        return(
            <Card publi={publi} post={true} createVote={createVote} deletePostVote={deletePostVote}  />
        )
    })

    const logout = () => {
        window.localStorage.removeItem("token")
        history.push('/login')
    }

    const startFilter = () => {
        setIsFilter(!isFilter)
        setIsPubli(false)
    }

    const filtrarPubli = (event) => {
        event.preventDefault()

        let resultadosPublis = []

        const headers = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: window.localStorage.getItem('token')
            }
        }

        setLoading(true)
        axios.get(`${BASE_URL}/posts?page=1&size=1000`, headers)
        .then((res) => {
            console.log('res:', res.data)
            // setPublisFilter(res.data)
            pegaPublis(res.data)
            setLoading(false)
        })
        .catch((err) => {
            alert("Ocorreu um erro com a requisição! \nVerifique se você está logado e sua conexão com a internet")
            history.push('/error')
            setLoading(false)
        })

        setFiltersOn(true)
        setIsFilter(false)

    }

    const pegaPublis = (resultadosPublis) => {
        console.log('chega', resultadosPublis)
        let elementosFiltrados = []
        
        
        if (formFilters.title === 'Titulo'){
            const arrayBusca = formFilters.body.toUpperCase().split(' ')
            resultadosPublis.map((publi) => {
                let arrayTitulo = publi.title.split(' ')
                arrayTitulo.filter((palavra) => {
                    if (arrayBusca.indexOf(palavra.toUpperCase()) !== -1){
                        elementosFiltrados.push(publi)
                    }
                })
            })
        } else {
            const arrayBusca = formFilters.body.toUpperCase().split(' ')
            resultadosPublis.map((publi) => {
                let arrayTitulo = publi.body.split(' ')
                arrayTitulo.filter((palavra) => {
                    if (arrayBusca.indexOf(palavra.toUpperCase()) !== -1){
                        elementosFiltrados.push(publi)
                    }
                })
            })
        }

        setPubliList(elementosFiltrados)
    }

    const maisPublis = () => {
        const headers = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: window.localStorage.getItem('token')
            }
        }

        axios.get(`${BASE_URL}/posts?page=${pagPubli}&size=10`, headers)
        .then((res) => {
            let antigaListaPubli = [... publiList]
            let novaListaPubli = antigaListaPubli.concat(res.data)
            setPubliList(novaListaPubli)
            setPagPubli(pagPubli + 1)
        })
        .catch((err) => {
            alert("Ocorreu um erro com a requisição! \nVerifique se você está logado e sua conexão com a internet")
            history.push('/error')
        })


    }

    return (
        <MainContainerHome>
            <HeaderHome>
                <ContainerMarca>
                    <Logo src={logo} alt='logo reddit' />
                    <h2>Labeddit</h2>
                </ContainerMarca>
                <ContainerPubli>
                    <PubliButton onClick={startPubli} >No que você está pensando? Conte para todos!</PubliButton>
                </ContainerPubli>
                <ContainerFiltros>
                    <FiltrosButton onClick={startFilter} >Quer encontrar alguma publicação específica? Experimente nossos filtros!</FiltrosButton>
                </ContainerFiltros>
                <ContainerLogout>
                    <button onClick={logout} >Logout</button>
                </ContainerLogout>
            </HeaderHome>
            {(loading) ? 
            (<Loading />)
            :
            (<MainHome>
                {isPubli && 
                    (
                        <PubliContainer onSubmit={createPost}>
                            <TitlePubli onChange={onChange} value={form.title} name='title'  placeholder='Escreva um título para sua publicação!' required />
                            <InputPubli onChange={onChange} value={form.body} name='body' placeholder='No que você está pensando?' required />
                            <button>Publicar</button>
                        </PubliContainer>
                    )}
                {isFilter &&
                (
                    <form onSubmit={filtrarPubli}>
                        <SelecionaFiltros>
                            <h3>Filtrar por:</h3>
                            <select onChange={onChangeFormFilters} value={formFilters.title} name='title' required>
                                <option value="" disabled selected>Selecione</option>
                                <option id='Titulo' value='Titulo'>Titulo</option>
                                <option id='Texto' value='Texto'>Texto</option>
                            </select>
                        </SelecionaFiltros>
                        <ContainerDosFiltros>
                            <input onChange={onChangeFormFilters} value={formFilters.body} name='body' placeholder='Palavras-Chave' required />
                            <button>Buscar</button>
                        </ContainerDosFiltros>
                    </form>
                )}
                {publiList.length > 0 ?
                (renderizaPubli)
                :
                (<div>
                    <h2>Ops... Não há nada para mostrar por aqui.</h2>
                    <h5>Verifique seus filtros de busca ou tente novamente.</h5>
                </div>)}
                <BottomButton onClick={maisPublis} >Carregar mais pubicações</BottomButton>
            </MainHome>)
            }           
        </MainContainerHome>
    )
}

export default HomePage