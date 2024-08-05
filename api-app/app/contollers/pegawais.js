const Pegawai = require('../../models/pegawai')
const upload = require('../../multerConfig')

exports.getPegawai = async (req, res) => {
    try {
        const daftarPegawai = await Pegawai.findAll()
        res.status(201).json(daftarPegawai)
    } catch (error) {
        res.status(500).json({message: 'Unable to get Pegawai Data'})
        console.log(error)
    }
}

exports.postPegawai = 
    async (req, res) => {
        console.log('req.file:', req.file);   // Debugging
        console.log('req.body:', req.body);   // Debugging
        const {
            nip, nama, tempatLahir, alamat, tanggalLahir, jenisKelamin, golongan,
            eselon, tempatTugas, agama, unitKerjaId, noHp, npwp
        } = req.body

        const foto = req.file ? req.file.filename : null
    
        console.log(req.body)
        console.log('foto', foto)
          
        try {
            const newPegawai = await Pegawai.create({
                nip,
                nama,
                tempatLahir,
                alamat,
                tanggalLahir,
                jenisKelamin,
                golongan,
                eselon,
                tempatTugas,
                agama,
                unitKerjaId,
                noHp,
                npwp,
                foto
            })
    
            console.log('newPegawai:',newPegawai)
    
            res.status(201).json({newPegawai, message: 'Berhasil ditambahkan!'})
        } catch (error) {
            console.log(error)
            res.status(500).json({error})
        }
    }   


exports.editPegawai = async (req, res) => {
    const {
        nip, nama, tempatLahir, alamat, tanggalLahir, jenisKelamin, golongan,
        eselon, tempatTugas, agama, unitKerjaId, noHp, npwp, foto
    } = req.body

    const { id } = req.params

    try {
        const pegawai = await Pegawai.findByPk(id)
        console.log('pegawai:', pegawai)
        
        if(!pegawai) {
            return res.status(404).json({message: 'Pegawai not found'})
        }

        pegawai.nip = nip;
        pegawai.nama = nama;
        pegawai.tempatLahir = tempatLahir;
        pegawai.alamat = alamat;
        pegawai.tanggalLahir = tanggalLahir;
        pegawai.jenisKelamin = jenisKelamin;
        pegawai.golongan = golongan;
        pegawai.eselon = eselon;
        pegawai.tempatTugas = tempatTugas;
        pegawai.agama = agama;
        pegawai.unitKerjaId = unitKerjaId;
        pegawai.noHp = noHp;
        pegawai.npwp = npwp;
        pegawai.foto = foto;

        await pegawai.save()

        res.status(200).json({ pegawai, message: 'Edit Success!' });
    } catch (error) {
        console.log(error)
        res.status(500).json({error, message: 'Edit data Failed!'})
    }
}

exports.deletePegawai = async (req, res) => {
    const { id } = req.params

    try {
        const pegawai = await Pegawai.findByPk(id)

        if(!pegawai) {
            res.status(404).json({message: 'Pegawai not found!'})
        }

        await pegawai.destroy()

        res.status(200).json({message: 'Delete data success!'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'delete data failed!'})
    }
}

exports.getPegawaiByUnitKerja = async (req, res) => {
    const { unitKerjaId } = req.params

    try {
        const pegawai = await Pegawai.findAll({
            where: { unitKerjaId }
        })
        res.status(200).json({pegawai})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: 'Unable to get Pegawai Data by unit kerja'})
    }
}