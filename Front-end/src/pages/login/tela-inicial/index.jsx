import React, { useState } from 'react';
import "./style.css";
import DentistLogo from "../../../assets/dentist.svg";
import LogoBlue from "../../../assets/logoBlue.svg";
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [loginError, setLoginError] = useState(false);
  const navigateTo = useNavigate();

  //visibilidade senha
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleMatriculaChange = (e) => {
    setMatricula(e.target.value);
  };

  const handleSenhaChange = (e) => {
    setSenha(e.target.value);
  };
  //autenticação
  const validarLogin = () => {
    var usuariosAluno = [
      { matricula: '1234567', senha: 'use1' }, //banco alunos
    ]
    var usuariosColaborador = [
        {matricula: '2345678', senha: 'use2'} //banco colaboradores
    ];
    var usuariosAdmin = [
      {matricula: '3456789', senha: 'use3'} //banco admins
  ];
    const usuarioEncontradoAluno = usuariosAluno.find(user => user.matricula === matricula && user.senha === senha);
    const usuarioEncontradoColaborador = usuariosColaborador.find(user => user.matricula === matricula && user.senha === senha);
    const usuarioEncontradoAdmin = usuariosAdmin.find(user => user.matricula === matricula && user.senha === senha);

    if (usuarioEncontradoAluno) {
        localStorage.setItem('matricula', matricula);
        localStorage.setItem('usuario', "aluno");
        navigateTo('/aluno')
      } else if (usuarioEncontradoColaborador) {
        navigateTo('/colaborador');
        localStorage.setItem('usuario', "colaborador");
      } else if (usuarioEncontradoAdmin) {
        localStorage.setItem('usuario', "admin");
        navigateTo('/admin');
      }else {
        setLoginError(true);
      }
    };
  return (
    <>
      <div className="bodyContainer">
        <div className="loginLeft">
          <img src={DentistLogo} alt="Dentist Logo" />
          <h1>Central de Distribuição de Instrumentos e Materiais</h1>
        </div>
        <div className="loginRight">
          <div className="loginCard">
            <div className="loginCardHeader">
              <img src={LogoBlue} alt="Blue Logo" />
            </div>
            <div className="loginCardCenter">
              <h2>Login</h2>
              <div className="loginCardCenterMatricula">
                <h3>Usuário</h3>
                <input value={matricula} type="number"  onChange={handleMatriculaChange} placeholder="Digite sua matrícula"/>
              </div>
              <div className="loginCardCenterSenha">
                <h3>Senha</h3>
                <div className='divPassword'>
                  <input maxLength="4" id="password" type={isPasswordVisible ? 'text' : 'password'} placeholder="Digite sua senha" value={senha} onChange={handleSenhaChange} />
                  <span className="lnr lnr-eye" onClick={togglePasswordVisibility} />
                </div>
              </div>
              <button onClick={validarLogin}>Entrar</button>
              {loginError && <p className="loginError">Credenciais inválidas. Tente novamente.</p>}
            </div>
            <div className="loginCardBottom">
              <Link to="/solicitardados" className='linkEsqueceuSenha'><p>Esqueceu a senha</p></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;
