import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
	posts: [],
	popularPosts: [],
	loading: false,
}

export const createPost = createAsyncThunk('posts/createPost', async params => {
	try {
		const { data } = axios.post('/posts', params)
		return data
	} catch (error) {
		console.error(error)
	}
})

export const getAllPosts = createAsyncThunk('posts/getAllPosts', async () => {
	try {
		const { data } = await axios.get('/posts')
		return data
	} catch (error) {
		console.error(error)
	}
})

export const removePost = createAsyncThunk('posts/removePost', async id => {
	try {
		const { data } = await axios.delete(`/posts/${id}`, id)

		return data
	} catch (error) {
		console.error(error)
	}
})

export const updatePost = createAsyncThunk(
	'posts/updatePost',
	async updatedPost => {
		try {
			const { data } = await axios.put(`/posts/${updatedPost.id}`, updatedPost)

			return data
		} catch (error) {
			console.error(error)
		}
	}
)

export const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {},
	extraReducers: {
		//Create Posts
		[createPost.pending]: state => {
			state.loading = true
		},
		[createPost.fulfilled]: (state, action) => {
			state.loading = false
			state.posts.push(action.payload)
		},
		[createPost.rejected]: state => {
			state.loading = false
		},

		//Get All Posts
		[getAllPosts.pending]: state => {
			state.loading = true
		},
		[getAllPosts.fulfilled]: (state, action) => {
			state.loading = false
			state.posts = action.payload.posts
			state.popularPosts = action.payload.popularPosts
		},
		[getAllPosts.rejected]: state => {
			state.loading = false
		},

		//Remove Post
		[removePost.pending]: state => {
			state.loading = true
		},
		[removePost.fulfilled]: (state, action) => {
			state.loading = false
			state.posts = state.posts.filter(post => post._id !== action.payload._id)
		},
		[removePost.rejected]: state => {
			state.loading = false
		},

		//Update Post
		[updatePost.pending]: state => {
			state.loading = true
		},
		[updatePost.fulfilled]: (state, action) => {
			state.loading = false
			const index = state.posts.findIndex(
				post => post._id === action.payload._id
			)
			state.posts[index] = action.payload0
		},
		[updatePost.rejected]: state => {
			state.loading = false
		},
	},
})

export default postSlice.reducer
