import React, { useState } from 'react';
import ColaboradorEntrada from './entrada';
import ColaboradorSaida from './saida';
import ColaboradorHistorico from './historico';
import "./style.css";
import removeIcon from "../../assets/remove.svg";
import clockIcon from "../../assets/clock.svg";
import odontoLogo from "../../assets/logo.svg";
import exitIcon from "../../assets/exit.svg";
import addIcon from "../../assets/add.svg";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useNavigate } from "react-router-dom";


function Colaborador() {
  const [activePage, setActivePage] = useState('entrada');

  const changePage = (page) => {
    setActivePage(page);
  };

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
  const tooltipSaida = (
    <Tooltip id="tooltip"> 
      <strong>Saída</strong>
    </Tooltip>
  );
  const tooltipEntrada = (
    <Tooltip id="tooltip"> 
      <strong>Entrada</strong>
    </Tooltip>
  );
  //sair 
  const navigate = useNavigate();
  const deslog = () => {
    localStorage.removeItem('matricula');
    localStorage.removeItem('usuario');
    localStorage.removeItem('entryRequest');
    var entryRequestReturn = localStorage.getItem('entryRequest')
    console.log(entryRequestReturn)
    navigate("/login");
    
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
              <OverlayTrigger placement="bottom" overlay={tooltipEntrada}>
                <img src={addIcon} alt="Entrada logo" />
              </OverlayTrigger>
            </li>
            <li data-title="Saída" onClick={() => changePage('saida')}>
              <OverlayTrigger placement="bottom" overlay={tooltipSaida}>
                <img src={removeIcon} alt="Saída logo" />
              </OverlayTrigger>
            </li>
            <li data-title="Histórico" onClick={() => changePage('historico')}>
              <OverlayTrigger placement="bottom" overlay={tooltipHistorico}>
                <img src={clockIcon} alt="Histórico logo" />
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
