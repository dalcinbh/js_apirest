import Aluno from '../models/Aluno';
import Foto from '../models/Foto';

class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
      include: {
        model: Foto,
        attributes: ['url', 'filename'],
      },
    });
    return res.json({
      alunos,
    });
  }

  async store(req, res) {
    try {
      const {
        id, nome, sobrenome, idade, peso, altura,
      } = await Aluno.create(req.body);

      return res.json({
        id,
        nome,
        sobrenome,
        idade,
        peso,
        altura,
      });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((erro) => erro.message),
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['id não encontrado'],
        });
      }

      const aluno = await Aluno.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
          attributes: ['url', 'filename'],
        },
      });

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não encontrado'],
        });
      }
      return res.status(200).json(aluno);
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((erro) => erro.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['id não encontrado'],
        });
      }

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não encontrado'],
        });
      }

      const alunoAtualizado = await aluno.update(req.body);

      return res.status(200).json(alunoAtualizado);
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((erro) => erro.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['id não encontrado'],
        });
      }

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não encontrado'],
        });
      }
      await aluno.destroy();

      return res.json({
        apagado: true,
      });
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((erro) => erro.message),
      });
    }
  }
}

export default new AlunoController();
