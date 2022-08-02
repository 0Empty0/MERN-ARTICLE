import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from '../Navbar/Navbar'
import styles from './Header.module.scss'
import { useDispatch } from 'react-redux'
import { checkIsAuth, logout } from '../../../store/features/auth/authSlice'
import { toast } from 'react-toastify'

const Header = () => {
	const isAuth = useSelector(checkIsAuth)
	const dispatch = useDispatch()

	const logoutHandler = () => {
		dispatch(logout())

		window.localStorage.removeItem('token')
		toast('You logout')
	}

	return (
		<header className='header'>
			<div className='container'>
				<div className={styles.inner}>
					<h2 className={styles.logo}>
						<span>Articles</span>
					</h2>
					<Navbar />

					{isAuth ? (
						<button onClick={logoutHandler} className='button-outline'>
							Logout
						</button>
					) : (
						<Link to='/login' className='button-outline'>
							Login
						</Link>
					)}
				</div>
			</div>
		</header>
	)
}
export default Header
