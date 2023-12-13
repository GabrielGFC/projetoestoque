import React, { useState, useEffect } from 'react';
import "./style.css";
import clockIcon from "../../../assets/clock.svg";

function AdministradorHistorico() {
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
    const [searchCategory, setSearchCategory] = useState(''); // Estado para armazenar a categoria selecionada
    const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o termo de pesquisa digitado
    const [resultadosPesquisa, setResultadosPesquisa] = useState([]); // Estado para armazenar os resultados da pesquisa

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };
    // Função para atualizar a categoria de pesquisa selecionada
    const handleSearchCategoryChange = (e) => {
        setSearchCategory(e.target.value);
    };
    
            // Realizar a pesquisa com base na categoria e no valor digitado
            useEffect(() => {
                const resultadosFiltrados = dataRecivedFromAlunoHistorico.filter(aluno => {
                // Realizar a comparação com base na categoria selecionada e no valor digitado
                if (searchCategory === 'Selecionar categoria' || searchTerm === '') {
                    setResultadosPesquisa(dataRecivedFromAlunoHistorico); // Mostrar todos os dados se nenhuma searchCategory for selecionada ou se o campo de pesquisa estiver vazio
                } else if(searchCategory === 'Nome') {
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
            const sortedResultados = resultadosFiltrados.sort((a, b) => { //mostrar em ordem cronológica
                const dateA = new Date(`${a.data} ${a.hora}`);
                const dateB = new Date(`${b.data} ${b.hora}`);
                return dateA - dateB;
            });
    
            setResultadosPesquisa(sortedResultados);
        }, [searchCategory, searchTerm]);
        
    useEffect(() => {
        setResultadosPesquisa(dataRecivedFromAlunoHistorico); // Exibir todos os dados inicialmente
    }, []); // Executar apenas uma vez, após a montagem do componente

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