import React, {Component} from 'react'
import './image.css'

class Image extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="image">
                {this.props.isSelected?<i className="fas fa-check-square selected"></i>:null}
                <img src={this.props.src} onClick={()=>this.props.select(this.props.title)}/>
                <i className="fas fa-trash-alt delete" onClick={()=>this.props.delete(this.props.title)}></i>
                <p>{this.props.title}</p>
            </div>
        )

    }
    
}

export default Image