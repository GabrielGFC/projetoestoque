import React, { useState, useEffect } from "react";
import "./styleAluno.css";
import odontoLogo from "../alunoEntrada/../../assets/logo.svg";
import exitIcon from "../alunoEntrada/../../assets/exit.svg";
import addIcon from "../alunoEntrada/../../assets/add.svg";
import { Link } from "react-router-dom";
import Toast from 'react-bootstrap/Toast';
import { useNavigate } from "react-router-dom";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';



function AlunoEntrada() {
  const [tableData, setTableData] = useState([]);
  const [valueFamily, setValueFamily] = useState("0");
  const [quantSelectorDisabled, changeStatus] = useState(true);
  const [valueQuant, setValueQuant] = useState("0");
  const [buttonsList, setSecondButtonStyle] = useState({ display: "none" });
  const [alertAddStyle, setAlertStyle] = useState({ display: "none" });
  const [matricula, setMatricula] = useState('');
  const navigate = useNavigate();

  //adicionar um novo movimento
  const addMovement = () => {
    const newMovement = {
      family: valueFamily,
      quantity: parseInt(valueQuant, 10),
    };
    const existingIndex = tableData.findIndex((item) => item.family === valueFamily);

    if (existingIndex !== -1) {
      const updatedTableData = [...tableData];
      updatedTableData[existingIndex].quantity = parseInt(valueQuant, 10);
      setTableData(updatedTableData);
    } else {
      setTableData((prevData) => [...prevData, newMovement]);
    }
    setValueFamily("0");
    setValueQuant("0");
    changeStatus(true);
  };

  //detectar a família selecionada
  const detectEntryFamily = (e) => {
    const selectedFamily = e.target.value;
    setValueFamily(selectedFamily);
    if (selectedFamily !== "0") {
      changeSelectorState();
    }
  };
  //gerar opcoes de familias
  var familyOptions = [ //banco familias
    {
      familia: "Dentística",
      quantMax: 20,
      quantMin: 10
    },
    {
      familia: "Cirúrgica",
      quantMax: 15,
      quantMin: 10
    },
    {
      familia: "Moldeira de prótese",
      quantMax: 9,
      quantMin: 1
    }
  ]
  var alunoDados = {
    "matricula": 1234567,
    "nome": "Lucas Fernandes",
    "periodo": 10,
    "box": 181,
  }
  //habilitar o seletor de quantidade
  const changeSelectorState = () => {
    changeStatus(false);
  };


  //detectar o valor selecionado no seletor de quantidade
  const detectEntryQuant = (e) => {
    const selectedQuant = e.target.value;
    setValueQuant(selectedQuant);
  };


  //gerar as opções de quantidade
  const renderOptionsQuant = () => {
    if (valueFamily !== "0") {
      const selectedFamily = familyOptions.find((option) => option.familia === valueFamily);
      return (
        <>
          <option value="0" disabled>
            Selecionar
          </option>
          {[...Array(selectedFamily.quantMax - selectedFamily.quantMin + 1).keys()].map((value) => (
            <option key={value + selectedFamily.quantMin} value={value + selectedFamily.quantMin}>
              {value + selectedFamily.quantMin}
            </option>
          ))}
        </>
      );
    } else {
      return (
        <option value="0" disabled>
          Selecionar
        </option>
      );
    }
  };

  //gerar o conteúdo da tabela com as caixas
  const tableReportContent = () => {
    return tableData.map((item, index) => (
      <tbody key={index}>
        <tr>
          <td><p><span>Família:</span> {item.family}</p><p><span>Quantidade de itens:</span> {item.quantity}</p></td>
        </tr>
      </tbody>
    ));
  };

  //botão "Adicionar"
  const buttonItemAdded = () => {
    if (valueQuant !== "0") {
      setSecondButtonStyle({ display: "flex" });
      addMovement();
      changeStatus(true);
      setAlertStyle({ display: "none" });
    } else {
      setAlertStyle({ display: "flex" });
    }
  };

  //botão "Cancelar"
  const buttonItemRemoved = () => {
    setTableData([]);
    setSecondButtonStyle({ display: "none" });
    setValueFamily("0");
    setValueQuant("0");
    changeStatus(true);
    setAlertStyle({ display: "none" });
  };

  //enviar a solicitação para o colaborador
  const sendRequestToColaboratorButton = () => {
    const finalDataMovement = { "aluno": alunoDados, "caixas": tableData };
    const storedDataEntryRequest = JSON.parse(localStorage.getItem('entryRequest')) || [];
    const formattedData = {
      aluno: finalDataMovement.aluno,
      caixas: finalDataMovement.caixas
    };
    storedDataEntryRequest.push(formattedData);
    localStorage.setItem('entryRequest', JSON.stringify(storedDataEntryRequest));

    buttonItemRemoved();
    setShow({ display: "block" });
    setTimeout(() => {
      navigate("/login");
      const storedUsuario = JSON.parse(localStorage.getItem('usuario'));
      if (storedUsuario) {
        delete storedUsuario.aluno;
        localStorage.setItem('usuario', JSON.stringify(storedUsuario));
      }
    }, 6000);
  };


  //recuperar a matrícula do armazenamento local
  useEffect(() => {
    const storedMatricula = localStorage.getItem('matricula');
    if (storedMatricula) {
      setMatricula(storedMatricula);
    }
  }, []);


  //logout e limpar a matrícula do armazenamento local
  const handleLogout = () => {
    localStorage.removeItem('matricula');
    const storedUsuario = JSON.parse(localStorage.getItem('usuario'));
    if (storedUsuario) {
      delete storedUsuario.aluno;
      localStorage.setItem('usuario', JSON.stringify(storedUsuario));
    }
    console.log(localStorage)
    console.log(finalDataMovement);
  };
  const [show, setShow] = useState({ display: "none" });

  //Tooltip Id's
  const tooltipSair = (
    <Tooltip id="tooltip">
      <strong>Sair</strong>
    </Tooltip>
  );
  return (
    <>
      <header className="headerTop">
        <div className="headerLeft">
          <img src={odontoLogo} className="odontoLogo" alt="Odonto logo" />
          <h1>Sistema Alunos</h1>
        </div>
        <div className="headerRightAluno">
          <ul>
            <li data-title="Sair">
              <OverlayTrigger placement="bottom" overlay={tooltipSair}>
                <Link to="/login" onClick={handleLogout}><img src={exitIcon} alt="Exit logo" /></Link>
              </OverlayTrigger>
            </li>
          </ul>
        </div>
      </header>
      <div className="body" >
        <div className="containerToast" style={show}>
          <Toast onClose={() => setShow({ display: "none" })} delay={100} autohide>
            <Toast.Body>Pedido enviado com sucesso !<br />Você será desconectado.</Toast.Body>
          </Toast>
        </div>
        <div className="contentTop">
          {/*conteúdo principal*/}
          <img src={addIcon} className="addIcon" alt="Add icon" />
          <h2>
            Registrar <span>entrada</span> de caixas
          </h2>
        </div>
        <div className="contentCenter">
          <div className="contentCenterMiddle">
            <div className="contentCenterMiddleLeft">
              <h3>Informações</h3>
              <div className="familyCard">
                <h4>Família</h4>
                <select value={valueFamily} onChange={detectEntryFamily}>
                  <option value="0" disabled>
                    Selecionar
                  </option>
                  {familyOptions.map((option) => (
                    <option key={option.familia} value={option.familia}>
                      {option.familia}
                    </option>
                  ))}
                </select>
              </div>
              <div className="quantCard">
                <h4>Quantidade de itens presentes na caixa</h4>
                <select disabled={quantSelectorDisabled} value={valueQuant} onChange={detectEntryQuant}>
                  {renderOptionsQuant()}
                </select>
              </div>
              <button onClick={buttonItemAdded}>Adicionar</button>
              <p className="alertAdd" style={alertAddStyle}>Todos os campos devem ser preenchidos*</p>
            </div>
            <div className="contentCenterMiddleRight">
              <h3>Descrição do pedido</h3>
              <div className="reportCard">
                <table className="reportTable" id="reportTable">
                  {tableReportContent()}
                </table>
              </div>
            </div>
          </div>
          <div className="contentBottom" style={buttonsList}>
            <button onClick={buttonItemRemoved}>Cancelar</button>
            <button onClick={sendRequestToColaboratorButton} className="buttonSendToColaborator">Confirmar</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AlunoEntrada;
