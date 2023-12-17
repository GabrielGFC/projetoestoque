import React, { useState, useEffect } from 'react';
import "./style.css";
import addIcon from "../../../assets/add.svg";
import { api } from '../../../service';

function ColaboradorEntrada() {
  const [viewRequests, setViewRequestTable] = useState({ display: "flex" });
  const [viewRequestInfo, setViewRequestInfo] = useState({ display: "none" });
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [validateRequestDisplay, setValidadeRequestDisplay] = useState({ display: "flex" });
  const [dataRecivedFromAlunoEntrada, setDataRecivedFromAlunoEntrada] = useState([]);
  const [pedidosRecebidos, setPedidosRecebidos] = useState([]);

  const setView1 = (aluno) => {
    setViewRequestTable({ display: "none" });
    setViewRequestInfo({ display: "flex" });
    setSelectedAluno(aluno);
  };

  // const invalidateRequest = () => {
  //   const updatedDataRecivedFromAlunoEntrada = dataRecivedFromAlunoEntrada.filter((aluno) => aluno !== selectedAluno);
  //   api.post('/pedido', { updatedDataRecivedFromAlunoEntrada }) //Invalidando pedido
  //     .then(response => {
  //       console.log(response)
  //       setDataRecivedFromAlunoEntrada(updatedDataRecivedFromAlunoEntrada);
  //       setViewRequestTable({ display: "flex" });
  //       setViewRequestInfo({ display: "none" });
  //     })
  //     .catch(error => {
  //       console.log(error)
  //       alert("Erro")
  //     });
  // };

  const validateRequest = () => {
    // const updatedDataRecivedFromAlunoEntrada = dataRecivedFromAlunoEntrada.filter((aluno) => aluno !== selectedAluno);
    setValidadeRequestDisplay({display: "none"})
    setView2()
    // api.post('/estoque', { updatedDataRecivedFromAlunoEntrada })
    //   .then(response => {
    //     console.log(response)
    //     setDataRecivedFromAlunoEntrada(updatedDataRecivedFromAlunoEntrada);
    //     setViewRequestTable({ display: "flex" });
    //     setViewRequestInfo({ display: "none" });
    //   })
    //   .catch(error => {
    //     console.log(error)
    //     alert("Erro")
    //   });
  };

  async function getDataFromAluno() {
    await api.get('/pedido')
      .then(response => {
        console.log(response)
        setDataRecivedFromAlunoEntrada(response.data);
        setPedidosRecebidos(response.data);
      })
      .catch(error => {
        console.log(error);
        alert("Erro");
      })
  }


  useEffect(() => {
    getDataFromAluno()
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
                <tbody style={validateRequestDisplay}>
                  {dataRecivedFromAlunoEntrada.map((aluno, index) => {
                    console.log(aluno)
                    return (
                      <tr key={index}>
                        <td>
                          <p>{aluno.User.nome}</p>
                          <button onClick={() => setView1(aluno)}>Visualizar</button>
                        </td>
                      </tr>
                    )
                  }
                  )
                  }
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
                    {selectedAluno && selectedAluno.User && (
                      <ul>
                        <li><p>Matrícula:</p><p>{selectedAluno.matricula}</p></li>
                        <li><p>Acadêmico:</p><p>{selectedAluno.User.nome}</p></li>
                        <li><p>Período:</p><p>{selectedAluno.User.periodo}</p></li>
                        <li><p>Número da box:</p><p>{selectedAluno.User.box}</p></li>
                      </ul>
                    )}
                  </div>
                </div>
                <div className="contentMiddleBottomRight">
                  <h4>Caixas no pedido</h4>
                  <div className="removeBoxData">
                    <div className="validationEntryRequests">
                      <table className="removeRequestTable">
                        {selectedAluno && selectedAluno.Caixa && (
                          <tbody>
                            {/*{selectedAluno.Caixa.map((Caixas, index) => ( 
                                                          
                                                          key={index}
                                                          
                                                          */}
                            <tr>
                              <td>
                                <input
                                  type='checkbox'
                                //onChange={(e) => Caixa.invalidated = e.target.checked}
                                />
                                <span className='spanTable'>
                                  <p>Família: <span>{selectedAluno.Caixa.nome}</span></p>
                                  <p>Quantidade de itens: <span>{selectedAluno.Caixa.quantidade}</span></p>
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        )}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="validationBottomButtons">
                <button className='validationBottomButton1' onClick={validateRequest}>Invalidar</button>
                <button className='validationBottomButton2' onClick={validateRequest}>Validar</button>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

export default ColaboradorEntrada;
