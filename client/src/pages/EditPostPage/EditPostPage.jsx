import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updatePost } from '../../store/features/post/postSlice'
import axios from '../../utils/axios'
import styles from './EditPostPage.module.scss'

const EditPostPage = () => {
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const [oldImage, setOldImage] = useState('')
	const [newImage, setNewImage] = useState('')

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const params = useParams()

	const fetchPost = useCallback(async () => {
		const { data } = await axios.get(`/posts/${params.id}`)
		setTitle(data.title)
		setText(data.text)
		setOldImage(data.imgUrl)
	}, [params.id])

	useEffect(() => {
		fetchPost()
	}, [fetchPost])

	const submitHandler = e => {
		e.preventDefault()
		try {
			const updatedPost = new FormData()

			updatedPost.append('title', title)
			updatedPost.append('text', text)
			updatedPost.append('id', params.id)
			updatedPost.append('image', newImage)

			dispatch(updatePost(updatedPost))

			setTitle('')
			setText('')

			navigate('/posts')
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<section>
			<h1 className={styles.title}>Edit Post</h1>
			<div className='container'>
				<form className={styles.flex} onSubmit={submitHandler}>
					<div className={`${styles.flex} ${styles.wrapper}`}>
						<input
							type='file'
							className={styles.file}
							onChange={e => {
								setNewImage(e.target.files[0])
								setOldImage('')
							}}
							accept='image/png, image/jpg, image/gif, image/jpeg'
						/>
						<figure className={styles.img}>
							{oldImage && (
								<img src={`http://localhost:3002/${oldImage}`} alt='img' />
							)}
							{newImage && (
								<img src={URL.createObjectURL(newImage)} alt='img' />
							)}
						</figure>
					</div>
					<div className={styles.wrapper}>
						<input
							type='text'
							className={`${styles.input} input`}
							placeholder='Title'
							onChange={e => setTitle(e.target.value)}
							value={title}
						/>
					</div>
					<div className={styles.wrapper}>
						<textarea
							type='text'
							className={`${styles.textarea} input`}
							placeholder='Text'
							onChange={e => setText(e.target.value)}
							value={text}
						/>
					</div>
					<button className={`${styles.button} button`}>Submit</button>
				</form>
			</div>
		</section>
	)
}

export default EditPostPage
