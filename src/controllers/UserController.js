import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const { id, nome, email } = await User.create(req.body);
      return res.json({
        id,
        nome,
        email,
      });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((erro) => erro.message),
      });
    }
  }

  // Update

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não exister'],
        });
      }

      const { id, nome, email } = await user.update(req.body);
      return res.json({
        id,
        nome,
        email,
      });
    } catch (err) {
      return res.json(null);
    }
  }

  // Delete

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não exister'],
        });
      }

      const { id, nome, email } = await user.destroy();
      return res.json({
        id,
        nome,
        email,
      });
    } catch (err) {
      return res.json(null);
    }
  }

  // Index

  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'nome', 'email'],
      });
      return res.json(users);
    } catch (err) {
      return res.json(null);
    }
  }

  // Show

  async show(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      const { id, nome, email } = user;

      return res.json({
        id,
        nome,
        email,
      });
    } catch (err) {
      return res.json(null);
    }
  }
}

export default new UserController();
