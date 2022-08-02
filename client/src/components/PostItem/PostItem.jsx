import React, { Fragment } from 'react'
import styles from './PostItem.module.scss'
import eye from '../../assets/eye.svg'
import comment from '../../assets/comment.svg'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

const PostItem = props => {
	const { post } = props

	if (!post) {
		return <p>loading...</p>
	}
	return (
		<Link replace to={`/${post._id}`}>
			<div className={styles.wrapper}>
				<figure className={styles.imgWrapper}>
					{post.imgUrl && (
						<img
							className={styles.img}
							src={`http://localhost:3002/${post.imgUrl}`}
							alt=''
						/>
					)}
				</figure>
				<div className={styles.userInfo}>
					<p className={styles.username}>{post.username}</p>
					<Fragment>
						<Moment format='YYYY/MM/DD'>{post.createdAt}</Moment>
					</Fragment>
				</div>
				<h3 className={styles.title}>{post.title}</h3>
				<p className={styles.text}>{post.text}</p>
				<div className={styles.info}>
					<div className={styles.counter}>
						<img className={styles.icon} src={eye} alt='eye' />
						<span>{post.views}</span>
					</div>
					<div className={styles.counter}>
						<img className={styles.icon} src={comment} alt='comment' />
						<span>{post.comments.length}</span>
					</div>
				</div>
			</div>
		</Link>
	)
}

export default PostItem
