import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
	comments: [],
	loading: false,
}

export const createComment = createAsyncThunk(
	'comment/CreateComment',
	async ({ postId, comment }) => {
		try {
			const { data } = await axios.post(`/comments/${postId}`, {
				postId,
				comment,
			})
			return data
		} catch (error) {
			console.error(error)
		}
	}
)

export const getPostComment = createAsyncThunk(
	'comment/getPostComment',
	async postId => {
		try {
			const { data } = await axios.get(`/posts/comments/${postId}`)
			return data
		} catch (error) {
			console.error(error)
		}
	}
)

export const commentSlice = createSlice({
	name: 'comment',
	initialState,
	reducers: {},
	extraReducers: {
		//Create Posts
		[createComment.pending]: state => {
			state.loading = true
		},
		[createComment.fulfilled]: (state, action) => {
			state.loading = false
			state.comments.push(action.payload)
		},
		[createComment.rejected]: state => {
			state.loading = false
		},
		//Create Posts
		[getPostComment.pending]: state => {
			state.loading = true
		},
		[getPostComment.fulfilled]: (state, action) => {
			state.loading = false
			state.comments = action.payload
		},
		[getPostComment.rejected]: state => {
			state.loading = false
		},
	},
})

export default commentSlice.reducer
