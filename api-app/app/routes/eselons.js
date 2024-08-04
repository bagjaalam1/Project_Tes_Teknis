module.exports = (app) => {
    const router = require('express').Router()
    const controller = require('../contollers/eselons')

    router.get('/eselon', controller.getEselon)

    app.use('/api', router)

    return router
}