import Comments from '../models/Comments.js'
import Post from '../models/Post.js'

export const createComment = async (req, res) => {
	try {
		const { postId, comment } = req.body
		const user = await User.findById(req.userId)

		if (!comment) return res.json({ message: 'Comment can`t be empty' })

		const newComment = new Comments({ comment })
		await newComment.save()

		try {
			await Post.findByIdAndUpdate(postId, {
				$push: { comments: newComment._id },
			})
		} catch (error) {
			console.error(error)
		}

		res.json(newComment)
	} catch (error) {
		res.json({ message: 'Something Went Wrong' })
	}
}
