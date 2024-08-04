const Golongan = require("../../models/golongan")

exports.getGolongan = async (req, res) => {
    try {
        const golongan = await Golongan.findAll()
        res.status(200).json(golongan)
    } catch (error) {
        console.error('Failed to fetch golongan data')
        res.status(500).json({error: 'Failed to fetch golongan data', details: error.message})
    }
}