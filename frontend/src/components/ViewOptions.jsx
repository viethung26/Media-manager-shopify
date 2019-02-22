import React, {Component} from 'react'
import './viewOptions.css'
class ViewOptions extends Component {
    constructor(props) {
        super(props)
        this.handleSearchChange = this.handleSearchChange.bind(this)
    }
    handleSearchChange(e) {
        const {views} = this.props
        views.search = e.target.value
        this.props.onChange(views)
    }
    handleTypeChange(type) {
        const {views} = this.props
        views.type = type 
        this.props.onChange(views)
    }
    render() {
        const {views, isSelecting} = this.props
        return (
            <div className="view-options secondary-color p-8">
                <div className="search-bar">
                    <i className="fas fa-search"/>
                    <input className="m-4" type="text" placeholder="Search..." value={views.search} onChange={this.handleSearchChange}/>
                </div>
                <div>{isSelecting ? <button className="m-4 delete-files" onClick={()=>this.props.onDeleteSelect()}>Delete</button>: null}</div>
                <div>
                    <label>Sorting </label>
                    <select name="sorting" value={views.sort} onChange={e=> this.props.onSort(e.target.value)}>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>
                <div>
                    <label>View options </label>
                    <i className="fas fa-th-large" onClick={()=>this.handleTypeChange('grid')}></i>&nbsp;
                    <i className="fas fa-th-list" onClick={()=>this.handleTypeChange('list')}></i>
                </div>                    
            </div>
        )
    }
}

export default ViewOptions