import React, { useState, useEffect } from 'react';
import "./style.css";
import addIcon from "../../../assets/add.svg";

function ColaboradorEntrada() {
  const [viewRequests, setViewRequestTable] = useState({ display: "flex" });
  const [viewRequestInfo, setViewRequestInfo] = useState({ display: "none" });
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [dataRecivedFromAlunoEntrada, setDataRecivedFromAlunoEntrada] = useState([]);
  const [pedidosRecebidos, setPedidosRecebidos] = useState([]);

  const setView1 = (aluno) => {
    setViewRequestTable({ display: "none" });
    setViewRequestInfo({ display: "flex" });
    setSelectedAluno(aluno);
  };

  const invalidateRequest = () => {
    const updatedDataRecivedFromAlunoEntrada = dataRecivedFromAlunoEntrada.filter((aluno) => aluno !== selectedAluno);
    localStorage.setItem('entryRequest', JSON.stringify(updatedDataRecivedFromAlunoEntrada));
    setDataRecivedFromAlunoEntrada(updatedDataRecivedFromAlunoEntrada);
    setViewRequestTable({ display: "flex" });
    setViewRequestInfo({ display: "none" });
  };

  useEffect(() => {
    const entryRequest = localStorage.getItem('entryRequest');
    if (entryRequest) {
      try {
        const parsedEntryRequest = JSON.parse(entryRequest);
        setDataRecivedFromAlunoEntrada(parsedEntryRequest);
        setPedidosRecebidos(parsedEntryRequest);
      } catch (error) {
        console.error('Error parsing entryRequest:', error);
      }
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const entryRequest = localStorage.getItem('entryRequest');
      if (entryRequest) {
        try {
          const parsedEntryRequest = JSON.parse(entryRequest);
          setPedidosRecebidos(parsedEntryRequest);
        } catch (error) {
          console.error('Error parsing entryRequest:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

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
                        <p>{aluno.aluno && aluno.aluno.nome}</p>
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
                    {selectedAluno && selectedAluno.aluno && (
                      <ul>
                        <li><p>Matrícula:</p><p>{selectedAluno.aluno.matricula}</p></li>
                        <li><p>Acadêmico:</p><p>{selectedAluno.aluno.nome}</p></li>
                        <li><p>Período:</p><p>{selectedAluno.aluno.periodo}</p></li>
                        <li><p>Número da box:</p><p>{selectedAluno.aluno.box}</p></li>
                      </ul>
                    )}
                  </div>
                </div>
                <div className="contentMiddleBottomRight">
                  <h4>Caixas no pedido</h4>
                  <div className="removeBoxData">
                    <div className="validationEntryRequests">
                      <table className="removeRequestTable">
                        {selectedAluno && selectedAluno.caixas && (
                          <tbody>
                            {selectedAluno.caixas.map((caixa, index) => (
                              <tr key={index}>
                                <td>
                                  <input
                                    type='checkbox'
                                    onChange={(e) => caixa.invalidated = e.target.checked}
                                  />
                                  <span className='spanTable'>
                                    <p>Família: <span>{caixa.family}</span></p>
                                    <p>Quantidade de itens: <span>{caixa.quantity}</span></p>
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        )}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="validationBottomButtons">
                <button className='validationBottomButton1' onClick={invalidateRequest}>Invalidar</button>
                <button className='validationBottomButton2' onClick={setView2}>Validar</button>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

export default ColaboradorEntrada;
