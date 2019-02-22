import React, {Component} from 'react'
import './app.css'
import DropArea from './components/DropArea'
import ViewOptions from './components/ViewOptions'
const TEST_DATA = '[{"key":"assets/27434.jpg","public_url":"https://cdn.shopify.com/s/files/1/0171/4431/5968/t/3/assets/27434.jpg?13180284403782496566","created_at":"2019-02-15T03:23:41-05:00","updated_at":"2019-02-15T03:23:41-05:00","content_type":"image/jpeg","size":311069,"theme_id":70634537024},{"key":"assets/collection-view-grid.svg","public_url":"https://cdn.shopify.com/s/files/1/0171/4431/5968/t/3/assets/collection-view-grid.svg?13180284403782496566","created_at":"2019-02-14T08:57:39-05:00","updated_at":"2019-02-14T08:57:39-05:00","content_type":"image/svg+xml","size":906,"theme_id":70634537024},{"key":"assets/collection-view-list.svg","public_url":"https://cdn.shopify.com/s/files/1/0171/4431/5968/t/3/assets/collection-view-list.svg?13180284403782496566","created_at":"2019-02-14T08:57:39-05:00","updated_at":"2019-02-14T08:57:39-05:00","content_type":"image/svg+xml","size":1166,"theme_id":70634537024},{"key":"assets/example.jpg","public_url":"https://cdn.shopify.com/s/files/1/0171/4431/5968/t/3/assets/example.jpg?13180284403782496566","created_at":"2019-02-15T22:43:56-05:00","updated_at":"2019-02-15T22:43:56-05:00","content_type":"image/jpeg","size":80206,"theme_id":70634537024},{"key":"assets/ico-select.svg","public_url":"https://cdn.shopify.com/s/files/1/0171/4431/5968/t/3/assets/ico-select.svg?13180284403782496566","created_at":"2019-02-14T08:57:44-05:00","updated_at":"2019-02-14T08:57:44-05:00","content_type":"image/svg+xml","size":613,"theme_id":70634537024},{"key":"assets/icons.svg","public_url":"https://cdn.shopify.com/s/files/1/0171/4431/5968/t/3/assets/icons.svg?13180284403782496566","created_at":"2019-02-14T08:57:39-05:00","updated_at":"2019-02-14T08:57:39-05:00","content_type":"image/svg+xml","size":14669,"theme_id":70634537024},{"key":"assets/password-page-background.jpg","public_url":"https://cdn.shopify.com/s/files/1/0171/4431/5968/t/3/assets/password-page-background.jpg?13180284403782496566","created_at":"2019-02-14T08:57:40-05:00","updated_at":"2019-02-14T08:57:40-05:00","content_type":"image/jpeg","size":76069,"theme_id":70634537024}]'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            assets: [],
            uploads: [],
            views: {
				type: 'grid',
				sort: 'newest',
				search: ''
			}
        }
        this.handleFile = this.handleFile.bind(this) 
        this.handleProgress = this.handleProgress.bind(this)
        this.handleDrop = this.handleDrop.bind(this) 
        this.handleSelect = this.handleSelect.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.handleViews = this.handleViews.bind(this)
		this.handleSort = this.handleSort.bind(this)
		this.handleDeleteSelect = this.handleDeleteSelect.bind(this)
    }
    componentDidMount() {
        const shop = localStorage.getItem('shop')
        if(shop) {
            const regex = /^image\/(?!svg).*$/
            fetch('/images', {
                method: 'GET',
                headers: {shop},
            }).then(response=> response.json()).then(data=> {
                data = data.assets.filter(val=> regex.test(val.content_type))
                this.setState({assets: data})
            })
        }   
    }
    previewFile(file) {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            let img = {name: file.name, percentage: 0, isSelected: false}
            img.src = reader.result
            const {uploads} = this.state
            uploads.push(img)
            this.setState({uploads})
        }
    }
    handleProgress(name, percentage) {
        const {uploads} = this.state
        const index = uploads.findIndex(file=> file.name === name)
        if(index!==-1) uploads[index].percentage = percentage
        this.setState({uploads})
    }
    handleFile(e) {
        let fileList = e.target.files
        for(let i=0;i <fileList.length; i++) {
            this.uploadFile(fileList[i])
        }
    }
    handleDrop(e) {
        e.preventDefault()
        const data = e.dataTransfer
        const files = [...data.files]
        files.forEach(file=>this.uploadFile(file))
    }
    uploadFile(file) {
        this.previewFile(file)
        const shop = localStorage.getItem('shop')
        let url = '/images'
        let formData = new FormData()
        formData.append('file', file)
        const xhr = new XMLHttpRequest()
        xhr.open('POST', url, true)
        xhr.setRequestHeader('shop', shop)
        xhr.upload.addEventListener("progress", e => {
            if(e.lengthComputable) {
                const percentage = Math.round((e.loaded*100)/e.total)
                this.handleProgress(file.name, percentage)
            }
        })
        xhr.onload = ()=> {
            if(xhr.response) {
                let newImage = JSON.parse(xhr.response)
                newImage.isNew = true
                const {assets, uploads} = this.state
                const index = uploads.findIndex(upload=>upload.name === file.name)
                if(index !==-1) uploads.splice(index, 1)
                assets.push(newImage)
                this.setState({assets, uploads})
            }
        }
        xhr.onerror = () => {
            console.error(xhr.statusText)
        }
        xhr.send(formData)
        
    }
    handleSelect(key) {
        const {assets} = this.state
        const index = assets.findIndex(file=> file.key === key)
        assets[index].isSelected = ! assets[index].isSelected 
        this.setState({assets})
    }
    handleDelete(key) {
        let {assets} = this.state
        let index = assets.findIndex(file=>file.key ===key)
        if(index!==-1) {
            assets[index].isDeleting = true
            this.setState({assets})
            const shop = localStorage.getItem('shop')
            let url = `/images?key=${key}`
            fetch(url, {
                method: 'DELETE',
                headers: {shop}
            }).then(res=>res.json()).then(res=>{
                if(res) {
                    assets = this.state.assets
                    index = assets.findIndex(file=>file.key ===key)
                    if(index!==-1) assets.splice(index, 1)
                    this.setState({assets})
                }
            }).catch(e=>console.log(e))
        }
    }
    handleDeleteSelect() {
		const {assets} = this.state
		assets.forEach(asset=> {
			if(asset.isSelected) {
                this.handleDelete(asset.key)
            }
        })
	}
	handleViews(views) {
		this.setState({views})
	}
    handleSort(value) {
        const {assets, views} = this.state
        assets.sort((a,b)=> {
            let dateA = new Date(a.updated_at).getTime()
            let dateB = new Date(b.updated_at).getTime()
            return value === 'oldest' ? dateA - dateB : dateB - dateA
				})            
				views.sort = value
        this.setState({views, assets})
    }
    render() {
		const {assets, views, uploads} = this.state
		const selectCount = assets.reduce((count, asset)=> {
			if(asset.isSelected) count++
			return count
		}, 0)
        return (
			<div id='popup'>
				<h3>Select Image <span id="close">&times;</span></h3>
				<div className="header">
					<span className="title secondary-color p-8">My Images </span>
					<span><label id="upload2" className="button" htmlFor="fileElement">Upload</label></span>		
				</div>
				<div>
					<ViewOptions 
						views={views}
						onSort={this.handleSort}
						onChange={this.handleViews}
						onDeleteSelect={this.handleDeleteSelect}
						isSelecting={selectCount>0 ? true : false}
					/>
					<form>
						<input type="file" id="fileElement" accept="image/*" multiple onChange={this.handleFile}/>
					</form>
					<DropArea 
						assets={assets}
						uploads={uploads} 
						views={views} 
						delete={this.handleDelete} 
						select={this.handleSelect}
						onDrop={this.handleDrop}
					/>
					<div className="footer secondary-color p-8">
						<div className="right">
							<button disabled={selectCount!==1?true:false}>Select</button>&nbsp;
							<button>Cancel</button>
						</div>
					</div>
				</div>    
			</div>
        )
    }
}

export default App