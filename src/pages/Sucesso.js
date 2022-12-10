import { useParams } from "react-router-dom"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"

export default function Sucesso(props){
    const { dia, filme, selecao, setSelecao } = props
    const { reservaName, reservaCpf } = useParams()
    const navigate = useNavigate()

    function retorno(){
        navigate("/")
        setSelecao([])
    }    

    return(
        <>
        <TitulaPage>
            <p>Pedido feito</p>
            <p>com sucesso!</p>
        </TitulaPage>

        <ContainerReserva>
            <ItemReserva data-test="movie-info">
                <h1>Filme e sessão</h1>
                <p>{filme.movie.title}</p>
                <p>{dia.date} {filme.name}</p>
            </ItemReserva>
            <ItemReserva data-test="seats-info">
                <h1>Ingressos</h1>
                {selecao.map(assento => (<p key={assento}>Assento {assento}</p>))}
            </ItemReserva>
            <ItemReserva data-test="client-info">
                <h1>Comprador</h1>
                <p>Nome: {reservaName}</p>
                <p>CPF: {reservaCpf}</p> 
            </ItemReserva>
        </ContainerReserva>
        <ContainerBotao>
                <button data-test="go-home-btn" onClick={() => retorno()}>Voltar pra Home</button>
            </ContainerBotao>
        </>
    )
}

const TitulaPage = styled.div`
    width: 100%;
    height: 110px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    letter-spacing: 0.04em;
    color: #247A6B;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const ContainerReserva = styled.div`
    margin: 15px 30px;
`
const ItemReserva = styled.div`
    margin-bottom: 40px;
    h1{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;       
        letter-spacing: 0.04em;
        color: #293845;
        margin-bottom: 5px;
    }
    p{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 22px;
        line-height: 26px;
        letter-spacing: 0.04em;
        color: #293845;    
    }
`
const ContainerBotao = styled.div`
    display: flex;
    justify-content: center;
    margin: 80px 0 140px;
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

