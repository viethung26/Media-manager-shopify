import React, { Component } from 'react'

class CommentsList extends Component {
    loadComments() {
        let rows = []
        const {comments} = this.props
        if(comments) comments.forEach((comment, index)=> rows.push(
            <div className="card" key={index}>
                <div className="card-block">
                    <p className="card-text">{comment.body}</p>
                </div>
                <div className="card-footer">
                    <a href="" className="comment-author">
                    <img src={comment.author.image} className="comment-author-img" />
                    </a>
                    &nbsp;
                    <a href="" className="comment-author">{comment.author.username}</a>
                    <span className="date-posted">{new Date(comment.createdAt).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric'})}</span>
                    {this.props.username === comment.author.username ?
                    <span className="mod-options" onClick={()=>this.props.onDelete(comment.id)}>
                        <i className="ion-trash-a"></i>
                    </span>: null }
                    
                </div>
            </div>
        ) )
        return rows
    }
    render() {
        return (
            <div>
                {this.loadComments()}
            </div>
            
        )
    }
}
export default CommentsList






                    