import React, { Fragment } from 'react'
import Header from './Header/Header'

const Layout = props => {
	return (
		<Fragment>
			<Header />
			<main className='main'>{props.children}</main>
		</Fragment>
	)
}

export default Layout
