import express from 'express';

import { UserController } from './user/user.controller';

const UserRoutes = express.Router();
const userController = new UserController();

// user admin
UserRoutes.get('/user/list', userController.list);
UserRoutes.get('/user/add', userController.add);
UserRoutes.post('/user/add', userController.addPost);
UserRoutes.get('/user/edit/:id', userController.edit);
UserRoutes.post('/user/edit/:id', userController.editPatch);
UserRoutes.get('/user/delete/:id', userController.delete);
UserRoutes.get('/user/:id', userController.show);

export { UserRoutes };
