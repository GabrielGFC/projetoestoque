const sequelize = require('../config/database');
const Cargo = require('../models/Cargo');
const Item = require('../models/Item');
const Familia = require('../models/Familia');
const User = require('../models/User');
const Caixa = require('../models/Caixa');
const Pedido = require('../models/Pedido');
const Estoque = require('../models/Estoque');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);


const registrosIniciais = async () => {
    try {
        // Sincroniza o banco de dados sem forçar a recriação do esquema
        await sequelize.sync();

        // Verifica se os registros já existem
        const adminCargo = await Cargo.findOne({ where: { cargo: 'admin' } });
        const alunoCargo = await Cargo.findOne({ where: { cargo: 'aluno' } });
        const colaboradoresCargo = await Cargo.findOne({ where: { cargo: 'colaboradores' } });
        const adminLogin = await User.findOne({ where: { matricula: 1010101, } });
        const alunoLogin = await User.findOne({ where: { matricula: 7654321 } });
        const colaboradorLogin = await User.findOne({ where: { matricula: 1234567} });
        const item = await Item.findOne({ where: { idItem: 1 } });
        const familia = await Familia.findOne({ where: { idFamilia: 1 } });
        const caixa = await Caixa.findOne({ where: { idCaixa: 1 } });
        const pedido = await Pedido.findOne({ where: { idPedido: 1 } });
        const estoque = await Estoque.findOne({ where: { idEstoque: 1 } });
        // Cria registros se não existirem
        if (!adminCargo) {
            await Cargo.create({ cargo: 'admin' });
        }

        if (!alunoCargo) {
            await Cargo.create({ cargo: 'aluno' });
        }

        if (!colaboradoresCargo) {
            await Cargo.create({ cargo: 'colaboradores' });
        }

        if (!item) {
            await Item.create({ idItem: 1, nome: 'Bisturi', quantidade: 2, descricao: 'O bisturi é uma ferramenta cirúrgica de lâmina afiada e pontiaguda, utilizada para realizar incisões precisas em tecidos durante procedimentos cirúrgicos' });
        }

        if (!familia) {
            await Familia.create({ idFamilia: 1, nome: 'Cirúrgica', descricao: 'Itens usados para cirurgia', quantMin: '12', quantMax: '20'});
        }
       
        if (!adminLogin) {
            const hashedAdminSenha = bcrypt.hashSync('admin', salt)
            await User.create({ matricula: 1010101, senha: hashedAdminSenha, email: 'admin@gmail.com', box: 100 ,nome: 'Admin', periodo: 0, idCargo: 1 });
        }

        if (!alunoLogin) {
            const hashedAlunoSenha = bcrypt.hashSync('aluno', salt)
            await User.create({ matricula: 7654321, senha: hashedAlunoSenha, email: 'aluno@gmail.com', box: 181, nome: 'Lucas Fernandes', periodo: 1, idCargo: 2 });
        }

        if (!colaboradorLogin) {
            const hashedColabSenha = bcrypt.hashSync('colaborador', salt)
            await User.create({ matricula: 1234567, senha: hashedColabSenha, email: 'colaborador@gmail.com', box: 100, nome: 'Colaborador', periodo: 2, idCargo: 3});
        }

        if (!caixa) {
            await Caixa.create({ idItem: 1, nome: 'Cirúrgica', matricula: 7654321, quantidade: 15});
        }

        if (!pedido) {
            await Pedido.create({ aprovacao: false, idCaixa: 1, matricula: 7654321});
        }

        if (!estoque) {
            await Estoque.create({ idCaixa: 1, matricula: 7654321});
        }

        console.log('Registros iniciais criados com sucesso!');
    } catch (error) {
        console.error('Erro ao criar registros iniciais:', error);
    }
};
module.exports = registrosIniciais