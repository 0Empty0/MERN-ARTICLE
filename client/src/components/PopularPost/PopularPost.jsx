import React from 'react'
import { Link } from 'react-router-dom'
import styles from './PopularPost.module.scss'

const PopularPost = props => {
	return (
		<div className={styles.wrapper}>
			<h4 className={styles.title}>
				<Link to={props.post._id}>{props.post.title}</Link>
			</h4>
		</div>
	)
}

export default PopularPost
