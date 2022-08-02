import React, { useEffect, useState, useCallback } from 'react'
import axios from '../../utils/axios'
import PostItem from '../../components/PostItem/PostItem'
import styles from './PostsPage.module.scss'

const PostsPage = () => {
	const [posts, setPosts] = useState([])
	const fetchMyPost = useCallback(async () => {
		try {
			const { data } = await axios.get('/posts/user/me')
			setPosts(data)
		} catch (error) {
			console.error(error)
		}
	}, [])
	useEffect(() => {
		fetchMyPost()
	}, [fetchMyPost])

	return (
		<section>
			<div className='container'>
				<div className={styles.posts}>
					{posts?.map((post, index) => (
						<PostItem key={index} post={post} />
					))}
				</div>
			</div>
		</section>
	)
}

export default PostsPage
