import React, { useState } from 'react';
import "./style.css";
import removeIcon from "../../../assets/remove.svg";
import { api } from '../../../service';

function ColaboradorSaida() {
  const [matricula, setMatricula] = useState('');
  const [alunoInfo, setAlunoInfo] = useState(null);

  const handleSearch = async () => {
    // Fazer uma solicitação para a API para buscar o aluno correspondente ao número de matrícula digitado
    await api.get(`/estoque/${matricula}`)
      .then(response => {
        // Definir os dados do aluno obtidos da API
        setAlunoInfo(response.data);
      })
      .catch(error => {
        console.error('Ocorreu um erro ao buscar os dados da API:', error);
      });
  };
  return (
    <>
      <div className="saidaColaboradorCointainer">
        <div className="contentTop">
          <img src={removeIcon} className="addIcon" alt="Add icon" />
          <h2>
            Validação <span>saída</span> de caixas
          </h2>
        </div>
        <div className="contentCenter">
          <div className="contentCenterMiddleColaborador">
            <div className="contentCenterMiddleTop">
              <h4>Pedidos de saída pendentes</h4>
              <input
                type='number'
                placeholder="Digite o número da matrícula"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
              />
              <button onClick={handleSearch}><span className="lnr lnr-magnifier" /></button>
            </div>
            <div className="contentCenterMiddleBottom middleSaida">
              <h3>Relatório do estoque</h3>
              <div className="contentMiddleBottomData">
                <div className="contentMiddleBottomLeft">
                  <h4>Informações do aluno</h4>
                  <div className="removeBoxStudentData">
                    <ul>
                      <li><p>Matrícula:</p><p>{alunoInfo?.matricula}</p></li>
                      <li><p>Acadêmico:</p><p>{alunoInfo?.User.nome}</p></li>
                      <li><p>Período:</p><p>{alunoInfo?.User.periodo}</p></li>
                      <li><p>Número da box:</p><p>{alunoInfo?.User.box}</p></li>
                    </ul>
                  </div>
                </div>
                <div className="contentMiddleBottomRight">
                  <h4>Caixas presentes</h4>
                  <div className="removeBoxData">
                    <div className="validationEntryRequests">
                      <table className="removeRequestTable">
                        <tbody>
                        {/* {alunoInfo?.caixas && ((caixa, index) => ( 
                          
                          
                          key={index}
                          */}
                            <tr>
                              <td>
                                <input type='checkbox' />
                                <span className='spanTable'>
                                  <p>Família: <span>{alunoInfo?.Caixa.nome}</span></p>
                                  <p>Quantidade de itens: <span>{alunoInfo?.Caixa.quantidade}</span></p>
                                </span>
                              </td>
                            </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="validationBottomButtons">
                {alunoInfo && ( // Renderizar o botão "Remover" apenas se houver um aluno correspondente
                  <button className='validationBottomButton1'>Registrar retirada</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ColaboradorSaida;