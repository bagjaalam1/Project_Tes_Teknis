const authMiddleware = require('../../middleware/authMiddleWare');
const upload = require('../../multerConfig')

module.exports = (app) => {
    const router = require('express').Router()
    const controller = require('../contollers/pegawais')

    router.get('/pegawais', authMiddleware, controller.getPegawai);
    router.post('/pegawais/add', authMiddleware, upload.single('foto'), controller.postPegawai);
    router.get('/pegawais/:id', authMiddleware, controller.getPegawaiById);
    router.put('/pegawais/:id', authMiddleware, controller.editPegawai);
    router.delete('/pegawais/:id', authMiddleware, controller.deletePegawai);
    router.get('/pegawais/unit-kerja/:unitKerjaId', authMiddleware, controller.getPegawaiByUnitKerja);

    app.use('/api', router)

    return router
}