import React, { Fragment, useState, useEffect, useCallback } from 'react'
import styles from './PostPage.module.scss'
import eye from '../../assets/eye.svg'
import commentImg from '../../assets/comment.svg'
import Moment from 'react-moment'
import axios from '../../utils/axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removePost } from '../../store/features/post/postSlice'
import { toast } from 'react-toastify'
import CommentItem from '../../components/CommentItem/CommentItem'
import {
	createComment,
	getPostComment,
} from '../../store/features/comment/commentSlice'

const PostPage = () => {
	const [post, setPost] = useState(null)
	const [comment, setComment] = useState('')

	const { user } = useSelector(state => state.auth)
	const { comments } = useSelector(state => state.comment)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const params = useParams()

	const backHandler = () => {
		navigate('/')
	}

	const submitHandler = e => {
		e.preventDefault()
		try {
			const postId = params.id
			if (comment.trim().length === 0) {
				toast('Field cannot be empty')
				throw new Error('empty field')
			}
			dispatch(createComment({ postId, comment }))
			console.log(comments)
			setComment('')
		} catch (error) {
			console.error(error)
		}
	}

	const removePostHandler = () => {
		try {
			dispatch(removePost(params.id))
			navigate('/posts')
			toast('Post has been removed')
		} catch (error) {
			console.error(error)
		}
	}

	const fetchPost = useCallback(async () => {
		const { data } = await axios.get(`/posts/${params.id}`)

		setPost(data)
	}, [params.id])

	const fetchComments = useCallback(async () => {
		try {
			dispatch(getPostComment(params.id))
		} catch (error) {
			console.log(error)
		}
	}, [params.id, dispatch])

	useEffect(() => {
		fetchPost()
	}, [fetchPost])

	useEffect(() => {
		fetchComments()
	}, [fetchComments])

	if (!post || !comments) {
		return <p>loading...</p>
	}

	return (
		<section className={styles.section}>
			<div className='container'>
				<figure className={styles.imgWrapper}>
					{post.imgUrl && (
						<img
							className={styles.img}
							src={`http://localhost:3002/${post.imgUrl}`}
							alt='img'
						/>
					)}
				</figure>
				<div className={styles.inner}>
					<main className={styles.main}>
						<h1 className={styles.title}>{post.title}</h1>
						<nav className={styles.nav}>
							<div className={styles.counters}>
								<div className={styles.counter}>
									<img className={styles.icon} src={eye} alt='eye' />
									<span>{post.views}</span>
								</div>
								<div className={styles.counter}>
									<img className={styles.icon} src={commentImg} alt='comment' />
									<span>{post.comments.length}</span>
								</div>
							</div>
							<Fragment>
								<Moment format='YYYY/MM/DD'>{post.createdAt}</Moment>
							</Fragment>
						</nav>
						<p className={styles.text}>{post.text}</p>
					</main>
					<aside className={styles.aside}>
						<h4 className={styles.comments}>Comments</h4>
						<div className={styles.commentWrapper}>
							{comments.map((comment, index) => (
								<CommentItem key={index} comment={comment} />
							))}
						</div>
						<form onSubmit={submitHandler} className={styles.form}>
							<div className={styles.formInner}>
								<input
									value={comment}
									onChange={e => setComment(e.target.value)}
									type='text'
									className='input'
									placeholder='Comment'
								/>
								<button className='button'>Send</button>
							</div>
						</form>
					</aside>
				</div>
				<button onClick={backHandler} className={`${styles.button} button`}>
					Back
				</button>
				{user?._id === post.author && (
					<Fragment>
						<Link
							className={`${styles.button} button`}
							to={`/${params.id}/edit`}
						>
							Edit
						</Link>
						<button
							onClick={removePostHandler}
							className={`${styles.button} button`}
						>
							Delete
						</button>
					</Fragment>
				)}
			</div>
		</section>
	)
}

export default PostPage
