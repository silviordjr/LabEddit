import axios from "axios";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Loading from "../components/Loading";
import { BASE_URL } from "../constants/urls";
import { GlobalContext } from "../context/GlobalContext";
import { useForm } from "../hooks/useForm";
import logo from '../img/logo.png'

const MainContainerSignup = styled.div`
    min-height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 4vh;
`

const CardSignup = styled.div`
    height: 70vh;
    width: 30vw;
    background-color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2vh 2vw;
    margin-top: 12vh;

    @media(max-width:800px){
        width: 80vw;
    }
`

const Logo = styled.img`
    height: 80px;
    width: auto;
`

const ContainerMarca = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 8vh;
`

const ContainerInputs = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    input {
        height: 4vw;
        width: 20vw;
        border: none;
        margin-bottom: 2vh;
        border-radius: 8px;
        background-color: #111111;
        color: ghostwhite;

        @media(max-width:800px){
            height: 8vh;
            width: 60vw;
        }
    }

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
            height: 8vh;
            width: 60vw;
        }
        
    }

    p{
        color: #FF4500;
        font-size: 10px;
        margin-top: -2vh;
        margin-bottom: 2vh;
        padding-top: 0;
    }
`


function SignUpPage () {
    const history = useHistory()
    const [form, onChange] = useForm({username:'', email: '', password:''})
    const {loading, setLoading} = useContext(GlobalContext)

    const handleClick = (event) => {
        event.preventDefault()    
        
        const headers = {
            headers:{
                'Content-Type': 'application/json',
            }
        }
        
        setLoading(true)
        axios.post(`${BASE_URL}/users/signup`, form, headers)
        .then((res) => {
            window.localStorage.setItem('token', res.data.token)
            setLoading(false)
            history.push('/')
        })
        .catch((err) => {
            alert("Ocorreu um erro com a requisição! \nVerifique se você está logado e sua conexão com a internet")
            history.push('/error')
            setLoading(false)
        })
    }

    return (
        <MainContainerSignup>
            <CardSignup>
                <ContainerMarca>
                    <Logo src={logo} alt='logo reddit' />
                    <h1>Labeddit</h1>
                </ContainerMarca>
                {(loading) ?
                (<Loading />)
                :
                (<ContainerInputs onSubmit={handleClick}>
                    <input onChange={onChange} value={form.username} name='username' type='text' placeholder='Username' required />
                    <input onChange={onChange} value={form.email} name='email' type='email' placeholder='E-mail' required />
                    <input onChange={onChange} value={form.password} name='password' type='password' placeholder='Senha' minlength="8" maxlength="30" required />
                    <p>Sua senha precisa ter entre 8 e 30 caracterers.</p>
                    <button>Criar Conta</button>
                </ContainerInputs>)}
            </CardSignup>
        </MainContainerSignup>
    )
}

export default SignUpPage