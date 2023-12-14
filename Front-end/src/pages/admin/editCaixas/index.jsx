import React, { useState, useEffect } from 'react';
import './style.css';
import boxIcon from '../../../assets/box.svg';

function AdministradorEditCaixas() {
    //declaracao
    const [showPopup, setShowPopup] = useState(false);
    const [showCreatePopup, setShowCreatePopup] = useState(false);
    const [originalData, setOriginalData] = useState({});
    const [familyDataAdd, setfamilyDataAdd] = useState({
        familia: '',
        maxPecas: '',
        minPecas: ''
    });
    const [familyDataEdit, setFamilyDataEdit] = useState({
        familia: '',
        maxPecas: '',
        minPecas: ''
    });
    const [searchTerm, setSearchTerm] = useState('');
    const dataRecivedCaixas = [
        { familia: 'Cirúrgica', maxPecas: 20, minPecas: 2 },
        { familia: 'Dentística', maxPecas: 17, minPecas: 10 },
        { familia: 'Moldeira de prótese', maxPecas: 10, minPecas: 1 }
    ];
    const [showInputsAlertEdit, setShowInputsAlertEdit] = useState(false);
    const [showQuantAlertEdit, setShowQuantAlertEdit] = useState(false);
    const [showInputsAlertNew, setShowInputsAlertNew] = useState(false);
    const [showQuantAlertNew, setShowQuantAlertNew] = useState(false);

    //funcoes
    const openCreatePopup = () => {
        setfamilyDataAdd({ familia: '', maxPecas: '', minPecas: '' });
        setShowCreatePopup(true);
        setShowPopup(false);
    };

    const openEditPopup = (originalData) => {
        setFamilyDataEdit({ ...originalData });
        setShowPopup(true);
        setShowCreatePopup(false);
    };

    const closePopup = () => {
        setShowPopup(false);
        setShowCreatePopup(false);
        setFamilyDataEdit({
            familia: '',
            maxPecas: '',
            minPecas: ''
        });
        setShowInputsAlertNew(false);
        setShowQuantAlertNew(false);
        setShowInputsAlertEdit(false);
        setShowQuantAlertEdit(false);
    };

    const filteredCaixas = dataRecivedCaixas.filter((caixa) => {
        return caixa.familia.toLowerCase().includes(searchTerm.toLowerCase());
    });
    const editFamilyHandle = (e) => {
        e.preventDefault();
        const familiaValue = e.target.familiaCodeEdit.value;
        const maxPecasValue = parseInt(e.target.maxPecasCodeEdit.value);
        const minPecasValue = parseInt(e.target.minPecasCodeEdit.value);

        if (familiaValue && maxPecasValue && minPecasValue) {
            if (maxPecasValue > minPecasValue) {
                setShowQuantAlertEdit(false);
                setShowInputsAlertEdit(false);
            } else if (maxPecasValue < minPecasValue) {
                setShowQuantAlertEdit(true);
            }
        } else {
            setShowInputsAlertEdit(true);
            if (maxPecasValue < minPecasValue) {
                setShowQuantAlertEdit(true);
            } else if (maxPecasValue > minPecasValue) {
                setShowQuantAlertEdit(false);
            }
        }
    };

    useEffect(() => {
        if (showPopup) {
            setOriginalData({ ...familyDataEdit });
            console.log({ ...familyDataEdit })
        }
    }, [showPopup, familyDataEdit]);

    const addFamilyHandle = (e) => {
        e.preventDefault();
        const familiaValue = e.target.familiaCodeAdd.value;
        const maxPecasValue = parseInt(e.target.maxPecasCodeAdd.value);
        const minPecasValue = parseInt(e.target.minPecasCodeAdd.value);

        if (familiaValue && maxPecasValue && minPecasValue) {
            if (maxPecasValue > minPecasValue) {
                setShowQuantAlertNew(false);
                setShowInputsAlertNew(false);
            } else if (maxPecasValue < minPecasValue) {
                setShowQuantAlertNew(true);
            }
        } else {
            setShowInputsAlertNew(true);
            if (maxPecasValue < minPecasValue) {
                setShowQuantAlertNew(true);
            } else if (maxPecasValue > minPecasValue) {
                setShowQuantAlertNew(false);
            }
        }
    };
    return (
        <>
            <div className="saidaColaboradorCointainer">
                <div className="contentTop">
                    <img src={boxIcon} className="clockIcon" alt="Add icon" />
                    <h2>Gerênciar Famílias</h2>
                </div>
                <div className="contentCenter">
                    <div className="searchColaborador">
                        <button className="newColaborador" onClick={openCreatePopup}>
                            Criar novo <span className="lnr lnr-plus-circle" />
                        </button>
                        <div className="searchContainer">
                            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Pesquisar pelo nome" />
                            <button className="pesquisarColaborador">
                                <span className="lnr lnr-magnifier" />
                            </button>
                        </div>
                    </div>
                    <div className="contentCenterMiddleColaborador">
                        <table className="table table-sm table-striped tableLog">
                            <thead>
                                <tr>
                                    <th scope="col">Família</th>
                                    <th scope="col">Máximo de peças</th>
                                    <th scope="col">Mínimo de peças</th>
                                    <th scope="col">Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCaixas.map((caixa, index) => (
                                    <tr key={index}>
                                        <th scope="row">{caixa.familia}</th>
                                        <td>{caixa.maxPecas}</td>
                                        <td>{caixa.minPecas}</td>
                                        <td>
                                            <button className="editColaboradorButton" onClick={() => openEditPopup(caixa)}>
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
                    <h3>Editar Família</h3>
                    <form onSubmit={editFamilyHandle}>
                        <label htmlFor="familiaEdit">Família:</label>
                        <input type="text" id="familiaEdit" name="familiaCodeEdit" value={familyDataEdit.familia} onChange={(e) => setFamilyDataEdit({ ...familyDataEdit, familia: e.target.value })} />

                        <label htmlFor="maxPecasEdit">Máximo de peças:</label>
                        <input type="number" id="maxPecasEdit" name="maxPecasCodeEdit" value={familyDataEdit.maxPecas} onChange={(e) => setFamilyDataEdit({ ...familyDataEdit, maxPecas: e.target.value })} />

                        <label htmlFor="minPecasEdit">Mínimo de peças:</label>
                        <input type="number" id="minPecasEdit" name="minPecasCodeEdit" value={familyDataEdit.minPecas} onChange={(e) => setFamilyDataEdit({ ...familyDataEdit, minPecas: e.target.value })} />

                        {showInputsAlertEdit && <p className='alertNewSenha'>Todos os campos devem estar preenchidos.</p>}
                        {showQuantAlertEdit && <p className='alertNewSenha'>A quantidade máxima deve ser maior que a quantidade mínima !</p>}

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
                    <h3>Adicionar Família</h3>
                    <form onSubmit={addFamilyHandle}>
                        <label htmlFor="familiaAdd">Família:</label>
                        <input type="text" id="familiaAdd" name="familiaCodeAdd" value={familyDataAdd.familia} onChange={(e) => setfamilyDataAdd({ ...familyDataAdd, familia: e.target.value })} />
                        <label htmlFor="maxPecasAdd">Máximo de peças:</label>
                        <input type="number" id="maxPecasAdd" name="maxPecasCodeAdd" value={familyDataAdd.maxPecas} onChange={(e) => setfamilyDataAdd({ ...familyDataAdd, maxPecas: e.target.value })} />
                        <label htmlFor="minPecasAdd">Mínimo de peças:</label>
                        <input type="number" id="minPecasAdd" name="minPecasCodeAdd" value={familyDataAdd.minPecas} onChange={(e) => setfamilyDataAdd({ ...familyDataAdd, minPecas: e.target.value })} />
                        {showInputsAlertNew && <p className='alertNewSenha'>Todos os campos devem estar preenchidos.</p>}
                        {showQuantAlertNew && <p className='alertNewSenha'>A quantidade máxima deve ser maior que a quantidade mínima !</p>}
                        <button type="submit" className='buttonsEditFamilias'>Salvar</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AdministradorEditCaixas;


