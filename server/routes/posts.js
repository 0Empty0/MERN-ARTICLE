import { Router } from 'express'
import {
	createPost,
	getAll,
	getById,
	getMyPosts,
	removePost,
	updatePost,
	getPostComments,
} from '../controllers/posts.js'
import { checkAuth } from '../utils/checkAuth.js'

const router = new Router()

//Create Post
router.post('/', checkAuth, createPost)

//Get All Posts
router.get('/', getAll)

//Get By Id
router.get('/:id', getById)

//Get My Posts
router.get('/user/me', checkAuth, getMyPosts)

//Remove Post
router.delete('/:id', checkAuth, removePost)

//Update Post
router.put('/:id', checkAuth, updatePost)

//Get Post Comments
router.get('/comments/:id', getPostComments)

export default router
