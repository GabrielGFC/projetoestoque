import React, { useState } from 'react';
import ColaboradorEntrada from './entrada';
import ColaboradorSaida from './saida';
import ColaboradorHistorico from './historico';
import { Link } from "react-router-dom";
import "./style.css";
import removeIcon from "../../assets/remove.svg";
import clockIcon from "../../assets/clock.svg";
import odontoLogo from "../../assets/logo.svg";
import exitIcon from "../../assets/exit.svg";
import addIcon from "../../assets/add.svg";

function Colaborador() {
  const [activePage, setActivePage] = useState('entrada');

  const changePage = (page) => {
    setActivePage(page);
  };

  return (
    <>
      <header className="headerTop">
        <div className="headerLeft">
          <img src={odontoLogo} className="odontoLogo" alt="Odonto logo" />
          <h1>Sistema Colaboradores</h1>
        </div>
        <div className="headerRightColaborador">
          <ul>
            <li data-title="Entrada" onClick={() => changePage('entrada')}>
              <img src={addIcon} alt="Entrada logo" />
            </li>
            <li data-title="Saída" onClick={() => changePage('saida')}>
              <img src={removeIcon} alt="Saída logo" />
            </li>
            <li data-title="Histórico" onClick={() => changePage('historico')}>
              <img src={clockIcon} alt="Histórico logo" />
            </li>
            <li data-title="Sair">
              <Link to="/login"><img src={exitIcon} alt="Sair logo" /></Link>
            </li>
          </ul>
        </div>
      </header>
      <div className="body">
        <div className="colaboradorEntradaDiv" style={{ display: activePage === 'entrada' ? 'flex' : 'none' }}>
          <ColaboradorEntrada />
        </div>
        <div className="colaboradorSaidaDiv" style={{ display: activePage === 'saida' ? 'flex' : 'none' }}>
          <ColaboradorSaida />
        </div>
        <div className="colaboradorHistoricoDiv" style={{ display: activePage === 'historico' ? 'flex' : 'none' }}>
          <ColaboradorHistorico />
        </div>
      </div>
    </>
  )
}

export default Colaborador;
