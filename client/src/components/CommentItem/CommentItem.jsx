import React from 'react'

const CommentItem = props => {
	return (
		<div>
			<p>{props.comment.comment}</p>
		</div>
	)
}

CommentItem.propTypes = {}

export default CommentItem
