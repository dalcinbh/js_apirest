import { Router } from 'express';
import userController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// não deveria existir
// router.get('/', userController.index); // Lista usuários
// router.get('/', loginRequired, userController.show); // Lista usuário
// não deveria existir

router.post('/', loginRequired, userController.store); // Deixar aberto para criar novos usuários
router.put('/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.delete);

export default router;
