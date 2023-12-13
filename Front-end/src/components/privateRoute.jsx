import React from 'react';
import { Navigate } from 'react-router-dom';
import AlunoEntrada from '../pages/alunoEntrada/indexAluno';
import Colaborador from '../pages/colaborador/index';
import Admin from '../pages/admin/index';

const PrivateRouteAluno = () => {
    var authAluno = null;
    const storedUsuarioType = localStorage.getItem('usuario');
    if (storedUsuarioType == 'aluno') {
        authAluno = true;
    }
    return authAluno ? <AlunoEntrada /> : <Navigate to="/login" />;
}

const PrivateRouteColaborador = () => {
    var authColaborador = null;
    const storedUsuarioType = localStorage.getItem('usuario');
    if (storedUsuarioType == 'colaborador') {
        authColaborador = true;
    }
    return authColaborador ? <Colaborador /> : <Navigate to="/login" />;
}

const PrivateRouteAdmin = () => {
    var authAdmin = null;
    const storedUsuarioType = localStorage.getItem('usuario');
    if (storedUsuarioType == 'admin') {
        authAdmin = true;
    }
    return authAdmin ? <Admin /> : <Navigate to="/login" />;
}
window.addEventListener('beforeunload', function() {
    localStorage.removeItem('usuario');
  });
export{ PrivateRouteAluno, PrivateRouteColaborador, PrivateRouteAdmin };
