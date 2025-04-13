const saltRounds = 10
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('./../models/User.model')


const signup = (req, res, next) => {

    const { email, password, username, role } = req.body

    if (password.length < 2) {
        res.status(400).json({ message: 'Password must have at least 2 characters' })
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (foundUser) {
                res.status(400).json({ message: "User already exists." })
                return
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return User.create({ email, password: hashedPassword, username })
        })
        .then((createdUser) => {

            const { email, username, _id, role } = createdUser
            const user = { email, username, _id, role }

            // Log in the user immediately after signup
            const payload = { _id, email, username, role }
            const authToken = jwt.sign(
                payload,
                process.env.TOKEN_SECRET,
                { algorithm: 'HS256', expiresIn: "6h" }
            )

            res.status(201).json({ user, authToken })
        })
        .catch(err => {
            next(err)
        })
}


const login = (req, res, next) => {

    const { email, password } = req.body;

    if (email === '' || password === '') {
        res.status(400).json({ message: "Provide email and password." });
        return;
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json({ message: "User not found." })
                return;
            }

            if (bcrypt.compareSync(password, foundUser.password)) {

                const { _id, email, username, role } = foundUser;

                const payload = { _id, email, username, role }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }
                )

                res.json({ authToken: authToken });
            }
            else {
                res.status(401).json({ message: "Unable to authenticate the user: wrong password." });
            }

        })
        .catch(err => next(err));
}


const verify = (req, res, next) => {
    const userId = req.payload._id

    User
        .findById(userId)
        .select('-password')  // excluye la contraseña
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "User not found" })
            }

            res.status(200).json(user)
        })
        .catch(err => {
            console.error('Error in verify route:', err)
            res.status(500).json({ message: "Error verifying user" })
        })
}


module.exports = {
    signup,
    login,
    verify
}