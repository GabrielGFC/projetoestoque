//export da biblioteca
const User = require('../models/User');
const Cargo = require('../models/Cargo');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

//get
exports.get = async (req, res) => {
  try {
    const users = await User.findAll(
      {include: [
        { model: Cargo, attributes: ['cargo'] }]
      }
    );
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
};

//post
exports.register = async (req, res) => {
  const {
    matricula,
    senha,
    email,
    box,
    nome,
    periodo,
    idCargo  
  } = req.body;

  try {
    let hashedSenha;
    const matriculaStr = matricula.toString();
    const periodoStr = periodo.toString();

    if (matricula && matriculaStr.length == 7) {
      // code here
    } else {
      return res.status(401).json({ message: 'Matrícula não preenchida ou inválida' });
    }

    if (senha && senha.length > 1 && senha.length < 128) {
      hashedSenha = bcrypt.hashSync(senha, salt);
    } else {
      return res.status(401).json({ message: 'Senha não preenchida ou inválida' });
    }

    if (email && email.length > 1 && email.length < 128) {
      // code here
    } else {
      return res.status(401).json({ message: 'E-mail não preenchido ou inválido' });
    }

    if (nome && nome.length > 1 && nome.length < 128) {
      // code here
    } else {
      return res.status(401).json({ message: 'Nome não preenchido ou inválido' });
    }
    if (box && box.length > 1 && box.length < 128) {
      // code here
    } else {
      return res.status(401).json({ message: 'box não preenchido ou inválido' });
    }

    if (periodo && periodoStr.length <= 2) {
      // code here
    } else {
      return res.status(401).json({ message: 'Período não preenchido ou inválido' });
    }

  
  await User.create({   
    matricula,
    senha: hashedSenha,
    email,
    box,
    nome,
    periodo,
    idCargo,
    });
    res.status(201).json({ message: 'User register successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//put
exports.update = async (req, res) => {
  const { user_id } = req.params;
  const {
    matricula,
    senha,
    email,
    box,
    nome,
    periodo,
    idCargo  
  } = req.body;

  try {
    let hashedSenha;
    const matriculaStr = matricula.toString();
    const periodoStr = periodo.toString();

    if (matricula && matriculaStr.length == 7) {
      // code here
    } else {
      return res.status(401).json({ message: 'Matrícula não preenchida ou inválida', matricula });
    }

    if (senha && senha.length > 1 && senha.length < 128) {
      hashedSenha = bcrypt.hashSync(senha, salt);
    } else {
      return res.status(401).json({ message: 'Senha não preenchida ou inválida' });
    }
    if (box && box.length > 1 && box.length < 128) {
      hashedSenha = bcrypt.hashSync(box, salt);
    } else {
      return res.status(401).json({ message: 'box não preenchida ou inválida' });
    }

    if (email && email.length > 1 && email.length < 128) {
      // code here
    } else {
      return res.status(401).json({ message: 'E-mail não preenchido ou inválido' });
    }

    if (nome && nome.length > 1 && nome.length < 128) {
      // code here
    } else {
      return res.status(401).json({ message: 'Nome não preenchido ou inválido' });
    }

    if (periodo && periodoStr.length < 2) {
    } else {
      return res.status(401).json({ message: 'Período não preenchido ou inválido' });
    }

    await User.update({
    matricula,
    senha: hashedSenha,
    email,
    box,
    nome,
    periodo,
    idCargo,
    },
  
    { where: { matricula: user_id } });
    res.status(200).json({ message: 'User updated successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//delete
exports.delete = async (req, res) => {
    const { user_id } = req.params;
    try {
        await User.destroy({ where: { matricula: user_id } });

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};