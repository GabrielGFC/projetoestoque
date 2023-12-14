import React, { useState } from 'react';
import "./style.css";
import addIcon from "../../../assets/add.svg";

function ColaboradorEntrada() {
  //declaracao
  const [viewRequests, setViewRequestTable] = useState({ display: "flex" });
  const [viewRequestInfo, setViewRequestInfo] = useState({ display: "none" });
  const [selectedAluno, setSelectedAluno] = useState(null);
  var dataRecivedFromAlunoEntrada = [ //banco request do aluno
    {
      matricula: '1234', nome: "João da Silva Freitas", periodo: "3 - 4", box: "140", caixas: [
        {
          "family": "Cirúrgica",
          "quantity": "12"
        }
      ]
    },
    {
      matricula: '2345', nome: "Maria Ferreira", periodo: "9", box: "187", caixas: [
        {
          "family": "Dentística",
          "quantity": "20"
        }
      ]
    }
  ];


  //funcoes
  const setView1 = (aluno) => {
    setViewRequestTable({ display: "none" });
    setViewRequestInfo({ display: "flex" });
    setSelectedAluno(aluno);
  };

  const setView2 = () => {
    setViewRequestTable({ display: "flex" });
    setViewRequestInfo({ display: "none" });
  };

  return (
    <>
      <div className="entradaColaboradorCointainer">
        <div className="contentTop">
          <img src={addIcon} className="addIcon" alt="Add icon" />
          <h2>
            Validação <span>entrada</span> de caixas
          </h2>
        </div>
        <div className="contentCenter">
          <div className="contentCenterMiddleColaborador" style={viewRequests}>
            <div className="contentCenterMiddleLeft">
              <h3>Pedidos de entrada pendentes</h3>
            </div>
            <div className="validationEntryRequests">
              <table className="entryRequestTable">
                <tbody>
                  {dataRecivedFromAlunoEntrada.map((aluno, index) => (
                    <tr key={index}>
                      <td>
                        <p>{aluno.nome}</p>
                        <button onClick={() => setView1(aluno)}>Visualizar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="contentCenterMiddleColaborador" style={viewRequestInfo}>
            <div className="contentCenterMiddleBottom">
              <h3>Relatório do pedido</h3>
              <div className="contentMiddleBottomData">
                <div className="contentMiddleBottomLeft">
                  <h4>Informações do aluno</h4>
                  <div className="removeBoxStudentData">
                    <ul>
                      <li><p>Matrícula:</p><p>{selectedAluno?.matricula}</p></li>
                      <li><p>Acadêmico:</p><p>{selectedAluno?.nome}</p></li>
                      <li><p>Período:</p><p>{selectedAluno?.periodo}</p></li>
                      <li><p>Número da box:</p><p>{selectedAluno?.box}</p></li>
                    </ul>
                  </div>
                </div>
                <div className="contentMiddleBottomRight">
                  <h4>Caixas no pedido</h4>
                  <div className="removeBoxData">
                    <div className="validationEntryRequests">
                      <table className="removeRequestTable">
                        <tbody>
                          {selectedAluno?.caixas.map((caixa, index) => (
                            <tr key={index}>
                              <td>
                                <input type='checkbox' />
                                <span className='spanTable'>
                                  <p>Família: <span>{caixa.family}</span></p>
                                  <p>Quantidade de itens: <span>{caixa.quantity}</span></p>
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="validationBottomButtons">
                <button className='validationBottomButton1' onClick={setView2}>Invalidar</button>
                <button className='validationBottomButton2' onClick={setView2}>Validar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ColaboradorEntrada;
