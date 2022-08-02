import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//Register
export const register = async (req, res) => {
	try {
		const { username, password } = req.body

		const isUsed = await User.findOne({ username })

		if (isUsed) {
			return res.json({
				message: 'User name is used',
			})
		}

		const salt = bcrypt.genSaltSync(10)
		const hash = bcrypt.hashSync(password, salt)

		const newUser = new User({
			username,
			password: hash,
		})

		const token = jwt.sign(
			{
				id: newUser._id,
			},
			process.env.JWT_SECRET,
			{ expiresIn: '1d' }
		)

		await newUser.save()

		res.json({
			username,
			message: 'Succeed',
		})
	} catch (error) {
		res.json({
			message: 'Error creating user',
		})
	}
}

//Login
export const login = async (req, res) => {
	try {
		const { username, password } = req.body

		const user = await User.findOne({ username })
		if (!user) {
			return res.json({
				message: 'Unavailable user',
			})
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password)

		if (!isPasswordCorrect) {
			return res.json({
				message: 'Incorrect password',
			})
		}

		const token = jwt.sign(
			{
				id: user._id,
			},
			process.env.JWT_SECRET,
			{ expiresIn: '1d' }
		)

		res.json({
			token,
			user,
			message: 'You login',
		})
	} catch (error) {
		res.json({
			message: 'Error logging user',
		})
	}
}

//Get me
export const getMe = async (req, res) => {
	try {
		const user = await User.findById(req.userId)

		if (!user) {
			return res.json({
				message: 'Unavailable user',
			})
		}

		const token = jwt.sign(
			{
				id: user._id,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: '1d',
			}
		)

		res.json({
			user,
			token,
		})
	} catch (error) {
		res.json({
			message: 'No access',
		})
	}
}
