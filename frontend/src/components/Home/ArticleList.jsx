import React, { Component } from 'react'
import ArticlePreview from './ArticlePreview'
import Pagination from './Pagination'
import Storage from '../../Storage'
class ArticleList extends Component {
    constructor(props){
        super(props)
        this.state = {
            articles: [],
            pageNumber: 1,
            limit: 10,
            isUpdate: false,
            articlesCount: 10
        }
        this.onChangePagination = this.onChangePagination.bind(this)
        this.onLike = (index)=> {
            let token = Storage.get()
            let {articles} = this.state
            if(token) {
                let method =  articles[index].favorited ? "DELETE" : "POST"
                let req = new XMLHttpRequest()
                req.open(method, `/api/articles/${articles[index].slug}/favorite`, true)
                req.setRequestHeader("Authorization", `Token ${token}`)
                req.onload = ()=> {
                    const {article} = JSON.parse(req.response)
                    if(article) {
                        articles[index] = article
                        this.setState({articles})
                    }
                }
                req.send()
            }
        }
    }
    loadArticles() {
        let token = Storage.get()
        let {pageNumber, limit} = this.state
        let {tag, author, favorited, feed} = this.props
        let offset = (pageNumber-1)*limit
        let url = feed ? `/api/articles/feed?limit=${limit}&offset=${offset}` :`
            /api/articles?limit=${limit}&offset=${offset}`+(tag ? `&tag=${tag}`: '')+(author ? `&author=${author}`: '')+(favorited ? `&favorited=${favorited}`: '')
        let req = new XMLHttpRequest()
        req.open('GET',url,true)
        if(token) req.setRequestHeader("Authorization", `Token ${token}`)
        req.onload = () => {
            let data = JSON.parse(req.response)
            if(data) {
                let {articles, articlesCount} = data
                this.setState({articles, articlesCount, isUpdate:false})
            } 
        }
        req.send()
    }
    componentDidMount() {
        this.loadArticles()
    }
    componentDidUpdate(preProps) {
        if(JSON.stringify(preProps)!==JSON.stringify(this.props)) this.loadArticles()
        if(!this.state.isUpdate) return 
        else this.loadArticles()
        
    }
    onChangePagination(pageNumber) {
        this.setState({pageNumber, isUpdate: true})
    }
    render() {
        let rows = []
        this.state.articles.forEach((article, index)=> {
            rows.push(<ArticlePreview key={index} article={article} index={index} onLike={this.onLike}/>)
        })
        if(rows.length === 0) rows.push(<div key={0}><br/>No articles are here... yet.</div>)
        return (
            <div>
                {rows}
                <Pagination onChangePagination={this.onChangePagination} pagesCount={Math.ceil(this.state.articlesCount/this.state.limit)}/>
            </div>
        )
    }
}
export default ArticleList