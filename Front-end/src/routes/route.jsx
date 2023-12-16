import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AlunoEntrada from '../pages/alunoEntrada/indexAluno';
import Colaborador from '../pages/colaborador/index';
import Login from '../pages/login/tela-inicial/index';
import SolicitarDados from '../pages/login/tela-solicitar-dados/index';
import SolicitarCodigo from '../pages/login/tela-solicitar-codigo/index';
import RedefinirSenha from '../pages/login/tela-redefinir/index';
import Admin from '../pages/admin/index';
import { PrivateRouteAluno, PrivateRouteColaborador, PrivateRouteAdmin } from '../components/privateRoute';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/aluno" element={<PrivateRouteAluno />} />
        <Route path="/colaborador" element={<PrivateRouteColaborador />} />
        <Route path="/login" element={<Login />} />
        <Route path="/solicitardados" element={<SolicitarDados />} />
        <Route path="/solicitarcodigo" element={<SolicitarCodigo />} />
        <Route path="/redefinirsenha" element={<RedefinirSenha />} />
        <Route path="/admin" element={<PrivateRouteAdmin />} />
      </Routes>
    </BrowserRouter>
  )
}
export default Router