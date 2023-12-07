import React from 'react'
import "./style.css";
import LogoBlue from "../../../assets/logoBlue.svg";
import { Link } from "react-router-dom";

function SolicitarDados() {
    return (
        <>
            <div className="bodyContainerMudarSenha">
                <div className="mudarSenhaCenter">
                    <div className="mudarSenhaCard">
                        <div className="mudarSenhaCardHeader">
                            <img src={LogoBlue} />
                        </div>
                        <div className="mudarSenhaCardCenter">
                            <h2>Informar dados</h2>
                            <div className="mudarSenhaDadosSection">
                                <h3>Matrícula ou E-mail</h3>
                                <input placeholder='Digite aqui'></input>
                            </div>
                        </div>
                        <div className="mudarSenhaCardBottom">
                            <Link to="/login"><button>Cancelar</button></Link>
                            <Link to="/solicitarcodigo"><button>Proximo</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SolicitarDados