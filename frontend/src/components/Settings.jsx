import React, { Component } from 'react'
import Storage from '../Storage'
import {Redirect} from 'react-router-dom'

class Settings extends Component {
    constructor(props){
        super(props)
        this.state = {
            image: props.c_user? props.c_user.image :"",
            username: props.c_user? props.c_user.username: "",
            bio: props.c_user ? props.c_user.bio: "",
            email: props.c_user? props.c_user.email: "",
            password: ""
        }
        this.onSubmit = (e)=> {
            e.preventDefault()
            let {image, username, bio, email, password} = this.state
            let user = {image, username, bio, email}
            if(password) user.password = password          
            const token = Storage.get()
            if(token) {
                let req = new XMLHttpRequest()
                req.open("PUT", "/api/user", true)
                req.setRequestHeader("Authorization", `Token ${token}`)
                req.setRequestHeader("Content-Type", "application/json")
                req.onload = ()=> {
                    const {user} = JSON.parse(req.response)
                    Storage.set(user.token)
                    props.onUpdate(user)
                }
                req.send(JSON.stringify({user}))
            }
        }
        this.onLogOut = ()=> {
            Storage.remove()
            props.onUpdate(null)
        }
    }
    componentDidMount() {
    }
    componentDidUpdate(preprops) {
        if(JSON.stringify(preprops) !== JSON.stringify(this.props)) {
            let {image, username, bio, email} = this.props.c_user
            this.setState({image, username, bio, email})
        } 
    }

    render() {
        if(!this.props.c_user && this.props.isLoaded) return <Redirect to="/"/>
        const {username, image, bio, email, password} = this.state
        return (
        <div className="settings-page">
            <div className="container page">
                <div className="row">

                <div className="col-md-6 offset-md-3 col-xs-12">
                    <h1 className="text-xs-center">Your Settings</h1>

                    <form onSubmit={(event)=>this.onSubmit(event)}>
                    <fieldset>
                        <fieldset className="form-group">
                            <input className="form-control" type="text" placeholder="URL of profile picture" value={image?image:""} onChange={e=>this.setState({image: e.target.value})}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input className="form-control form-control-lg" type="text" placeholder="Your Name" value={username?username:""} onChange={e=>this.setState({username: e.target.value})}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <textarea className="form-control form-control-lg" rows="8" placeholder="Short bio about you" value={bio?bio:""} onChange={e=>this.setState({bio: e.target.value})} ></textarea>
                        </fieldset>
                        <fieldset className="form-group">
                            <input className="form-control form-control-lg" type="text" placeholder="Email" value={email?email:""} onChange={e=>this.setState({email: e.target.value})}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input className="form-control form-control-lg" type="password" placeholder="Password" autoComplete="false" value={password?password:""} onChange={e=>this.setState({password: e.target.value})}/>
                        </fieldset>
                        <button className="btn btn-lg btn-primary pull-xs-right">
                            Update Settings
                        </button>
                    </fieldset>
                    </form>
                    <hr/>
                    <button className="btn btn-outline-danger" onClick={()=>this.onLogOut()}>Or click here to logout.</button>
                </div>

                </div>
            </div>
        </div>
        )
    }
}
export default Settings

