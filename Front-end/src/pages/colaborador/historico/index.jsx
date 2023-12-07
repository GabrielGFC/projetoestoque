import React, { useState, useEffect } from 'react';
import "./style.css";
import clockIcon from "../../../assets/clock.svg";

function ColaboradorHistorico() {
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
    const [categoria, setCategoria] = useState(''); // Estado para armazenar a categoria selecionada
    const [valorPesquisado, setValorPesquisado] = useState(''); // Estado para armazenar o valor digitado
    const [resultadosPesquisa, setResultadosPesquisa] = useState([]); // Estado para armazenar os resultados da pesquisa

    const handleSearch = () => {
        if (categoria === 'Selecionar categoria' || valorPesquisado === '') {
            setResultadosPesquisa(dataRecivedFromAlunoHistorico); // Mostrar todos os dados se nenhuma categoria for selecionada ou se o campo de pesquisa estiver vazio
        } else {
            // Realizar a pesquisa com base na categoria e no valor digitado
            const resultadosFiltrados = dataRecivedFromAlunoHistorico.filter(aluno => {
                // Realizar a comparação com base na categoria selecionada e no valor digitado
                if (categoria === 'Nome') {
                    return aluno.nome.toLowerCase().includes(valorPesquisado.toLowerCase());
                } else if (categoria === 'Matrícula') {
                    return aluno.matricula.includes(valorPesquisado);
                } else if (categoria === 'Período') {
                    return aluno.periodo.includes(valorPesquisado);
                } else if (categoria === 'Box') {
                    return aluno.box.includes(valorPesquisado);
                } else if (categoria === 'Hora') {
                    return aluno.hora.includes(valorPesquisado);
                } else if (categoria === 'Data') {
                    return aluno.data.includes(valorPesquisado);
                } else if (categoria === 'Status') {
                    return aluno.status.toLowerCase().includes(valorPesquisado.toLowerCase());
                } else if (categoria === 'Colaborador') {
                    return aluno.colaborador.toLowerCase().includes(valorPesquisado.toLowerCase());
                } else if (categoria === 'Entrada/Saída') {
                    return aluno.movimentacao.toLowerCase().includes(valorPesquisado.toLowerCase());
                }
                return true;
            });
            setResultadosPesquisa(resultadosFiltrados);
        }
    };
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
                        <select onChange={(e) => setCategoria(e.target.value)} className='searchBoxRemoveInput'>
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
                            value={valorPesquisado}
                            onChange={(e) => setValorPesquisado(e.target.value)}
                        />
                        <button onClick={handleSearch}><span className="lnr lnr-magnifier" /></button>
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

export default ColaboradorHistorico;