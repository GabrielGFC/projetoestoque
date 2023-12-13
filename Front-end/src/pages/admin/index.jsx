import React, {useState}from 'react'
import AdministradorEditColaborador from '../admin/editColaborador/index'
import AdministradorEditCaixas from '../admin/editCaixas/index'
import AdministradorHistorico from '../admin/historico/index'
import { Link} from "react-router-dom";
import "./style.css";

import boxIcon from "../../assets/box.svg";
import colaboradoresIcon from "../../assets/colaboradores.svg";
import clockIcon from "../../assets/clock.svg";
import odontoLogo from "../../assets/logo.svg";
import exitIcon from "../../assets/exit.svg";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useNavigate } from "react-router-dom";

function Admin() {
    const [changePagesAdministradorEditColaborador, setAdministradorEditColaboradorStyle] = useState({ display: "flex" });
    const [changePagesAdministradorEditCaixas, setAdministradorEditCaixasStyle] = useState({ display: "none" });
    const [changePagesAdministradorHistorico, setAdministradorHistoricoStyle] = useState({ display: "none" });
    const changePagesAdministrador1 = () => {
        setAdministradorEditColaboradorStyle({ display: "flex"});
        setAdministradorEditCaixasStyle({ display: "none" });
        setAdministradorHistoricoStyle({ display: "none" });
    }
    const changePagesAdministrador2 = () => {
        setAdministradorEditColaboradorStyle({ display: "none" });
        setAdministradorEditCaixasStyle({ display: "flex" });
        setAdministradorHistoricoStyle({ display: "none" });
    }
    const changePagesAdministrador3 = () => {
        setAdministradorEditColaboradorStyle({ display: "none" });
        setAdministradorEditCaixasStyle({ display: "none" });
        setAdministradorHistoricoStyle({ display: "flex" });
    }
    //Tooltip Id's
  const tooltipSair = (
    <Tooltip id="tooltip">
      <strong>Sair</strong>
    </Tooltip>
  );
  const tooltipHistorico = (
    <Tooltip id="tooltip">
      <strong>Histórico</strong>
    </Tooltip>
  );
  const tooltipCaixas = (
    <Tooltip id="tooltip"> 
      <strong>Saída</strong>
    </Tooltip>
  );
  const tooltipColaborador = (
    <Tooltip id="tooltip"> 
      <strong>Entrada</strong>
    </Tooltip>
  );
  //sair 
  const navigate = useNavigate();
  const deslog = () => { // ... lógica para fazer logout e limpar a matrícula do armazenamento local ...
    localStorage.removeItem('matricula');
    localStorage.removeItem('usuario');
    navigate("/login");
    
  };
  return (
    <>
        <header className="headerTop">
            <div className="headerLeft">
            <img src={odontoLogo} className="odontoLogo" alt="Odonto logo" />
            <h1>Sistema Administradores</h1>
            </div>
            <div className="headerRightColaborador">
            <ul>
                <li data-title="Entrada" onClick={changePagesAdministrador1}>
                    <OverlayTrigger placement="bottom" overlay={tooltipColaborador}>
                        <img src={colaboradoresIcon} alt="Colaborador logo" />
                    </OverlayTrigger>
                </li>
                <li data-title="Saída" onClick={changePagesAdministrador2}>
                    <OverlayTrigger placement="bottom" overlay={tooltipCaixas}>
                        <img src={boxIcon} alt="Caixas logo" />
                    </OverlayTrigger>
                </li>
                <li data-title="Histórico" onClick={changePagesAdministrador3}>
                    <OverlayTrigger placement="bottom" overlay={tooltipHistorico}>
                        <img src={clockIcon} alt="Exit logo" />
                    </OverlayTrigger>
                </li>
                <li data-title="Sair">
                    <OverlayTrigger placement="bottom" overlay={tooltipSair}>
                        <button onClick={deslog} className='deslogButton'><img src={exitIcon} alt="Sair logo" /></button>
                    </OverlayTrigger>
                </li>
            </ul>
            </div>
        </header>
        <div className="body">
            <div className="colaboradorEntradaDiv" style={changePagesAdministradorEditColaborador}>
                <AdministradorEditColaborador/>
            </div>
            <div className="colaboradorSaidaDiv" style={changePagesAdministradorEditCaixas}>
                <AdministradorEditCaixas/>
            </div>
            <div className="colaboradorHistoricoDiv" style={changePagesAdministradorHistorico}>
                <AdministradorHistorico/>
            </div>
        </div>
    </>
  )
}

export default Admin;