const Eselon = require("../../models/eselon")

exports.getEselon = async (req, res) => {
    try {
        const eselon = await Eselon.findAll()
        res.status(200).json(eselon)
    } catch (error) {
        console.error('Failed to fetch eselon data')
        res.status(500).json({error: 'Failed to fetch eselon data', details: error.message})
    }
}