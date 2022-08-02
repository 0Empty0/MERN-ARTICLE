import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../store/features/auth/authSlice'
import { toast } from 'react-toastify'
import styles from './RegisterPage.module.scss'

const RegisterPage = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const { status } = useSelector(state => state.auth)

	const dispatch = useDispatch()

	useEffect(() => {
		toast(status)
	}, [status])

	const handleSubmit = e => {
		e.preventDefault()
		try {
			dispatch(registerUser({ username, password }))

			setUsername('')
			setPassword('')
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<section>
			<h1 className={styles.title}>Register</h1>
			<div className='container'>
				<form onSubmit={handleSubmit} className={styles.form}>
					<div className={styles.wrapper}>
						<input
							type='text'
							name='input'
							className='input'
							placeholder='username'
							onChange={e => setUsername(e.target.value)}
							value={username}
							required
						/>
					</div>
					<div className={styles.wrapper}>
						<input
							type='password'
							name='input'
							className='input'
							placeholder='password'
							onChange={e => setPassword(e.target.value)}
							value={password}
							required
						/>
					</div>
					<Link to='/login'>Login To An Existing Account</Link>
					<button className={`${styles.button} button`}>Register</button>
				</form>
			</div>
		</section>
	)
}

export default RegisterPage
