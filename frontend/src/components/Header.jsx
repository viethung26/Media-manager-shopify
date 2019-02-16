import React, { Component } from 'react'
import  {Link} from 'react-router-dom'
class Header extends Component {
    render() {
        let {c_user} = this.props
        if(!c_user) return (
            <nav className="navbar navbar-light">
                <div className="container">
                    <Link to="/" className="navbar-brand">BraveBits</Link>
                    <ul className="nav navbar-nav pull-xs-right">
                        <li className="nav-item"><Link to='/' className="nav-link active" >Home</Link></li>
                        <li className="nav-item"><Link to='/login' className="nav-link" >Sign in</Link></li>
                        <li className="nav-item"><Link to='/register' className="nav-link" >Sign up</Link></li>
                    </ul>
                </div>
            </nav>
        ) 
        else return (
            <nav className="navbar navbar-light">
                <div className="container">
                    <Link to="/" className="navbar-brand">BraveBits</Link>
                    <ul className="nav navbar-nav pull-xs-right">
                        <li className="nav-item"><Link to='/' className="nav-link active" >Home</Link></li>
                        <li className="nav-item"><Link to='/editor' className="nav-link" ><i className="ion-compose"></i>&nbsp;New Article</Link></li>
                        <li className="nav-item"><Link to='/settings' className="nav-link" ><i className="ion-gear-a"></i>&nbsp;Settings</Link></li>
                        <li className="nav-item"><Link to={`/@${c_user.username}`} className="nav-link" >&nbsp;<img className="user-pic" src={c_user.image}/>{c_user.username}</Link></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Header