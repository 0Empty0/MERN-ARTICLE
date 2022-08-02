import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styles from './Navbar.module.scss'
import { checkIsAuth } from '../../../store/features/auth/authSlice'

const Navbar = () => {
	const isAuth = useSelector(checkIsAuth)
	return (
		<Fragment>
			{isAuth && (
				<ul className={styles.navbar}>
					<li className={styles.item}>
						<NavLink
							to='/'
							className={({ isActive }) =>
								styles.link + ' ' + (isActive ? styles.active : '')
							}
						>
							Home
						</NavLink>
					</li>
					<li className={styles.item}>
						<NavLink
							to='/posts'
							className={({ isActive }) =>
								styles.link + ' ' + (isActive ? styles.active : '')
							}
						>
							My Posts
						</NavLink>
					</li>
					<li className={styles.item}>
						<NavLink
							to='/new'
							className={({ isActive }) =>
								styles.link + ' ' + (isActive ? styles.active : '')
							}
						>
							Add New Posts
						</NavLink>
					</li>
				</ul>
			)}
		</Fragment>
	)
}

export default Navbar
