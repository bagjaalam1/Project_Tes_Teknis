module.exports = (app) => {
    const router = require('express').Router()
    const controller = require('../contollers/pegawais')

    router.get('/pegawais', controller.getPegawai)
    router.post('/pegawais', controller.postPegawai)
    router.put('/pegawais/:id', controller.editPegawai)
    router.delete('/pegawais/:id', controller.deletePegawai)

    app.use('/api', router)

    return router
}