import React, {Component} from 'react'
import './uploadingImage.css'

export default class Uploading extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        const {views} = this.props
        let uploading = this.props.value < 100 ? true : false
        return(
            <div className={`image ${views}`}>
                <div className="thumbnail"><img src={this.props.src} className={"uploading"}/></div>
                {/* <div className="thumbnail"><img src={this.props.src} className={uploading ? "uploading" : ""}/></div> */}
                <div className="title"><i className="fas fa-spinner"> uploading...</i></div>
                <progress value={this.props.value} max="100" className="progress-bar"/>
            </div>
        )
    }
}