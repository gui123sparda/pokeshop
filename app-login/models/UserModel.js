const pool = require('../db');
const bcrypt = require('bcrypt');

class UserModel {
  static async create({ nome, endereco, email, login, senha, administrador = false }) {
    const senhaHash = await bcrypt.hash(senha, 10);
    const query = `
      INSERT INTO usuario (nome, endereco, email, login, senha, administrador)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, nome, email, administrador
    `;
    const values = [nome, endereco, email, login, senhaHash, administrador];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findByLogin(login) {
    const result = await pool.query('SELECT * FROM usuario WHERE login = $1', [login]);
    return result.rows[0] || null;
  }

  static async updateById(id, { nome, endereco, email, senha }) {
    const senhaHash = senha ? await bcrypt.hash(senha, 10) : null;
    let query = `UPDATE usuario SET nome = $1, endereco = $2, email = $3`;
    const values = [nome, endereco, email];

    if (senhaHash) {
      query += `, senha = $4 WHERE id = $5`;
      values.push(senhaHash, id);
    } else {
      query += ` WHERE id = $4`;
      values.push(id);
    }

    await pool.query(query, values);
    return true;
  }

  static async deleteById(id) {
    await pool.query('DELETE FROM usuario WHERE id = $1', [id]);
    return true;
  }
}

module.exports = UserModel;
