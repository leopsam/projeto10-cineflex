import Header from "./Header";
import Home from "../pages/Home";
import Sessoes from "../pages/Sessoes";
import Assentos from "../pages/Assentos";
import Sucesso from "../pages/Sucesso";
import { BrowserRouter, Routes, Route } from "react-router-dom"

export default function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sessoes/37" element={<Sessoes />} />
      <Route path="/assentos/240" element={<Assentos />} />
      <Route path="/sucesso" element={<Sucesso />} />
    </Routes>
  </BrowserRouter>
  );
}