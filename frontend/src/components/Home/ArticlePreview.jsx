import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class ArticlePreview extends Component {
    render() {
        const {article} = this.props
        if(!article) return (<div>Loading</div> )
        else return (
            <div className="article-preview">
                <div className="article-meta">
                    <Link to={`/@${article.author.username}`}><img src={article.author.image} /></Link>
                    <div className="info">
                    <Link to={`/@${article.author.username}`} className="author">{article.author.username}</Link>
                    <span className="date">{new Date(article.createdAt).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <button className={"btn btn-sm pull-xs-right "+(article.favorited ? "btn-primary" :  "btn-outline-primary")} onClick={()=>this.props.onLike(this.props.index)}>
                    <i className="ion-heart"></i> {article.favoritesCount}
                    </button>
                </div>
                <Link to={`/article/${article.slug}`} className="preview-link">
                        <h1>{article.title}</h1>
                        <p>{article.description}</p>
                        <span>Read more...</span>
                    </Link>
            </div>
        )
    }
}
export default ArticlePreview