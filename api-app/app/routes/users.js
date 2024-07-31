module.exports = (app) => {
  const router = require('express').Router();
  const controller = require('../contollers/users')

  router.get('/users', controller.getUsers)
  router.post('/register',controller.postRegister)
  router.post('/login', controller.postLogin)
  router.post('/logout', controller.logout)

  app.use('/api', router)

  return router
}
