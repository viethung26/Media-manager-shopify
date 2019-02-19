import React, {Component} from 'react'
import './uploadingImage.css'

export default class Uploading extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        let uploading = this.props.value < 100 ? true : false
        return(
            <div className="upload-image">
                <img src={this.props.src} className={uploading ? "uploading" : ""}/>
                {uploading ? <progress value={this.props.value} max="100" className="progress-bar"/> : ""}
                <p>{uploading ?<i className="fas fa-spinner"> uploading...</i>: <i className="fas fa-check"> {this.props.title}</i> }</p>
            </div>
        )
    }
}