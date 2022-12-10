import styled from "styled-components"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import load from "../assets/Loading.gif"

export default function Home(){
    const [capas, setCapas] = useState(undefined)

    useEffect(() => {
        const URL = "https://mock-api.driven.com.br/api/v8/cineflex/movies"
        const promise = axios.get(URL)
        promise.then(res => setCapas(res.data))              // requisição deu certo
        promise.catch(err => console.log(err.response.data))  // requisição deu errado
      }, [])

      if (capas === undefined) {
        return (
            <LoadingTela>
                <img src={load} alt="Carregando..."/>
            </LoadingTela>            
        )
      }

    return(
        <>
            <TitulaPage>
                <p>Selecione o filme</p>
            </TitulaPage>
            <Prateleira>
                {capas.map(capa =>(                
                    <Capa data-test="movie" key={capa.title}>
                        <Link to={`/Sessoes/${capa.id}`}>
                            <img src={capa.posterURL} alt={capa.title}/>
                        </Link>
                    </Capa>                
                ))}            
            </Prateleira>
        </>
    )
}

const TitulaPage = styled.div`
    width: 100%;
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    p{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 28px;
        letter-spacing: 0.04em;
        color: #293845;
}
`
const Capa = styled.div`
    width: 145px;
    height: 209px;
    background-color: #FFFFFF;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px 15px;
    cursor: pointer;
    img{
        width: 129px;
        height: 193px;
    }
`
const Prateleira = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`
const LoadingTela = styled.div`
    margin-top: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
        width: 30%;
        height: 30%;
    }
`