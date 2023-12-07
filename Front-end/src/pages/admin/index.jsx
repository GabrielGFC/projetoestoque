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
                    <img src={colaboradoresIcon} alt="Colaborador logo" />
                </li>
                <li data-title="Saída" onClick={changePagesAdministrador2}>
                    <img src={boxIcon} alt="Caixas logo" />
                </li>
                <li data-title="Histórico" onClick={changePagesAdministrador3}>
                    <img src={clockIcon} alt="Exit logo" />
                </li>
                <li data-title="Sair">
                    <Link to="/login"><img src={exitIcon} alt="Exit logo" /></Link>
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