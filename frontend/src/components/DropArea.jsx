import React, {Component} from 'react'
import Image from './Image'
import Uploading from './UploadingImage'

class DropArea extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isDragEnter: false
		}
		this.handleDrop = this.handleDrop.bind(this)
	}
	handleDrop(e) {
		e.preventDefault()
		this.setState({isDragEnter: false})
		this.props.onDrop(e)
	}
	renderImage() {
		const rows = []
		const {assets, views} = this.props
		if(assets) assets.forEach((image)=> {
			if(image.key.substr(7).indexOf(views.search) !== -1)
				rows.push(
				<Image 
					key={image.key} 
					views={views} 
					image={image} 
					delete={this.props.delete} 
					select={this.props.select}
				/>)
		})
		return rows
	}
	renderUploading() {
		const rows = []
		const {uploads, views} = this.props
		if(uploads) uploads.forEach((image)=> {
				rows.push(
				<Uploading 
					key= {image.name} 
					views={views} 
					src={image.src} 
					title={image.name} 
					value={image.percentage}
				/>)
		})
		return rows
	}

	render() {
		const {assets} = this.props
		const {isDragEnter} = this.state
		return(
			<div id="drop-area"
				className={isDragEnter ? "block-event green-bg" : ""} 
				onDragOver={e=>e.preventDefault()} 
				onDrop={this.handleDrop} 
				onDragLeave={e=>this.setState({isDragEnter: false})} 
				onDragEnter={e=>this.setState({isDragEnter: true})}
			>
				{isDragEnter ? <div className="drag-over p-8">Drop files to upload</div> : null }
				{assets.length!==0 ? null : 
					<label id="upload" className="center" htmlFor="fileElement">
						<i className="fas fa-upload"></i><br/>Drag and Drop or click here to upload
					</label>
				}
				{this.renderImage()}
				{this.renderUploading()}
			</div>
		)}
}

export default DropArea