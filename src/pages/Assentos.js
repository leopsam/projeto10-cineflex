import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import load from "../assets/Loading.gif"
import { Link, useNavigate } from "react-router-dom"

export default function Assentos(){
    const { diaId } = useParams()
    const [cadeira, setCadeira] = useState(undefined)
    const [filme, setFilme] = useState(undefined)
    const [dia, setDia] = useState(undefined)
    const [selecao, setSelecao] = useState([])
    const [name, setName] = useState("")
    const [ids, setIds] = useState([])
    const [cpf, setCpf] = useState("")

    const disponivelBorda = "#C3CFD9"
    const indisponivelBorda = "#F7C52B"
    const selecionadoBorda = "#0E7D71"

    const disponivel = "#C3CFD9"
    const indisponivel = "#FBE192"
    const selecionado = "#1AAE9E"

    const navigate = useNavigate()
    //console.log(cadeira)
    //console.log(selecao)
    console.log(ids)

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${diaId}/seats`)
        promise.then((res) => (setCadeira(res.data.seats), setDia(res.data.day), setFilme(res.data)))
        promise.catch((err) => console.log(err.response.data))
      }, [])

      function reservarFilme(e){
        e.preventDefault()
        const reserva = { ids: ids, name: name, cpf: cpf }

        const url_post = "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many"
        const promise = axios.post(url_post, reserva)
        promise.then(res => {
            console.log(res.config.data)
            //navigate("/sucesso")
          })
        promise.catch(err => console.log(err.response.data))

        setName("")
        setIds([])
        setCpf("")
      }

      function botoes(assento){
        if(assento.isAvailable === false){
            return indisponivel
        }else if(selecao.includes(assento.name)){
            return selecionado
        }else if(!selecao.includes(assento.name)){
            return disponivel
        }        
      }

      function botoesBorda(assento){
        if(assento.isAvailable === false){
            return indisponivelBorda
        }else if(selecao.includes(assento.name)){
            return selecionadoBorda
        }else if(!selecao.includes(assento.name)){
            return disponivelBorda
        }        
      }
     
      function selecaoAssento(assento, idCad){
        if( assento.isAvailable == true){
            console.log("Deu ruim")
        }else if(!selecao.includes(assento) ){       

            let novoArray = [...selecao, assento]
            setSelecao(novoArray)

            let novoArrayId = [...ids, idCad]
            setIds(novoArrayId)

        }else{
            let novoArray = [...selecao]
            novoArray.splice(novoArray.indexOf(assento), 1);
            setSelecao(novoArray)

            let novoArrayId = [...ids]
            novoArrayId.splice(novoArrayId.indexOf(idCad), 1);
            setIds(novoArrayId)
        }        
      }

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
            <AssentosBotao 
                key={cad.name} 
                cor={botoes(cad)} 
                corBordar={botoesBorda(cad)} 
                onClick={(cad.isAvailable === true) ? 
                    () => selecaoAssento(cad.name, cad.id) 
                    : 
                    () => alert("Esse assento não está disponível")}
            >
                    {cad.name}
            </AssentosBotao> 
            ))}
        </AssentosContainer>

        <ReferenciaBotao>
            <ReferenciaBotaoUnid>
                <AssentosBotao cor={selecionado} corBordar={selecionadoBorda} />
                <p>Selecionado</p>
            </ReferenciaBotaoUnid>
            <ReferenciaBotaoUnid>
                <AssentosBotao cor={disponivel} corBordar={disponivelBorda} />
                <p>Disponível</p>
            </ReferenciaBotaoUnid>
            <ReferenciaBotaoUnid>
                <AssentosBotao cor={indisponivel} corBordar={indisponivelBorda} />
                <p>Indisponível</p>
            </ReferenciaBotaoUnid>
        </ReferenciaBotao>

        <FormContainer onSubmit={reservarFilme}>
            <label htmlFor="name">Nome do comprador:</label>
            <input
                id="name"
                type="text"
                placeholder="Digite seu nome..."
                value={name}
                onChange={e => setName(e.target.value)}
                required
            />
            
            <label htmlFor="cpf">CPF do comprador:</label>
            <input
                id="cpf"
                type="text"
                placeholder="Digite seu CPF..."
                value={cpf}
                onChange={e => setCpf(e.target.value)}
                required
            />

            <ContainerBotao>
                <button>Reservar assento(s)</button>
            </ContainerBotao>
        </FormContainer>

        <FooterFilme>
            <FundoCapa>
                <img src={filme.movie.posterURL} alt={filme.movie.title}/>
            </FundoCapa > 
            <div>
                <p>{filme.movie.title}</p> 
                <p>{filme.day.weekday} - {filme.name}</p> 
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
        background-color: ${props => props.cor};
        border: 1px solid ${props => props.corBordar};
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
        cursor: pointer;
`
const ReferenciaBotao = styled.div`
    display: flex;
    justify-content: center;
`
const ReferenciaBotaoUnid = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 15px;
    p{  
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;    
    letter-spacing: -0.013em;
    color: #4E5A65;
    }
    
`
const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    margin: 40px 20px;
    label{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 21px; 
        color: #293845;
        margin-top: 10px;
    }
    input{        
        box-sizing: border-box;
        width: 327px;
        height: 51px; 
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 3px;
    }
    input::placeholder{
        font-family: 'Roboto';
        font-style: italic;
        font-weight: 400;
        font-size: 18px;
        line-height: 21px; 
        color: #AFAFAF;
        padding-left: 10px;
    }
`
const ContainerBotao = styled.div`
    display: flex;
    justify-content: center;
    margin: 60px 0 140px;
    button{
        width: 225px;
        height: 42px;
        background: #E8833A;
        border-radius: 3px;
        border: none;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        letter-spacing: 0.04em;
        color: #FFFFFF;
    } 
        
    
`