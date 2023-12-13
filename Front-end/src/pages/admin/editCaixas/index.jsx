import React, { useState } from 'react';
import './style.css';
import boxIcon from '../../../assets/box.svg';

function AdministradorEditCaixas() {
    // Estado para controlar a exibição do pop-up de edição
    const [showPopup, setShowPopup] = useState(false);
    // Estado para controlar a exibição do pop-up de criação
    const [showCreatePopup, setShowCreatePopup] = useState(false);
    // Estado para armazenar os dados do item selecionado para edição
    const [colaboradorData, setColaboradorData] = useState({
        familia: '',
        maxPecas: '',
        minPecas: ''
    });
    // Estado para controlar o termo de pesquisa digitado
    const [searchTerm, setSearchTerm] = useState('');

    // Função para abrir o pop-up de criação
    const openCreatePopup = () => {
        setColaboradorData({ familia: '', maxPecas: '', minPecas: '' });
        setShowCreatePopup(true);
        setShowPopup(false);
    };

    // Função para fechar os pop-ups
    const closePopup = () => {
        setShowPopup(false);
        setShowCreatePopup(false);
    };

    // Função para abrir o pop-up de edição com os dados do item selecionado
    const openEditPopup = (data) => {
        setColaboradorData(data);
        setShowPopup(true);
        setShowCreatePopup(false);
    };

    // Dados das caixas recebidos
    const dataRecivedCaixas = [
        { familia: 'Cirúrgica', maxPecas: 20, minPecas: 2 },
        { familia: 'Dentística', maxPecas: 17, minPecas: 10 },
        { familia: 'Moldeira de prótese', maxPecas: 10, minPecas: 1 }
    ];

    // Filtrar caixas com base no termo de pesquisa
    const filteredCaixas = dataRecivedCaixas.filter((caixa) => {
        return caixa.familia.toLowerCase().includes(searchTerm.toLowerCase());
    });

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
                    <form>
                        <label htmlFor="familia">Família:</label>
                        <input type="text" id="familia" name="familia" defaultValue={colaboradorData.familia} />

                        <label htmlFor="maxPecas">Máximo de peças:</label>
                        <input type="number" id="maxPecas" name="maxPecas" defaultValue={colaboradorData.maxPecas} />

                        <label htmlFor="minPecas">Mínimo de peças:</label>
                        <input type="number" id="minPecas" name="minPecas" defaultValue={colaboradorData.minPecas} />
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
                    <h3>Adicionar Família</h3>
                    <form>
                        <label htmlFor="familia">Família:</label>
                        <input type="text" id="familia" name="familia" defaultValue={colaboradorData.familia} />
                        < label htmlFor="maxPecas">Máximo de peças:</label>
                        <input type="text" id="maxPecas" name="maxPecas" value={colaboradorData.maxPecas} onChange={(e) => setColaboradorData({ ...colaboradorData, maxPecas: e.target.value })} />
                        < label htmlFor="minPecas">Mínimo de peças:</label>
                        <input type="text" id="minPecas" name="minPecas" value={colaboradorData.minPecas} onChange={(e) => setColaboradorData({ ...colaboradorData, minPecas: e.target.value })} />

                        <button type="submit" className='buttonsEditFamilias'>Salvar</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AdministradorEditCaixas;


