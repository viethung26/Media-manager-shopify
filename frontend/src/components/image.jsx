import React from 'react'
import './image.css'

function Image(props) {
    const {image, views} = props
    let name = image.key.substr(7)
    const isDeleting = image.isDeleting ? "deleting" : ""
    return (
        <div className={`image ${views.type} ${isDeleting}`} onClick={()=>props.select(image.key)} title={name}>
            {image.isSelected?<i className="fas fa-check-square selected"></i>:null}
            <div className="thumbnail">
                <img src={image.public_url}/>
                <i className="fas fa-sync-alt fa-spin deleting-spiner"/>
            </div>
            <i className="fas fa-trash-alt delete" onClick={(e)=>{e.stopPropagation(); props.delete(image.key)}}></i>
            <div className="title">{image.isNew ? <span><i className="fas fa-check"/> {name}</span> : name}</div>
            <div className="size">File size: {image.size} KB</div>
        </div>
    ) 
}

export default Image