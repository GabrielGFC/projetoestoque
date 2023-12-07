import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AlunoEntrada from '../pages/alunoEntrada/indexAluno';
import Colaborador from '../pages/colaborador/index';
import Login from '../pages/login/tela-inicial/index';
import SolicitarDados from '../pages/login/tela-solicitar-dados/index';
import SolicitarCodigo from '../pages/login/tela-solicitar-codigo/index';
import RedefinirSenha from '../pages/login/tela-redefinir/index';
import Admin from '../pages/admin/index';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/aluno" element={<AlunoEntrada />} />
        <Route path="/colaborador" element={<Colaborador />} />
        <Route path="/login" element={<Login />} />
        <Route path="/solicitardados" element={<SolicitarDados />} />
        <Route path="/solicitarcodigo" element={<SolicitarCodigo />} />
        <Route path="/redefinirsenha" element={<RedefinirSenha />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
export default Router