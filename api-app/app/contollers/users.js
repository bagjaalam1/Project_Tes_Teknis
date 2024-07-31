const User = require("../../models/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltOrRounds = 10
const JWT_SECRET = 'alam_secret'

exports.getUsers = async (req, res) => {
    try {
        console.log('udah masuk')
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (error) {
        console.error('Unable to get users data')
        res.status(500).json({error: 'Unable to get users data', details: error.message})
    }
}

exports.postRegister = async (req, res) => {
    const { username, email, password, repassword } = req.body

    try {
        //cek password
        if (password != repassword) {
            return res.status(400).json({message: 'Passwords do not match!'})
        }

        //cek email
        const existingUser = await User.findOne({ where: { email } })
        if (existingUser) {
            return res.status(400).json({message: 'Email already registered'})
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, saltOrRounds)

        const newUser = await User.create({
            email,
            username,
            password: hashedPassword
        })

        res.status(201).json({message: 'User registered succesfully', user: newUser})
        return

    } catch (error) {
        res.status(500).json({error: 'Unable to register', details: error.message})
    }
}

exports.postLogin = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ where: { email }})
        if (!user) {
            return res.status(401).json({ message: 'Email not registered' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Password do not match' })
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, username: user.username },
            JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.status(200).json({
            message: 'Login successfull',
            token,
            user: {
                id: user.id,
                username: user.name,
                email: user.email
            }
        })

    } catch (error) {
        res.status(400).json({error: 'Invalid request format', details: error.message})
    }
}

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successfull' })
}