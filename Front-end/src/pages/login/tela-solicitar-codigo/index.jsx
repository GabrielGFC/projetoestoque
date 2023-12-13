import React, { useState } from 'react';
import "./style.css";
import LogoBlue from "../../../assets/logoBlue.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SolicitarCodigo() {
    const navigate = useNavigate();
    const sentCodes = [
        {
            matricula: 2345,
            code: 9876,
        }
    ];
    const [enteredCode, setEnteredCode] = useState('');
    const [matriculaError, setMatriculaError] = useState(false);

    const handleCodeChange = (e) => {
        setEnteredCode(e.target.value);
        setMatriculaError(false);
    };

    const handleNextButtonClick = () => {
        const codeExists = sentCodes.some((item) => item.code === parseInt(enteredCode));
        if (!codeExists) {
            setMatriculaError(true);
        } else {
            navigate("/redefinirsenha");
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
                            <h2>Código de validação</h2>
                            <div className="mudarSenhaCodigoSection">
                                <h3>Um código de verificação foi enviado para o seu e-mail. Digite-o aqui para alterar a sua senha.</h3>
                                <input placeholder="Digite o código" value={enteredCode} onChange={handleCodeChange}></input>
                                {matriculaError && <p className="matriculaError">Código inválido. Tente novamente.</p>}
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

export default SolicitarCodigo;
