module.exports = (app) => {
    const router = require('express').Router()
    const controller = require('../contollers/unitkerjas')

    router.get('/unit-kerja', controller.getUnitKerja)
    router.post('/unit-kerja/add', controller.postUnitKerja)
    router.put('/unit-kerja/:id', controller.editUnitKerja)
    router.delete('/unit-kerja/:id', controller.deleteUnitKerja)

    app.use('/api', router)

    return router
}