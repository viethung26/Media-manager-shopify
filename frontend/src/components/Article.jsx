import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Storage from '../Storage'
import CommentsList from './Article/CommentsList'

class Article extends Component {
    constructor(props){
        super(props)
        this.state = {
            article: null,
            comments: null,
            comment: ""
        }
        this.onDelete = ()=> {
            const {slug} = this.state.article
            const token = Storage.get()
            if(slug && token) {
                let req = new XMLHttpRequest()
                req.open("DELETE", `/api/articles/${slug}`, true)
                req.setRequestHeader("Authorization", `Token ${token}`)
                req.onload = ()=> {
                    this.setState({isDeleted: true})
                }
                req.send()
            }

        }
        this.onSubmit = event=> {
            event.preventDefault()
            const body = this.state.comment
            const comment = {body}
            const token = Storage.get()
            const {slug} = this.state.article
            if(token) {
                let req = new XMLHttpRequest()
                req.open("POST", `/api/articles/${slug}/comments`, true)
                req.setRequestHeader("Authorization", `Token ${token}`)
                req.setRequestHeader("Content-Type", "application/json")
                req.onload = ()=> {
                    const {comment} = JSON.parse(req.response)
                    if(comment){
                        let {comments} = this.state
                        comments.splice(0,0,comment)
                        this.setState({comments, comment: ""})
                    } 
                }
                req.send(JSON.stringify({comment}))
            }
        }
        this.onDeleteComment = id => {
            const token = Storage.get()
            const {slug} = this.state.article
            if(token) {
                let req = new XMLHttpRequest()
                req.open("DELETE", `/api/articles/${slug}/comments/${id}`)
                req.setRequestHeader("Authorization", `Token ${token}`)
                req.onload = () => {
                    this.loadComments()
                }
                req.send()            
            }
        }
    }
    onFollow() {
        const token = Storage.get() 
        const {article} = this.state
        const {author} = article
        const {following} = author
        if(token) {
            let method =following ? "DELETE" : "POST"
            let req = new XMLHttpRequest()
            req.open(method, `/api/profiles/${author.username}/follow`, true)
            req.setRequestHeader("Authorization", `Token ${token}`)
            req.onload = ()=> {
                this.loadArticle()
            }
            req.send()
        } else {
            this.setState({toLogin: true})
        }
    }
    onFavorite() {
        const token = Storage.get() 
        const {article} = this.state
        const { favorited, slug} = article
        if(token) {
            let method = favorited ? "DELETE" : "POST"
            let req = new XMLHttpRequest()
            req.open(method, `/api/articles/${slug}/favorite`, true)
            req.setRequestHeader("Authorization", `Token ${token}`)
            req.onload = ()=> {
                this.loadArticle()
            }
            req.send()
        } else {
            this.setState({toLogin: true})
        }
    }
    loadArticle() {
        const {slug}= this.props
        const token = Storage.get()
        let req = new XMLHttpRequest()
        req.open('GET', `/api/articles/${slug}`, true)
        if(token) req.setRequestHeader("Authorization", `Token ${token}`)
        req.onload = ()=> {
            let {article} = JSON.parse(req.response)
            if(article) this.setState({article})
        }
        req.send()
    }
    loadComments() {
        let {slug} = this.props
        let req = new XMLHttpRequest()
        req.open("GET", `/api/articles/${slug}/comments`, true)
        req.onload = () => {
            const {comments} = JSON.parse(req.response)
            if(comments) this.setState({comments})
        }
        req.send()
    }
    componentDidMount() {
        this.loadArticle()
        this.loadComments()
    }
    loadFooter() {
        const {c_user} = this.props
        if(c_user) {
            return( <form className="card comment-form" onSubmit={this.onSubmit}>
                        <div className="card-block">
                            <textarea className="form-control" placeholder="Write a comment..." rows="3" value={this.state.comment} onChange={(e)=>this.setState({comment: e.target.value})}></textarea>
                        </div>
                        <div className="card-footer">
                            <img src={c_user.image} className="comment-author-img" />
                            <button className="btn btn-sm btn-primary">
                            Post Comment
                            </button>
                        </div>
                        </form>)

        } else return <div><Link to="/login">Sign in</Link> or <Link to="/login">Sign Up</Link> to add comments on this article.</div>
    }
    loadFollowButton() {
        let {c_user} = this.props
        let {article} = this.state
        let {author, favorited} = article
        let {following} = author
        if(c_user && c_user.username === author.username) return ( <span>
            <button className="btn btn-sm btn-outline-secondary">
                <Link to={`/editor/${article.slug}`}><i className="ion-edit"></i>&nbsp;Edit Article</Link>
            </button>
                &nbsp;&nbsp;
                <button className="btn btn-sm btn-outline-danger" onClick={()=>this.onDelete()}>
                <i className="ion-trash-a"></i>
                &nbsp;
                Delete Article
            </button>
        </span>
            )
        else return ( <span>
            <button className="btn btn-sm btn-outline-secondary" onClick={()=>this.onFollow()}>
                <i className="ion-plus-round"></i>
                &nbsp;
                {following?"Unfollow":"Follow"} {author.username}
            </button>
                &nbsp;&nbsp;
            <button className="btn btn-sm btn-outline-primary" onClick={()=>this.onFavorite()}>
                <i className="ion-heart"></i>
                &nbsp;
                {favorited? "Unfavorite" : "Favorite"} Article <span className="counter">({article.favoritesCount})</span>
            </button>
        </span>
            )
    }
    loadTagsList() {
        const {tagList} = this.state.article
        let rows = []
        tagList.forEach((tag, index)=> {
            rows.push(<li key={index} className="tag-default tag-pill tag-outline">{tag}</li> )
        })
        return rows
    }
    render() {
        if(this.state.toLogin) return <Redirect to="/login"/>
        if(this.state.isDeleted) return <Redirect to="/"/>
        const {article} = this.state
        const {c_user} = this.props
        if(!article) return (<div>Loading...</div>)
        else {
            const {author} = article
            
            
            return (
            <div className="article-page">

                <div className="banner">
                    <div className="container">

                    <h1>{article.title}</h1>

                    <div className="article-meta">
                        <a href=""><img src={author.image} /></a>
                        <div className="info">
                        <a href="" className="author">{author.username}</a>
                        <span className="date">{new Date(article.createdAt).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        {this.loadFollowButton()}
                    </div>

                    </div>
                </div>

                <div className="container page">

                    <div className="row article-content">
                    <div className="col-md-12">
                        <p>
                        {article.body}
                        </p>
                    </div>
                    </div>
                    <ul className="tag-list">
                        {this.loadTagsList()}
                    </ul>

                    <hr />

                    <div className="article-actions">
                    <div className="article-meta">
                        <a href="profile.html"><img src={author.image} /></a>
                        <div className="info">
                        <a href="" className="author">{author.username}</a>
                        <span className="date">{new Date(article.updatedAt).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric'})}</span>
                        </div>

                        {this.loadFollowButton()}
                    </div>
                    </div>

                    <div className="row">

                    <div className="col-xs-12 col-md-8 offset-md-2">
                        {this.loadFooter()}
                        <br/>
                        <CommentsList comments={this.state.comments} username={c_user?c_user.username:null} onDelete={this.onDeleteComment}/>
                    </div>

                    </div>

                </div>

            </div>
            )
        }
    }
}
export default Article            
            