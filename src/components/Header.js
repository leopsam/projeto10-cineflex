import styled from "styled-components"

export default function Header(){
    return(
        <TopHead>
            <p>CINEFLEX</p>
        </TopHead>
    )
}

const TopHead = styled.div`
    width: 100%;
    height: 67px;
    background-color: #C3CFD9;
    display: flex;
    align-items: center;
    justify-content: center;
    p{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 34px;
    line-height: 40px;
    color: #E8833A;
    }
`