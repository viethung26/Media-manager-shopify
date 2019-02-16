import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Header from './components/Header'
import HomePage from './components/HomePage'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import Article from './components/Article'
import Settings from './components/Settings'
import Editor from './components/Editor'
import Storage from './Storage'
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            c_user: null,
            isUpdated: false,
            isLoaded: false
        }
        this.onLoad = (c_user) => {
            this.setState({c_user, isUpdated: true})
        }
        
    }
    componentDidMount() {
        const token = Storage.get()
        if(token) {
            let req = new XMLHttpRequest()
            req.open('GET', " /api/user", true)
            req.setRequestHeader("Authorization", `Token ${token}`)
            req.onload = () => {
                let {user} = JSON.parse(req.response)
                if(user) this.setState({c_user: user, isLoaded: true})
            }
            req.send()
        } else this.setState({isLoaded: true})
    }
    componentDidUpdate(preprops) {
        if(this.state.isUpdated) this.setState({isUpdated: false})
    }
    render() {
        if(this.state.isUpdated) return <Router><Redirect to="/"/></Router> 
        return (
            <Router>
                <div>
                    <Header c_user={this.state.c_user}/>
                    <Switch>
                        <Route path='/' exact render={()=>(<HomePage c_user={this.state.c_user}/>)}/>
                        <Route path='/login' render={()=>(<Login onLogin={this.onLoad}/>)}/>
                        <Route path='/register' render={()=>(<Register onLogin={this.onLoad}/>)}/>
                        <Route path='/settings' render={()=>(<Settings c_user={this.state.c_user} onUpdate={this.onLoad} isLoaded={this.state.isLoaded}/>)}/>
                        <Route path='/editor/:slug' render={({match})=>(<Editor slug={match.params.slug}/>)}/>
                        <Route path='/editor' render={()=>(<Editor />)}/>
                        <Route path='/article/:slug' render={({match})=>(<Article slug={match.params.slug} c_user={this.state.c_user}/>)}/>
                        <Route path='/@:username' render={({match})=>(<Profile username={match.params.username} c_user={this.state.c_user}/>)}/>
                    </Switch>
                    
                </div>
                
            </Router>
        )
    }
}

export default App