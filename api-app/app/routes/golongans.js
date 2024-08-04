module.exports = (app) => {
    const router = require('express').Router()
    const controller = require('../contollers/golongans')

    router.get('/golongan', controller.getGolongan)

    app.use('/api', router)

    return router
}