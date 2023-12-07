import React, { useState, useEffect } from "react";
import "./styleAluno.css";
import odontoLogo from "../alunoEntrada/../../assets/logo.svg";
import exitIcon from "../alunoEntrada/../../assets/exit.svg";
import addIcon from "../alunoEntrada/../../assets/add.svg";
import { Link} from "react-router-dom";


function AlunoEntrada() {
  // MANAGE INFO
  const [tableData, setTableData] = useState([]);
  const [valueFamily, setValueFamily] = useState("0");
  const [quantSelectorDisabled, changeStatus] = useState(true);
  const [valueQuant, setValueQuant] = useState("0");
  const [buttonsList, setSecondButtonStyle] = useState({ display: "none" });
  const [alertAddStyle, setAlertStyle] = useState({ display: "none" });
  
  const addMovement = () => { // ... lógica para adicionar um novo movimento ...
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
  const detectEntryFamily = (e) => {  // ... lógica para detectar a família selecionada ...
    const selectedFamily = e.target.value;
    setValueFamily(selectedFamily);
    if (selectedFamily !== "0") {
      changeSelectorState();
    }
  };
  const changeSelectorState = () => { // ... lógica para habilitar o seletor de quantidade ...
    changeStatus(false);
  };

  const detectEntryQuant = (e) => { // ... lógica para detectar o valor selecionado no seletor de quantidade ...
    const selectedQuant = e.target.value;
    setValueQuant(selectedQuant);
  };

  const renderOptionsQuant = () => { // ... lógica para gerar as opções de quantidade ...
    return (
      <>
        <option value="0" disabled>
          Selecionar
        </option>
        {[...Array(20).keys()].map((value) => (
          <option key={value + 1} value={value + 1}>
            {value + 1}
          </option>
        ))}
      </>
    );
  };
  
  const tableReportContent = () => { // ... lógica para gerar o conteúdo da tabela com as caixas ...
    return tableData.map((item, index) => (
      <tbody key={index}>
        <tr>
          <td><p><span>Família:</span> {item.family}</p><p><span>Quantidade de itens:</span> {item.quantity}</p></td>
        </tr>
      </tbody>
    ));
  };
  
  const buttonItemAdded = () => { // ... lógica para o botão "Adicionar" ...
    if (valueQuant !== "0") {
      setSecondButtonStyle({ display: "flex" });
      addMovement();
      changeStatus(true);
      setAlertStyle({ display: "none" });
    } else {
      setAlertStyle({ display: "flex" });
    }
  };
  
  const buttonItemRemoved = () => { // ... lógica para o botão "Cancelar" ...
    setTableData([]);
    setSecondButtonStyle({ display: "none" });
    setValueFamily("0");
    setValueQuant("0");
    changeStatus(true);
    setAlertStyle({ display: "none" });
  };
  
  const sendRequestoToColaboratorButton = () => { // ... lógica para enviar a solicitação para o colaborador ...
    const finalDataMovement = [
      {
        "matricula": matricula,
        "caixas": tableData
      }
    ];
    console.log(finalDataMovement);
    buttonItemRemoved()
  }


  const [matricula, setMatricula] = useState('');

  useEffect(() => { // ... lógica para recuperar a matrícula do armazenamento local ...
    const storedMatricula = localStorage.getItem('matricula');
    if (storedMatricula) {
      setMatricula(storedMatricula);
      console.log(storedMatricula)
    }
  }, []);
  
  const handleLogout = () => { // ... lógica para fazer logout e limpar a matrícula do armazenamento local ...
    localStorage.removeItem('matricula');
    console.log(localStorage)
    console.log(finalDataMovement);
  };

  return (
    <>
     {/* ... estrutura do cabeçalho ... */}
      <header className="headerTop">
        <div className="headerLeft">
          <img src={odontoLogo} className="odontoLogo" alt="Odonto logo" />
          <h1>Sistema Alunos</h1>
        </div>
        <div className="headerRightAluno">
          <ul>
            <li data-title="Sair">
              <Link to="/login" onClick={handleLogout}><img src={exitIcon} alt="Exit logo" /></Link>
            </li>
          </ul>
        </div>
      </header>
      <div className="body">
        <div className="contentTop">
          {/* ... estrutura do conteúdo principal ... */}
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
                  <option value="Cirúrgica">Cirúrgica</option>
                  <option value="Dentística">Dentística</option>
                  <option value="Moldeira de prótese">Moldeira de prótese</option>
                  <option value="Família 4">Familia 04</option>
                  <option value="Família 5">Família 05</option>
                  <option value="Família 6">Família 06</option>
                  <option value="Família 7">Família 07</option>
                  <option value="Família 8">Família 08</option>
                  <option value="Família 9">Família 9</option>
                  <option value="Família 10">Família 10</option>
                  <option value="Família 11">Família 11</option>
                  <option value="Família 12">Família 12</option>
                  <option value="Família 13">Família 13</option>
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
            <Link to="../login" onClick={sendRequestoToColaboratorButton}  className="buttonSendToColaborator"><button>Confirmar</button></Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default AlunoEntrada;
