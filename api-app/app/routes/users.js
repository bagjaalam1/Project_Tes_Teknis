const authMiddleware = require('../../middleware/authMiddleWare');

module.exports = (app) => {
  const router = require('express').Router();
  const controller = require('../contollers/users')

  router.get('/users', authMiddleware, controller.getUsers);
    router.post('/register', controller.postRegister);
    router.post('/login', controller.postLogin);
    router.post('/logout', authMiddleware, controller.logout);

  app.use('/api', router)

  return router
}
