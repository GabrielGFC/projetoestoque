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
import { api } from '../../service';

function AlunoEntrada() {
  const [show, setShow] = useState({ display: "none" });
  const [tableData, setTableData] = useState([]);
  const [valueFamily, setValueFamily] = useState("0");
  const [quantSelectorDisabled, changeStatus] = useState(true);
  const [valueQuant, setValueQuant] = useState("0");
  const [buttonsList, setSecondButtonStyle] = useState({ display: "none" });
  const [alertAddStyle, setAlertStyle] = useState({ display: "none" });
  const navigate = useNavigate();
  const [loadedFamilyOptions, setLoadedFamilyOptions] = useState([]);
  var alunoDados = {
    "nome": "Lucas Fernandes",
    "periodo": 10,
    "box": 181,
  }
  var alunoMatricula = 7654321;

  const finalDataMovement = { aprovacao: 'false', idCaixa: 1,  matricula: alunoMatricula };
  const newMovement = { familia: valueFamily, quantidade: parseInt(valueQuant, 10) };

  // Adicionar um novo movimento
  const addMovement = () => {
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

  // Detectar a família selecionada
  const detectEntryFamily = (e) => {
    const selectedFamily = e.target.value;
    setValueFamily(selectedFamily);
    if (selectedFamily !== "0") {
      changeSelectorState();
    }
  };

  // Habilitar o seletor de quantidade
  const changeSelectorState = () => {
    changeStatus(false);
  };

  // Detectar o valor selecionado no seletor de quantidade
  const detectEntryQuant = (e) => {
    const selectedQuant = e.target.value;
    setValueQuant(selectedQuant);
  };

  async function getFamilias() {
    await api.get('/familia')
        .then(response => {
          setLoadedFamilyOptions(response.data);
        })
        .catch(error => {
          console.log(error);
          alert("Erro");
        })
  }
  // Gerar as opções de quantidade
  const renderOptionsQuant = () => {
    useEffect(() => {
      // Buscar familyOptions da API
      getFamilias();
    }, []);

    if (valueFamily !== "0") {
      const selectedFamily = loadedFamilyOptions.find((option) => option.nome === valueFamily);
      return (
        <>
          <option value="0" disabled>
            Selecionar
          </option>
          {[...Array (Number(selectedFamily.quantMax) - Number(selectedFamily.quantMin) + 1).keys()].map((value) => (
            <option key={value + parseInt(selectedFamily.quantMin)} value={value + parseInt(selectedFamily.quantMin)}>
              {value + parseInt(selectedFamily.quantMin)}
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


  // Gerar o conteúdo da tabela com as caixas
  const tableReportContent = () => {
    return tableData.map((item, index) => (
      <tbody key={index}>
        <tr>
          <td><p><span>Família:</span> {item.familia}</p><p><span>Quantidade de itens:</span> {item.quantidade}</p></td>
        </tr>
      </tbody>
    ));
  };

  // Botão "Adicionar"
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

  // Botão "Cancelar"
  const buttonItemRemoved = () => {
    setTableData([]);
    setSecondButtonStyle({ display: "none" });
    setValueFamily("0");
    setValueQuant("0");
    changeStatus(true);
    setAlertStyle({ display: "none" });
  };

  // Enviar a solicitação para o colaborador usando a API
  const sendRequestToColaboratorButton = async () => {
    const finalDataMovement = { aprovacao: false, idCaixa: 1,  matricula: alunoMatricula };
    await api.post('/pedido', finalDataMovement)
      .then(response => {
        console.log(response)
        buttonItemRemoved();
        setShow({ display: "block" });
        setTimeout(() => {
          navigate("/login");
        }, 6000);
      })
      .catch(error => {
        console.log(error)
        alert("Erro")
      });
  };

  // Recuperar a matrícula usando a API
  // useEffect(() => {
  //     // Lógica para recuperar a matrícula usando a API
  //     api.get('/matricula')
  //         .then(response => {
  //             setMatricula(response.data.matricula);
  //         })
  //         .catch(error => {
  //             console.log(error)
  //             alert("Erro")
  //         });
  // }, []);

  // Logout e limpar a matrícula usando a API
  const handleLogout = () => {
    const storedUsuario = JSON.parse(localStorage.getItem('usuario'));
    if (storedUsuario) {
      delete storedUsuario.aluno;
      localStorage.setItem('usuario', JSON.stringify(storedUsuario));
    }
  };

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
                  {loadedFamilyOptions.map((option) => (
                    <option key={option.nome} value={option.nome}>
                      {option.nome}
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
