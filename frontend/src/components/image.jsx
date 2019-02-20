import React, {Component} from 'react'
import './image.css'

class Image extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {image, views} = this.props
        let title = image.key.substr(7)
        return (
            <div className={`image ${views}`} onClick={()=>this.props.select(image.key)}>
                {image.isSelected?<i className="fas fa-check-square selected"></i>:null}
                <div className="thumbnail"><img src={image.public_url}/></div>
                
                <i className="fas fa-trash-alt delete" onClick={()=>this.props.delete(title)}></i>
                <div className="title">{image.isNew ? <i className="fas fa-check"> {title}</i> : title}</div>
                <div className="size">File size: {image.size} KB</div>
            </div>
        )

    }
    
}

export default Image