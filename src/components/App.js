import Header from "./Header";
import Home from "../pages/Home";
import Sessoes from "../pages/Sessoes";
import Assentos from "../pages/Assentos";
import Sucesso from "../pages/Sucesso";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"

export default function App() {
  const [dia, setDia] = useState(undefined)
  const [filme, setFilme] = useState(undefined)
  const [selecao, setSelecao] = useState([])

  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sessoes/:filmeId" element={<Sessoes />} />
      <Route path="/assentos/:diaId" element={<Assentos 
        dia={dia} 
        setDia={setDia} 
        filme={filme} 
        setFilme={setFilme}
        selecao={selecao}
        setSelecao={setSelecao}
      />} />
      <Route path="/sucesso/:reservaName/:reservaCpf/" element={<Sucesso 
        dia={dia} 
        filme={filme}
        selecao={selecao}
        setSelecao={setSelecao}
      />} />
    </Routes>
  </BrowserRouter>
  );
}