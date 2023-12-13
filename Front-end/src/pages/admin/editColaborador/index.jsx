import React, { useState } from 'react';
import './style.css';
import colaboradoresIcon from '../../../assets/colaboradores.svg';

function AdministradorEditColaborador() {
    // Estado para controlar a exibição do pop-up de edição
    const [showPopup, setShowPopup] = useState(false);
    // Estado para controlar a exibição do pop-up de criação
    const [showCreatePopup, setShowCreatePopup] = useState(false);
    // Estado para armazenar os dados do colaborador selecionado para edição
    const [colaboradorData, setColaboradorData] = useState({
        matricula: '',
        nome: '',
        email: '',
        senha: ''
    });
    // Estado para controlar a visibilidade da senha
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    // Estado para armazenar a categoria de pesquisa selecionada
    const [searchCategory, setSearchCategory] = useState('');
    // Estado para armazenar o termo de pesquisa digitado
    const [searchTerm, setSearchTerm] = useState('');

    // Função para atualizar a categoria de pesquisa selecionada
    const handleSearchCategoryChange = (e) => {
        setSearchCategory(e.target.value);
    };

    // Função para atualizar o termo de pesquisa digitado
    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Função para abrir o pop-up de criação
    const openCreatePopup = () => {
        setColaboradorData({ matricula: '', nome: '', email: '', senha: '' });
        setShowCreatePopup(true);
        setShowPopup(false);
    };

    // Função para fechar os pop-ups
    const closePopup = () => {
        setShowPopup(false);
        setShowCreatePopup(false);
    };

    // Função para abrir o pop-up de edição com os dados do colaborador selecionado
    const openEditPopup = (data) => {
        setColaboradorData(data);
        setShowPopup(true);
        setShowCreatePopup(false);
    };

    // Função para alternar a visibilidade da senha
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    // Dados dos colaboradores recebidos
    const dataRecivedColaboradores = [
        {
            matricula: '1234', nome: "Lucas Reis", email: "lucas_reis@email.com", senha: "abc90"
        },
        {
            matricula: '2345', nome: "Talita Lopes", email: "talita_lopes@email.com", senha: "uni90"
        }
    ];

    // Filtrar colaboradores com base na categoria e no termo de pesquisa
    const filteredColaboradores = dataRecivedColaboradores.filter((colaborador) => {
        if (searchCategory === 'Nome') {
            return colaborador.nome.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchCategory === 'Matrícula') {
            return colaborador.matricula.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchCategory === 'E-mail') {
            return colaborador.email.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return true;
    });

    return (
        <>
            <div className="saidaColaboradorCointainer">
                <div className="contentTop">
                    <img src={colaboradoresIcon} alt="Add icon" />
                    <h2>Gerênciar Colaboradores</h2>
                </div>
                <div className="contentCenter">
                    <div className="searchColaborador">
                        <button className="newColaborador" onClick={openCreatePopup}>
                            Criar novo <span className="lnr lnr-plus-circle" />
                        </button>
                        <div className="searchContainer">
                            <select value={searchCategory} onChange={handleSearchCategoryChange}>
                                <option value="">Selecionar categoria</option>
                                <option value="Nome">Nome</option>
                                <option value="Matrícula">Matrícula</option>
                                <option value="E-mail">E-mail</option>
                            </select>
                            <input type="text" value={searchTerm} onChange={handleSearchTermChange} placeholder="Pesquisar" />
                            <button className="pesquisarColaborador">
                                <span className="lnr lnr-magnifier" />
                            </button>
                        </div>
                    </div>
                    <div className="contentCenterMiddleColaborador">
                        <table className="table table-sm table-striped tableLog">
                            <thead>
                                <tr>
                                    <th scope="col">Matrícula</th>
                                    <th scope="col">Nome</th>
                                    <th scope="col">E-mail</th>
                                    <th scope="col">Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredColaboradores.map((colaborador, index) => (
                                    <tr key={index}>
                                        <th scope="row">{colaborador.matricula}</th>
                                        <td>{colaborador.nome}</td>
                                        <td>{colaborador.email}</td>
                                        <td>
                                            <button className="editColaboradorButton" onClick={() => openEditPopup(colaborador)}>
                                                <span className="lnr lnr-pencil" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div><div className="popupContainer" style={{ display: showPopup ? 'block' : 'none' }}>
                <div className="popupContent">
                    <span className="closePopup" onClick={closePopup}>
                        &times;
                    </span>
                    <h3>Editar Colaborador</h3>
                    <form>
                        <label htmlFor="matricula">Matrícula:</label>
                        <input type="text" id="matricula" name="matricula" defaultValue={colaboradorData.matricula} />

                        <label htmlFor="nome">Nome:</label>
                        <input type="text" id="nome" name="nome" defaultValue={colaboradorData.nome} />

                        <label htmlFor="email">E-mail:</label>
                        <input type="text" id="email" name="email" defaultValue={colaboradorData.email} />

                        <label htmlFor="senha">Senha:</label>
                        <div className="passwordInputContainer">
                            <input
                                type={isPasswordVisible ? 'text' : 'password'}
                                id="senha"
                                name="senha"
                                defaultValue={colaboradorData.senha}
                            />
                            <span
                                className={isPasswordVisible ? "lnr lnr-eye" : "lnr lnr-eye-slash"}
                                onClick={togglePasswordVisibility}
                            />
                        </div>
                    </form>
                    <div className="buttonsEditColaborador">
                        <button type="submit">Deletar</button>
                        <button type="submit">Salvar</button>
                    </div>
                </div>
            </div>
            <div className="popupContainer" style={{ display: showCreatePopup ? 'block' : 'none' }}>
                <div className="popupContent">
                    <span className="closePopup" onClick={closePopup}>
                        &times;
                    </span>
                    <h3>Adicionar Colaborador</h3>
                    <form>
                        <label htmlFor="matricula">Matrícula:</label>
                        <input type="number" id="matricula" name="matricula" defaultValue={colaboradorData.matricula} />

                        <label htmlFor="nome">Nome:</label>
                        <input type="text" id="nome" name="nome" defaultValue={colaboradorData.nome} />

                        <label htmlFor="email">E-mail:</label>
                        <input type="email" id="email" name="email" defaultValue={colaboradorData.email} />

                        <label htmlFor="senha">Senha:</label>
                        <div className="passwordInputContainerAddNewColaborador">
                            <input
                                type="newPassword"
                                id="newId"
                                name="newName"
                                value={colaboradorData.senha}
                                onChange={(e) => setColaboradorData({ ...colaboradorData, senha: e.target.value })}
                            />
                            <span
                                className="lnr lnr-eye"
                                onClick={togglePasswordVisibility}
                            />
                        </div>
                        <button type="submit" className='buttonsEditFamilias'>Salvar</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AdministradorEditColaborador;