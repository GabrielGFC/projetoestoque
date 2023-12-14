import React, { useState } from 'react';
import './style.css';
import colaboradoresIcon from '../../../assets/colaboradores.svg';

function AdministradorEditColaborador() {
    //declaracao
    const [showPopup, setShowPopup] = useState(false);
    const [showCreatePopup, setShowCreatePopup] = useState(false);
    const [colaboradorDataEdit, setColaboradorDataEdit] = useState({
        matricula: '',
        nome: '',
        email: '',
        senha: ''
    });
    const [colaboradorDataAdd, setColaboradorDataAdd] = useState({
        matricula: '',
        nome: '',
        email: '',
        senha: ''
    });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [searchCategory, setSearchCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const dataRecivedColaboradores = [
        {
            matricula: '1234', nome: "Lucas Reis", email: "lucas_reis@email.com", senha: "abc90"
        },
        {
            matricula: '2345', nome: "Talita Lopes", email: "talita_lopes@email.com", senha: "uni90"
        }
    ];
    const [showInputsAlertEdit, setShowInputsAlertEdit] = useState(false);
    const [showInputsAlertNew, setShowInputsAlertNew] = useState(false);

    //funcoes
    const handleSearchCategoryChange = (e) => {
        setSearchCategory(e.target.value);
    };

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const openCreatePopup = () => {
        setColaboradorDataAdd({ matricula: '', nome: '', email: '', senha: '' });
        setShowCreatePopup(true);
        setShowPopup(false);
    };

    const closePopup = () => {
        setShowPopup(false);
        setShowCreatePopup(false);
        setColaboradorDataEdit({
            matricula: '',
            nome: '',
            email: '',
            senha: ''
        })
        setShowInputsAlertNew(false);
        setShowInputsAlertEdit(false);
    };

    const openEditPopup = (originalData) => {
        setColaboradorDataEdit({ ...originalData });
        setShowPopup(true);
        setShowCreatePopup(false);
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

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

    const editColaboradorHandle = (e) => {
        e.preventDefault();
        const matriculaValue = colaboradorDataEdit.matricula;
        const nomeValue = colaboradorDataEdit.nome;
        const emailValue = colaboradorDataEdit.email;
        const senhaValue = colaboradorDataEdit.senha;

        if (matriculaValue && nomeValue && emailValue && senhaValue) {
            //enviar/salvar os dados
        } else {
            setShowInputsAlertEdit(true);
        }
    };

    const addColaboradorHandle = (e) => {
        e.preventDefault();
        const matriculaValue = colaboradorDataAdd.matricula;
        const nomeValue = colaboradorDataAdd.nome;
        const emailValue = colaboradorDataAdd.email;
        const senhaValue = colaboradorDataAdd.senha;

        if (matriculaValue && nomeValue && emailValue && senhaValue) {
            // enviar/salvar os dados
        } else {
            setShowInputsAlertNew(true);
        }
    };


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
            </div>
            <div className="popupContainer" style={{ display: showPopup ? 'block' : 'none' }}>
                <div className="popupContent">
                    <span className="closePopup" onClick={closePopup}>
                        &times;
                    </span>
                    <h3>Editar Colaborador</h3>
                    <form onSubmit={editColaboradorHandle}>
                        <label htmlFor="matriculaEdit">Matrícula:</label>
                        <input type="text" id="matriculaEdit" name="matriculaCodeEdit" value={colaboradorDataEdit.matricula} onChange={(e) => setColaboradorDataEdit({ ...colaboradorDataEdit, matricula: e.target.value })} />

                        <label htmlFor="nomeEdit">Nome:</label>
                        <input type="text" id="nomeEdit" name="nomeCodeEdit" value={colaboradorDataEdit.nome} onChange={(e) => setColaboradorDataEdit({ ...colaboradorDataEdit, nome: e.target.value })} />

                        <label htmlFor="emailEdit">E-mail:</label>
                        <input type="text" id="emailEdit" name="emailCodeEdit" value={colaboradorDataEdit.email} onChange={(e) => setColaboradorDataEdit({ ...colaboradorDataEdit, email: e.target.value })} />

                        <label htmlFor="senha">Senha:</label>
                        <div className="passwordInputContainer">
                            <input type="password" id="senhaEdit" name="senhaCodeEdit" value={colaboradorDataEdit.senha} onChange={(e) => setColaboradorDataEdit({ ...colaboradorDataEdit, senha: e.target.value })} />

                            <span
                                className={isPasswordVisible ? "lnr lnr-eye" : "lnr lnr-eye-slash"}
                                onClick={togglePasswordVisibility}
                            />
                        </div>
                        {showInputsAlertEdit && <p className='alertNewSenha'>Todos os campos devem estar preenchidos.</p>}
                        <div className="buttonsEditColaborador">
                            <button type="submit">Deletar</button>
                            <button type="submit">Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="popupContainer" style={{ display: showCreatePopup ? 'block' : 'none' }}>
                <div className="popupContent">
                    <span className="closePopup" onClick={closePopup}>
                        &times;
                    </span>
                    <h3>Adicionar Colaborador</h3>
                    <form onSubmit={addColaboradorHandle}>
                        <label htmlFor="matriculaAdd">Matrícula:</label>
                        <input type="number" id="matriculaAdd" name="matriculaCodeAdd" value={colaboradorDataAdd.matricula} onChange={(e) => setColaboradorDataAdd({ ...colaboradorDataAdd, matricula: e.target.value })} />

                        <label htmlFor="nomeAdd">Nome:</label>
                        <input type="text" id="nomeAdd" name="nomeCodeAdd" value={colaboradorDataAdd.nome} onChange={(e) => setColaboradorDataAdd({ ...colaboradorDataAdd, nome: e.target.value })} />

                        <label htmlFor="emailAdd">E-mail:</label>
                        <input type="email" id="emailAdd" name="emailCodeAdd" value={colaboradorDataAdd.email} onChange={(e) => setColaboradorDataAdd({ ...colaboradorDataAdd, email: e.target.value })} />

                        <label htmlFor="senha">Senha:</label>
                        <div className="passwordInputContainerAddNewColaborador">
                            <input
                                type="newPassword"
                                id="newId"
                                name="newName"
                                value={colaboradorDataAdd.senha}
                                onChange={(e) => setColaboradorDataAdd({ ...colaboradorDataAdd, senha: e.target.value })}
                            />
                            <span
                                className="lnr lnr-eye"
                                onClick={togglePasswordVisibility}
                            />
                        </div>
                        {showInputsAlertNew && <p className='alertNewSenha'>Todos os campos devem estar preenchidos.</p>}
                        <button type="submit" className='buttonsEditFamilias'>Salvar</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AdministradorEditColaborador;