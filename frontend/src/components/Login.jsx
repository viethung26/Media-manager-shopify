import React, { Component } from 'react'
import  {Link, Redirect} from 'react-router-dom'
import Storage from '../Storage'
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            errors: null,
            isLogin: false
        }
        this.onSubmit = e =>  {
            e.preventDefault()
            let data = new FormData(e.target)
            let email = data.get('email')
            let password = data.get('password')
            if(email && password) {
                let user = {email, password}
                let req = new XMLHttpRequest()
                req.open('POST', '/api/users/login', true)
                req.setRequestHeader("Content-Type", "application/json")
                req.onload = ()=> {
                    let {errors, user} = JSON.parse(req.response)
                    if(errors) {
                        this.setState({errors})
                    }else if(user) {
                        Storage.set(user.token)
                        this.props.onLogin(user)
                        this.setState({isLogin: true}) 
                    }
                }
                req.send(JSON.stringify({user}))
            }
        }
    }
    render() {
        if(this.state.isLogin) return <Redirect to="/"/>
        const {errors} = this.state
        let errorRows = []
        for(let key in errors) {
            errorRows.push(<li key={key}>{key} {errors[key]}</li>)
        }
        return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                <div className="col-md-6 offset-md-3 col-xs-12">
                    <h1 className="text-xs-center">Sign in</h1>
                    <p className="text-xs-center">
                    <Link to="/register">Need an account?</Link>
                    </p>
                    <ul className="error-messages">
                    {errorRows}
                    </ul>

                    <form onSubmit={this.onSubmit}>
                    <fieldset className="form-group">
                        <input className="form-control form-control-lg" name="email" type="text" placeholder="Email"/>
                    </fieldset>
                    <fieldset className="form-group">
                        <input className="form-control form-control-lg" name="password" type="password" autoComplete="false" placeholder="Password"/>
                    </fieldset>
                    <button className="btn btn-lg btn-primary pull-xs-right">
                        Sign in
                    </button>
                    </form>
                </div>

                </div>
            </div>
        </div>
        )
    }
}

export default Login
            