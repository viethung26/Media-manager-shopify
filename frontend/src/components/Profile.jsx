import React, { Component } from 'react'
import ArticleList from './Home/ArticleList'
import Storage from '../Storage'
import  {Link, Redirect} from 'react-router-dom'

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: null,
            favoritedTag: false
        }
    }
    onFollow() {
        const token = Storage.get() 
        if(token) {
            let method = this.state.profile.following ? "DELETE" : "POST"
            let req = new XMLHttpRequest()
            req.open(method, `/api/profiles/${this.props.username}/follow`, true)
            req.setRequestHeader("Authorization", `Token ${token}`)
            req.onload = ()=> {
                let {profile} = JSON.parse(req.response)
                if(profile) this.setState({profile})
            }
            req.send()
        } else {
            this.setState({toLogin: true})
        }
    }
    loadUser() {
        const token = Storage.get() 
        let {username} = this.props
        let req = new XMLHttpRequest()
        req.open('GET', `/api/profiles/${username}`, true)
        if(token) req.setRequestHeader("Authorization", `Token ${token}`)
        req.onload = ()=> {
            let {profile} = JSON.parse(req.response)
            if(profile) this.setState({profile})
        }
        req.send()
    }
    componentDidMount() {
        this.loadUser()
    }
    componentDidUpdate(preprops) {
        if(preprops.username!== this.props.username) this.loadUser()
    }
    render() {
        if(this.state.toLogin) return <Redirect to="/login"/>
        if (!this.state.profile) return <div>Loading...</div>
        let {profile, favoritedTag} = this.state
        let button = (<button onClick={()=>this.onFollow()} className="btn btn-sm btn-outline-secondary action-btn">
                        <i className="ion-plus-round"></i>
                        &nbsp;
                        {profile.following ? "Unfollow": "Follow"} {profile.username} 
                    </button>)
        let {username, c_user} = this.props
        if(username && c_user && c_user.username === username) button = (<button className="btn btn-sm btn-outline-secondary action-btn">
                    <Link to='/settings' className="nav-link" ><i className="ion-gear-a"></i> Edit profile settings</Link>
                </button>)
        return (
            <div className="profile-page">
                <div className="user-info">
                    <div className="container">
                    <div className="row">

                        <div className="col-xs-12 col-md-10 offset-md-1">
                        <img src={profile.image} className="user-img" />
                        <h4>{profile.username}</h4>
                        <p>
                            {profile.bio}
                        </p>
                        {button}
                        </div>

                    </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">

                    <div className="col-xs-12 col-md-10 offset-md-1">
                        <div className="articles-toggle">
                        <ul className="nav nav-pills outline-active">
                            <li className="nav-item">
                            <Link className={"nav-link "+(favoritedTag?"":"active")} to={`/@${username}`} onClick={()=>this.setState({favoritedTag: false})}>My Articles</Link>
                            </li>
                            <li className="nav-item">
                            <Link className={"nav-link "+(favoritedTag?"active":"")} to={`/@${username}/favorite`} onClick={()=>this.setState({favoritedTag: true})}>Favorited Articles</Link>
                            </li>
                        </ul>
                        </div>
                        {favoritedTag ? <ArticleList favorited={profile.username}/> :<ArticleList author={profile.username}/>}
                        
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Profile