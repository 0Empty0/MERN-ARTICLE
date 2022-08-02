import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../../store/features/post/postSlice'
import styles from './AddPostPage.module.scss'

const AddPostPage = () => {
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const [image, setImage] = useState('')

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const submitHandler = e => {
		e.preventDefault()
		try {
			const data = new FormData()
			data.append('title', title)
			data.append('text', text)
			data.append('image', image)

			dispatch(createPost(data))

			setTitle('')
			setText('')

			navigate('/')
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<section>
			<h1 className={styles.title}>Add New Post</h1>
			<div className='container'>
				<form className={styles.flex} onSubmit={submitHandler}>
					<div className={`${styles.flex} ${styles.wrapper}`}>
						<input
							type='file'
							className={styles.file}
							onChange={e => setImage(e.target.files[0])}
							accept='image/png, image/jpg, image/gif, image/jpeg'
						/>
						<figure className={styles.img}>
							{image && <img src={URL.createObjectURL(image)} alt='img' />}
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
					<button className={`${styles.button} button`}>Create</button>
				</form>
			</div>
		</section>
	)
}

export default AddPostPage
