import React, { useState, useEffect } from 'react';
import "./style.css";
import clockIcon from "../../../assets/clock.svg";

function AdministradorHistorico() {
    //declaracao
    const dataRecivedFromAlunoHistorico = [
        {
            matricula: '234', nome: "Lucas Fernandes", periodo: "10", box: "181", hora: "10:58", data: "12/04/23", status: "Validado", colaborador: "Lucas Reis", movimentacao: "Entrada"
        },
        {
            matricula: '123', nome: "Ana Clara Brito", periodo: "7", box: "189", hora: "09:12", data: "01/04/23", status: "Invalidado", colaborador: "Lucas Reis", movimentacao: "Saída"
        },
        {
            matricula: '345', nome: "Roberto Chaves", periodo: "2", box: "111", hora: "07:39", data: "12/03/23", status: "Validado", colaborador: "Lucas Reis", movimentacao: "Entrada"
        }
    ];
    const [searchCategory, setSearchCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [resultadosPesquisa, setResultadosPesquisa] = useState([]);

    //funcoes
    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchCategoryChange = (e) => {
        setSearchCategory(e.target.value);
    };

    useEffect(() => {
        const resultadosFiltrados = dataRecivedFromAlunoHistorico.filter(aluno => {
            if (searchCategory === 'Selecionar categoria' || searchTerm === '') {
                setResultadosPesquisa(dataRecivedFromAlunoHistorico);
            } else if (searchCategory === 'Nome') {
                return aluno.nome.toLowerCase().includes(searchTerm.toLowerCase());
            } else if (searchCategory === 'Matrícula') {
                return aluno.matricula.includes(searchTerm);
            } else if (searchCategory === 'Período') {
                return aluno.periodo.includes(searchTerm);
            } else if (searchCategory === 'Box') {
                return aluno.box.includes(searchTerm);
            } else if (searchCategory === 'Hora') {
                return aluno.hora.includes(searchTerm);
            } else if (searchCategory === 'Data') {
                return aluno.data.includes(searchTerm);
            } else if (searchCategory === 'Status') {
                return aluno.status.toLowerCase().includes(searchTerm.toLowerCase());
            } else if (searchCategory === 'Colaborador') {
                return aluno.colaborador.toLowerCase().includes(searchTerm.toLowerCase());
            } else if (searchCategory === 'Entrada/Saída') {
                return aluno.movimentacao.toLowerCase().includes(searchTerm.toLowerCase());
            }
            return true;
        });
        let sortedResultados;
        if (searchCategory === 'Selecionar categoria') {
            sortedResultados = resultadosFiltrados.sort((a, b) => {
                const dateA = new Date(`${a.data} ${a.hora}`);
                const dateB = new Date(`${b.data} ${b.hora}`);
                return dateA - dateB;
            });
        } else {
            sortedResultados = resultadosFiltrados;
        }

        setResultadosPesquisa(sortedResultados);
    }, [searchCategory, searchTerm]);

    useEffect(() => {
        setResultadosPesquisa(dataRecivedFromAlunoHistorico);
    }, []);

    return (
        <>
            <div className="saidaColaboradorCointainer">
                <div className="contentTop">
                    <img src={clockIcon} className="clockIcon" alt="Add icon" />
                    <h2>
                        Histórico de movimentações
                    </h2>
                </div>
                <div className="contentCenter">
                    <div className="searchBoxRemove">
                        <select value={searchCategory} onChange={handleSearchCategoryChange} className='searchBoxRemoveSelect'>
                            <option>Selecionar categoria</option>
                            <option>Nome</option>
                            <option>Matrícula</option>
                            <option>Período</option>
                            <option>Box</option>
                            <option>Hora</option>
                            <option>Data</option>
                            <option>Status</option>
                            <option>Colaborador</option>
                            <option>Entrada/Saída</option>
                        </select>
                        <input
                            type='text'
                            placeholder="Pesquisar"
                            value={searchTerm}
                            onChange={handleSearchTermChange}
                        />
                        <button><span className="lnr lnr-magnifier" /></button>
                    </div>
                    <div className="contentCenterMiddleColaborador">
                        <table className="table table-sm table-striped tableLog">
                            <thead>
                                <tr>
                                    <th scope="col">Matrícula</th>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Período</th>
                                    <th scope="col">Box</th>
                                    <th scope="col">Hora</th>
                                    <th scope="col">Data</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Colaborador</th>
                                    <th scope="col">Entrada/Saída</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resultadosPesquisa.map((aluno, index) => (
                                    <tr key={index}>
                                        <td>{aluno.matricula}</td>
                                        <td>{aluno.nome}</td>
                                        <td>{aluno.periodo}</td>
                                        <td>{aluno.box}</td>
                                        <td>{aluno.hora}</td>
                                        <td>{aluno.data}</td>
                                        <td>{aluno.status}</td>
                                        <td>{aluno.colaborador}</td>
                                        <td>{aluno.movimentacao}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdministradorHistorico;