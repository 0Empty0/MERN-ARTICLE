import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import styles from './LoginPage.module.scss'
import { loginUser } from '../../store/features/auth/authSlice'

const LoginPage = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const { status } = useSelector(state => state.auth)

	const dispatch = useDispatch()

	useEffect(() => {
		if (status) toast(status)
	}, [status])

	const handleSubmit = e => {
		e.preventDefault()
		try {
			dispatch(loginUser({ username, password }))

			setUsername('')
			setPassword('')
		} catch (error) {
			console.error(error)
		}
	}
	return (
		<section>
			<h1 className={styles.title}>Login</h1>
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
					<Link to='/register'>Create New Account</Link>
					<button className={`${styles.button} button`}>Login</button>
				</form>
			</div>
		</section>
	)
}

export default LoginPage
