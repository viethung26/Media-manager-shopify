import React, { Component } from 'react'
import Tags from './Home/Tags'
import ArticleList from './Home/ArticleList'
class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tag: null,
            feed: true
        }
        this.selectTag = (tag)=> {
            this.setState({feed: false, tag})
        }
    }
    componentDidMount() {
        let {tag} = this.state
        let {c_user} = this.props
    }

    render() {
        let {tag, feed} = this.state
        let {c_user} = this.props
        return (
        <div className="home-page">
            <div className="banner">
                <div className="container">
                <h1 className="logo-font">BraveBits</h1>
                <p>A place to share your knowledge.</p>
                </div>
            </div>
            <div className="container page">
                <div className="row">
                    <div className="col-md-9">
                    <div className="feed-toggle">
                    <ul className="nav nav-pills outline-active">
                    {c_user? 
                        <li className="nav-item">
                        <a className={"nav-link "+ (feed?"active":"")} href="#" onClick={()=>this.setState({feed: true, tag:null})}>Your Feed</a>
                        </li>
                    : null}
                        <li className="nav-item">
                        <a className={"nav-link "+(tag||(c_user&&feed)?"":"active")} href="#" onClick={()=>this.setState({feed: false, tag: null})}>Global Feed</a>
                        </li>
                    {tag? <li className="nav-item">
                        <a className="nav-link active" href="#">#{tag}</a>
                        </li>: null}
                    </ul>
                    <ArticleList tag={tag} feed={c_user?feed:false}/>
                    </div>
                </div>
                    
                    <div className="col-md-3">
                    <div className="sidebar">
                    <p>Popular Tags</p>
                    <Tags selectTag={this.selectTag}/>
                    </div>
                </div>

                </div>
            </div>
        </div>
        )
    }
}

export default HomePage