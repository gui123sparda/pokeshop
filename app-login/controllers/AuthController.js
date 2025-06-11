const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');

const AuthController = {
  login: async (req, res) => {
    const { login, senha } = req.body;
    const user = await UserModel.findByLogin(login);
    if (!user) return res.status(401).json({ error: 'Usuário não encontrado' });

    const match = await bcrypt.compare(senha, user.senha);
    if (!match) return res.status(401).json({ error: 'Senha incorreta' });

    req.session.user = {
      id: user.id,
      nome: user.nome,
      administrador: user.administrador
    };
    res.json({ message: 'Login realizado', user: req.session.user });
  },

  logout: (req, res) => {
    req.session.destroy(() => {
      res.json({ message: 'Logout realizado com sucesso' });
    });
  }
};

module.exports = AuthController;
