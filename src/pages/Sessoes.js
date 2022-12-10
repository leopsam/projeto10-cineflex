import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import load from "../assets/Loading.gif"
import { Link } from "react-router-dom"

export default function Sessoes(){   
    const [capa, setCapa] = useState(undefined)
    const [dias, setDias] = useState(undefined)
    const { filmeId } = useParams()

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${filmeId}/showtimes`)
        promise.then((res) => (setCapa(res.data), setDias(res.data.days)))
        promise.catch((err) => console.log(err.response.data))
      }, [])

      if (capa === undefined) {
        return (
            <LoadingTela>
                <img src={load} alt="Carregando..."/>
            </LoadingTela>            
        )
      }

    return (
        <>
        <TitulaPage>
            <p>Selecione o horário</p>
        </TitulaPage>

        <ContainerDias>
            {dias.map(dia => (
                <Dias data-test="movie-day" key={dia.id}>
                    <p>{dia.weekday} - {dia.date}</p>
                        {dia.showtimes.map(hora => (
                            <Link data-test="showtime" key={hora.id} to={`/assentos/${hora.id}`}>
                                <button>{hora.name}</button>
                            </Link>                            
                        ))}                
                </Dias>
            ))}
        </ContainerDias>        

        <FooterFilme>
            <FundoCapa data-test="footer">
                <img src={capa.posterURL} alt={capa.title}/>
            </FundoCapa > 
            <p>{capa.title}</p>                          
        </FooterFilme>
        </>
    )
}

const FooterFilme = styled.footer`
    position: fixed;
    width: 100%;
    height: 117px;
    left: 0px;
    bottom: 0px;
    background: #DFE6ED;
    border: 1px solid #9EADBA;
    display: flex;
    align-items: center;
    p{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 26px;
        line-height: 30px;
        color: #293845;
    }
`
const FundoCapa = styled.div`
    width: 64px;
    height: 89px;
    left: 10px;
    bottom: 14px;
    background-color: #FFFFFF;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    img{
        width: 48px;
        height: 72px;
    }
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
const Dias = styled.div`
    margin: 0 20px;
    p{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        letter-spacing: 0.02em;
        color: #293845;
    }  
    button{
        width: 82px;
        height: 43px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        letter-spacing: 0.02em;
        color: #FFFFFF;
        background-color: #E8833A;
        border-radius: 3px;
        border: none;
        margin: 30px 10px 30px 0;
        cursor: pointer;
    }
    button:active{
        background-color: #f4b384;
    }
`
const ContainerDias = styled.div`
    margin-bottom: 150px;
`