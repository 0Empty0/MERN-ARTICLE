import React, { useEffect } from 'react'
import styles from './MainPage.module.scss'
import PostItem from '../../components/PostItem/PostItem'
import PopularPost from '../../components/PopularPost/PopularPost'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../../store/features/post/postSlice'

const MainPage = () => {
	const dispatch = useDispatch()
	const { posts, popularPosts } = useSelector(state => state.post)

	useEffect(() => {
		dispatch(getAllPosts())
	}, [dispatch])

	if (!posts.length) {
		return (
			<section>
				<div className='container'>
					<h1 className={styles.title} style={{ textAlign: 'center' }}>
						Posts No Found
					</h1>
				</div>
			</section>
		)
	}

	return (
		<section className={styles.section}>
			<div className='container'>
				<div className={styles.inner}>
					<main className={styles.main}>
						<h2 className={styles.title}>All Posts:</h2>
						<div className={styles.mainWrapper}>
							{posts?.map((post, index) => (
								<PostItem key={index} post={post} />
							))}
						</div>
					</main>
					<aside className={styles.aside}>
						<h2 className={styles.title}>Popular Posts:</h2>
						<div>
							{popularPosts?.map((post, index) => (
								<PopularPost key={index} post={post} />
							))}
						</div>
					</aside>
				</div>
			</div>
		</section>
	)
}

export default MainPage
