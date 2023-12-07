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

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleMatriculaChange = (e) => {
    setMatricula(e.target.value);
  };

  const handleSenhaChange = (e) => {
    setSenha(e.target.value);
  };

  const validarLogin = () => {
    const usuariosAluno = [
      { matricula: '123', senha: 'senha123' },
    ]
    const usuariosColaborador = [
        {matricula: '1234', senha: 'senha1234'}
    ];
    const usuariosAdmin = [
      {matricula: '12345', senha: 'senha12345'}
  ];

    const usuarioEncontradoAluno = usuariosAluno.find(user => user.matricula === matricula && user.senha === senha);
    const usuarioEncontradoColaborador = usuariosColaborador.find(user => user.matricula === matricula && user.senha === senha);
    const usuarioEncontradoAdmin = usuariosAdmin.find(user => user.matricula === matricula && user.senha === senha);

    if (usuarioEncontradoAluno) {
        localStorage.setItem('matricula', matricula);
        navigateTo('/aluno');
        console.log(matricula);
      } else if (usuarioEncontradoColaborador) {
        navigateTo('/colaborador');
      } else if (usuarioEncontradoAdmin) {
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
                <input value={matricula} onChange={handleMatriculaChange} placeholder="Digite sua matrícula"/>
              </div>
              <div className="loginCardCenterSenha">
                <h3>Senha</h3>
                <div className='divPassword'>
                  <input id="password" type={isPasswordVisible ? 'text' : 'password'} placeholder="Digite sua senha" value={senha} onChange={handleSenhaChange} />
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
