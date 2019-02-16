import React, {Component} from 'react'
class Tags extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: []
        }
    }
    componentDidMount() {
        let req = new XMLHttpRequest()
        req.open('GET', '/api/tags', true)
        req.onload = () => {
            let tags = JSON.parse(req.response).tags
            if(tags) this.setState({tags})
        }
        req.send()
    }
    render() {
        let rows = []
        this.state.tags.forEach((tag, index)=> {
            rows.push(<a href="#" key={index} className="tag-pill tag-default" onClick={()=>this.props.selectTag(tag)}>{tag}</a>)
        })
        return (
        <div className="tag-list">
            {rows}
        </div>
        )
    }
}
export default Tags

                   