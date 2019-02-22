import React from 'react'
import './uploadingImage.css'

function Uploading(props) {
    return(
        <div className={`image ${props.views.type}`}>
            <div className="thumbnail"><img src={props.src} className="uploading"/></div>
            <div className="title"><i className="fas fa-spinner"> uploading...</i></div>
            <progress value={props.value} max="150" className="progress-bar"/>
        </div>
    )
}
export default Uploading