import React, { useState } from 'react'
import "./style.css";
import LogoBlue from "../../../assets/logoBlue.svg";
import { Link } from "react-router-dom";
import Toast from 'react-bootstrap/Toast';
import { useNavigate } from "react-router-dom";

function RedefinirSenha() {
    //declaracao
    const [isPasswordVisible1, setIsPasswordVisible1] = useState(false);
    const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
    const [passwordNew, setPasswordNew] = useState('');
    const [passwordNewAgain, setPasswordNewAgain] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [show, setShow] = useState({ display: "none" });
    const navigate = useNavigate();
    //funcoes
    const togglePasswordVisibility1 = () => {
        setIsPasswordVisible1((prev) => !prev);
    };
    const togglePasswordVisibility2 = () => {
        setIsPasswordVisible2((prev) => !prev);
    };

    const handlePasswordNewChange = (e) => {
        setPasswordNew(e.target.value);
        setShowErrorMessage(e.target.value.length < 4);
        setPasswordsMatch(passwordNewAgain === e.target.value);
    };

    const handlePasswordNewAgainChange = (e) => {
        setPasswordNewAgain(e.target.value);
        setPasswordsMatch(passwordNew === e.target.value);
    };

    const passwordRightGoLoginPage = () => {
        if (showErrorMessage === false && passwordsMatch === true) {
            setShow({ display: "block" });
            setTimeout(() => {
                navigate("/login");
            }, 6000);
        }

    }
    return (
        <>
            <div className="bodyContainerMudarSenha">
                <div className="containerToast" style={show}>
                    <Toast onClose={() => setShow({ display: "none" })} delay={10000} autohide>
                        <Toast.Body>Senha alterada com sucesso !<br />Você será redirecionado para a tela inicial.</Toast.Body>
                    </Toast>
                </div>
                <div className="mudarSenhaCenter">
                    <div className="mudarSenhaCard">
                        <div className="mudarSenhaCardHeader">
                            <img src={LogoBlue} />
                        </div>
                        <div className="mudarSenhaCardCenter">
                            <h2>Redefinir senha</h2>
                            <div className="mudarSenhaNewSection">
                                <h3>Nova senha</h3>
                                <div className='divPassword'>
                                    <input
                                        id="passwordNew"
                                        type={isPasswordVisible1 ? 'text' : 'password'}
                                        placeholder="Digite sua senha"
                                        onChange={handlePasswordNewChange}
                                    />
                                    <span className="lnr lnr-eye" onClick={togglePasswordVisibility1} />
                                </div>
                            </div>
                            <div className="mudarSenhaNewAgainSection">
                                <h3>Confirme a nova senha</h3>
                                <div className='divPassword'>
                                    <input
                                        id="passwordNewAgain"
                                        type={isPasswordVisible2 ? 'text' : 'password'}
                                        placeholder="Digite sua senha"
                                        onChange={handlePasswordNewAgainChange}
                                    />
                                    <span className="lnr lnr-eye" onClick={togglePasswordVisibility2} />
                                </div>
                            </div>
                            {showErrorMessage && (
                                <p className='alertNewSenha'>A senha deve ter pelo menos 4 dígitos.</p>
                            )}
                            {!passwordsMatch && (
                                <p className='alertNewSenha'>As senhas não coincidem.</p>
                            )}
                        </div>
                        <div className="mudarSenhaCardBottom">
                            <Link to="/login"><button>Cancelar</button></Link>
                            <button onClick={passwordRightGoLoginPage}>Proximo</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RedefinirSenha