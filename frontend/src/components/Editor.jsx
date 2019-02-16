import React, { Component } from 'react'
import Storage from '../Storage'
import {Redirect} from 'react-router-dom'

class Editor extends Component {
    constructor(props){
        super(props)
        this.state = {
            isEditing: false,
            title: "",
            description: "",
            body: "",
            tagList: "",
            slug: ""
        }
        this.onSubmit = e => {
            e.preventDefault()
            const token = Storage.get()
            let {title, description, body, tagList, isEditing, slug} = this.state
            tagList = tagList.trim()=== "" ? [] : tagList.trim().split(" ")
            let article = {title, description, body, tagList}
            let req = new XMLHttpRequest()
            let method = isEditing ? "PUT" : "POST"
            let url = `/api/articles/`+(slug?slug:"")
            req.open(method, url , true)
            req.setRequestHeader("Content-Type", "application/json")
            req.setRequestHeader("Authorization", `Token ${token}`)
            req.onload = ()=> {
                let {article} = JSON.parse(req.response)
                if(article) this.setState({newSlug: article.slug})
            }
            req.send(JSON.stringify({article}))
        }
    }
    loadArticle() {
        let {slug} = this.props
        if(slug) {
            let req = new XMLHttpRequest()
            req.open("GET", `/api/articles/${slug}`)
            req.onload = ()=> {
                const {article} = JSON.parse(req.response)
                if(article) {
                    let {title, description, body, tagList, slug} = article
                    console.log(tagList)
                    tagList = tagList.join(" ")
                    console.log(tagList)
                    this.setState({title, description, body, tagList, slug, isEditing: true})
                } 
            }
            req.send()
        }
        
    }
    componentDidMount() {
        this.loadArticle()
    }
    render() {
        if(this.state.newSlug) return <Redirect to={`/article/${this.state.newSlug}`}/>
        return (
            <div className="editor-page">
                <div className="container page">
                    <div className="row">

                    <div className="col-md-10 offset-md-1 col-xs-12">
                        <form onSubmit={this.onSubmit}>
                        <fieldset>
                            <fieldset className="form-group">
                                <input name="title" type="text" className="form-control form-control-lg" placeholder="Article Title" value={this.state.title} onChange={(e)=>this.setState({title: e.target.value})} required/>
                            </fieldset>
                            <fieldset className="form-group">
                                <input name="description" type="text" className="form-control" placeholder="What's this article about?" value={this.state.description} onChange={(e)=>this.setState({description: e.target.value})} required/>
                            </fieldset>
                            <fieldset className="form-group">
                                <textarea name='body' className="form-control" rows="8" placeholder="Write your article (in markdown)" value={this.state.body} onChange={(e)=>this.setState({body: e.target.value})} required></textarea>
                            </fieldset>
                            <fieldset className="form-group">
                                <input name="tags" type="text" className="form-control" placeholder="Enter tags" value={this.state.tagList||''} onChange={(e)=>this.setState({tagList: e.target.value})}/><div className="tag-list"></div>
                            </fieldset>
                            <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
                                Publish Article
                            </button>
                        </fieldset>
                        </form>
                    </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default Editor

            




// import React, { Component } from 'react'

// class HomePage extends Component {
//     render() {
//         return (
//         )
//     }
// }
// export default HomePage