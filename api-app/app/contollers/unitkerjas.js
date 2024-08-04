const UnitKerja = require("../../models/unitkerja")

exports.getUnitKerja = async (req, res) => {
    try {
        const daftarUnitKerja = await UnitKerja.findAll()
        res.status(200).json({daftarUnitKerja})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Failed to fetch Data Unit Kerja', error})
    }
}

exports.postUnitKerja = async (req, res) => {
    const {
        name
    } = req.body
    console.log('name:', name)
      
    try {
        const newUnitKerja = await UnitKerja.create({
            name,
        })

        res.status(201).json({newUnitKerja, message: 'Berhasil ditambahkan!'})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}

exports.editUnitKerja = async (req, res) => {
    const {
        nama
    } = req.body

    const { id } = req.params

    try {
        const unitKerja = await UnitKerja.findByPk(id)
        
        if(!pegawai) {
            return res.status(404).json({message: 'Unit Kerja not found'})
        }

        unitKerja.nama = nama

        await unitKerja.save()

        res.status(200).json({ pegawai, message: 'Edit Success!' });
    } catch (error) {
        console.log(error)
        res.status(500).json({error, message: 'Edit data Failed!'})
    }
}

exports.deleteUnitKerja = async (req, res) => {
    const { id } = req.params

    try {
        const unitKerja = await UnitKerja.findByPk(id)

        if(!unitKerja) {
            res.status(404).json({message: 'Unit Kerja not found!'})
        }

        await unitKerja.destroy()

        res.status(200).json({message: 'Delete data success!'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'delete data failed!'})
    }
}