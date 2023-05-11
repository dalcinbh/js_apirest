import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      return res.json({
        novoUser,
      });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((erro) => erro.message),
      });
    }
  }

  // Index

  async index(req, res) {
    try {
      console.log('User ID: ', req.userId);
      console.log('User Email: ', req.userEmail);
      const users = await User.findAll();
      return res.json(users);
    } catch (err) {
      return res.json(null);
    }
  }

  // Show

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      return res.json(user);
    } catch (err) {
      return res.json(null);
    }
  }

  // Update

  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID não enviado.'],
        });
      }
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não exister'],
        });
      }

      const novosDados = await user.update(req.body);
      return res.json(novosDados);
    } catch (err) {
      return res.json(null);
    }
  }

  // Delete

  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID não enviado.'],
        });
      }
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não exister'],
        });
      }

      await user.destroy();
      return res.json(user);
    } catch (err) {
      return res.json(null);
    }
  }
}

export default new UserController();
