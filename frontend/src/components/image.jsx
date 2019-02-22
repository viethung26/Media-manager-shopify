import React from 'react'
import './image.css'

function Image(props) {
    const {image, views} = props
    let name = image.key.substr(7)
    return (
        <div className={`image ${views.type}`} onClick={()=>props.select(image.key)}>
            {image.isSelected?<i className="fas fa-check-square selected"></i>:null}
            <div className="thumbnail"><img src={image.public_url}/></div>
            <i className="fas fa-trash-alt delete" onClick={()=>props.delete(image.key)}></i>
            <div className="title">{image.isNew ? <i className="fas fa-check"> {name}</i> : name}</div>
            <div className="size">File size: {image.size} KB</div>
        </div>
    ) 
}

export default Image