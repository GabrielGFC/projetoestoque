import React from 'react'
import "./style.css";
import LogoBlue from "../../../assets/logoBlue.svg";
import { Link } from "react-router-dom";

function SolicitarCodigo() {
  return (
    <>
        <div className="bodyContainerMudarSenha">
            <div className="mudarSenhaCenter">
                <div className="mudarSenhaCard">
                    <div className="mudarSenhaCardHeader">
                        <img src={LogoBlue}/>
                    </div>
                    <div className="mudarSenhaCardCenter">
                        <h2>Código de validação</h2>
                        <div className="mudarSenhaCodigoSection">
                            <h3>Um código de verificação foi enviado para o seu e-mail. Digite-o aqui para alterar a sua senha.</h3>
                            <input placeholder="Digite o código"></input>
                        </div>
                    </div>
                    <div className="mudarSenhaCardBottom">
                            <Link to="/login"><button>Cancelar</button></Link>
                            <Link to="/redefinirsenha"><button>Proximo</button></Link>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default SolicitarCodigo