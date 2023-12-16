import React, { useState } from 'react';
import "./style.css";
import LogoBlue from "../../../assets/logoBlue.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SolicitarDados() {
    var matriculasColaboradores = [ //banco matriculas colaboradores
        2345
    ];
    const [matricula, setMatricula] = useState('');
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate();


    const handleMatriculaChange = (e) => {
        setMatricula(e.target.value);
        setLoginError(false);
    };

    const handleNextButtonClick = () => {
        if (!matriculasColaboradores.includes(parseInt(matricula))) {
            setLoginError(true);
        } else {
            navigate("/solicitarcodigo");
        }
    };

    return (
        <>
            <div className="bodyContainerMudarSenha">
                <div className="mudarSenhaCenter">
                    <div className="mudarSenhaCard">
                        <div className="mudarSenhaCardHeader">
                            <img src={LogoBlue} alt="Logo" />
                        </div>
                        <div className="mudarSenhaCardCenter">
                            <h2>Informar dados</h2>
                            <div className="mudarSenhaDadosSection">
                                <h3>Matrícula</h3>
                                <input type="number" placeholder='Digite aqui' value={matricula} onChange={handleMatriculaChange}></input>
                                {loginError && <p className="matriculaError">Credenciais inválidas. Tente novamente.</p>}
                            </div>
                        </div>
                        <div className="mudarSenhaCardBottom">
                            <Link to="/login"><button>Cancelar</button></Link>
                            <button onClick={handleNextButtonClick}>Proximo</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SolicitarDados;
