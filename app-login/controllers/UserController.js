const UserModel = require('../models/UserModel');


const UserController = {
  createSelf: async (req,res) =>{
    const {nome,endereco,email,login,senha,administrador=false} = req.body;
    await UserModel.create({nome,endereco,email,login,senha,administrador});
    res.json({message: 'Usuario Cadastrado com sucesso'});
  },
  updateSelf: async (req, res) => {
    const userId = req.session.user?.id;
    if (!userId) return res.status(403).json({ error: 'Não autorizado' });

    const { nome, endereco, email, senha } = req.body;
    await UserModel.updateById(userId, { nome, endereco, email, senha });
    res.json({ message: 'Dados atualizados com sucesso' });
  },

  deleteSelf: async (req, res) => {
    const userId = req.session.user?.id;
    if (!userId) return res.status(403).json({ error: 'Não autorizado' });

    await UserModel.deleteById(userId);
    req.session.destroy(() => {
      res.json({ message: 'Cadastro excluído e logout realizado' });
    });
  }
};

module.exports = UserController;
