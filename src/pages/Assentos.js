import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import load from "../assets/Loading.gif"
import { Link } from "react-router-dom"

export default function Assentos(){
    const { diaId } = useParams()
    const [cadeira, setCadeira] = useState(undefined)
    const [dia, setDia] = useState(undefined)
    console.log(cadeira)
    //console.log(dia)

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${diaId}/seats`)
        promise.then((res) => (setCadeira(res.data), setDia(res.data.day)))
        promise.catch((err) => console.log(err.response.data))
      }, [])

      if (cadeira === undefined) {
        return (
            <LoadingTela>
                <img src={load} alt="Carregando..."/>
            </LoadingTela>            
        )
      }

    return(
        <> 
        <TitulaPage>
            <p>Selecione o(s) assento(s)</p>
        </TitulaPage>
        
        <AssentosContainer>
        {cadeira.map(cad =>(
            
            <AssentosBotao key={cad.seats.name}>{cad.seats.name}</AssentosBotao>
            
                ))}          
        
        </AssentosContainer>
        <FooterFilme>
            <FundoCapa>
                <img src={cadeira.movie.posterURL} alt={cadeira.movie.title}/>
            </FundoCapa > 
            <div>
                <p>{cadeira.movie.title}</p> 
                <p>{cadeira.day.weekday} - {cadeira.name}</p> 
            </div>                                      
        </FooterFilme>
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
const AssentosContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0 15px;    
`
const AssentosBotao = styled.button`
        width: 26px;
        height: 26px;
        background-color: #C3CFD9;
        border: 1px solid #808F9D;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;              
        color: #000000; 
        margin: 10px 5px;
`