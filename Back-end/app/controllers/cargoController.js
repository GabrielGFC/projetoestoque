//export da biblioteca
const Cargo = require('../models/Cargo');
//get
exports.get = async (req, res) => {
  try {
    const cargo = await Cargo.findAll();
    res.json(cargo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
};
//post
exports.register = async (req, res) => {
    try {
        const { 
            cargo,  
        } = req.body;

        await Cargo.create({   
            cargo,
        });
        res.status(201).json({ message: 'Cargo register successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


