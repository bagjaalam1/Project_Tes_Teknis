const authMiddleware = require('../../middleware/authMiddleWare')

module.exports = (app) => {
    const router = require('express').Router()
    const controller = require('../contollers/unitkerjas')

    router.get('/unit-kerja', authMiddleware, controller.getUnitKerja)
    router.post('/unit-kerja/add', authMiddleware, controller.postUnitKerja)
    router.put('/unit-kerja/:id', authMiddleware, controller.editUnitKerja)
    router.delete('/unit-kerja/:id', authMiddleware, controller.deleteUnitKerja)

    app.use('/api', router)

    return router
}