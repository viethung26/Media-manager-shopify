import React, {Component} from 'react'
import './app.css'
import Image from './components/image'
import Uploading from './components/uploadingImage'

const TEST_DATA = '[{"key":"assets/27434.jpg","public_url":"https://cdn.shopify.com/s/files/1/0171/4431/5968/t/3/assets/27434.jpg?13180284403782496566","created_at":"2019-02-15T03:23:41-05:00","updated_at":"2019-02-15T03:23:41-05:00","content_type":"image/jpeg","size":311069,"theme_id":70634537024},{"key":"assets/collection-view-grid.svg","public_url":"https://cdn.shopify.com/s/files/1/0171/4431/5968/t/3/assets/collection-view-grid.svg?13180284403782496566","created_at":"2019-02-14T08:57:39-05:00","updated_at":"2019-02-14T08:57:39-05:00","content_type":"image/svg+xml","size":906,"theme_id":70634537024},{"key":"assets/collection-view-list.svg","public_url":"https://cdn.shopify.com/s/files/1/0171/4431/5968/t/3/assets/collection-view-list.svg?13180284403782496566","created_at":"2019-02-14T08:57:39-05:00","updated_at":"2019-02-14T08:57:39-05:00","content_type":"image/svg+xml","size":1166,"theme_id":70634537024},{"key":"assets/example.jpg","public_url":"https://cdn.shopify.com/s/files/1/0171/4431/5968/t/3/assets/example.jpg?13180284403782496566","created_at":"2019-02-15T22:43:56-05:00","updated_at":"2019-02-15T22:43:56-05:00","content_type":"image/jpeg","size":80206,"theme_id":70634537024},{"key":"assets/ico-select.svg","public_url":"https://cdn.shopify.com/s/files/1/0171/4431/5968/t/3/assets/ico-select.svg?13180284403782496566","created_at":"2019-02-14T08:57:44-05:00","updated_at":"2019-02-14T08:57:44-05:00","content_type":"image/svg+xml","size":613,"theme_id":70634537024},{"key":"assets/icons.svg","public_url":"https://cdn.shopify.com/s/files/1/0171/4431/5968/t/3/assets/icons.svg?13180284403782496566","created_at":"2019-02-14T08:57:39-05:00","updated_at":"2019-02-14T08:57:39-05:00","content_type":"image/svg+xml","size":14669,"theme_id":70634537024},{"key":"assets/password-page-background.jpg","public_url":"https://cdn.shopify.com/s/files/1/0171/4431/5968/t/3/assets/password-page-background.jpg?13180284403782496566","created_at":"2019-02-14T08:57:40-05:00","updated_at":"2019-02-14T08:57:40-05:00","content_type":"image/jpeg","size":76069,"theme_id":70634537024}]'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            assets: null,
            selects: [],
            uploads: [],
            views: 'grid',
            sort: 'newest',
            search: ''
        } 
        this.previewFile = file => {
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
        this.handleProgress = (name, percentage) => {
            console.log(name)
            const {uploads} = this.state
            const index = uploads.findIndex(file=> file.name === name)
            uploads[index].percentage = percentage
            this.setState({uploads})
        }
        this.handleFile = e => {
            let fileList = e.target.files
            for(let i=0;i <fileList.length; i++) {
                this.uploadFile(fileList[i])
            }
        }
        this.handleOver = e => {
            e.preventDefault()
            // console.log(this)
            // this.setState({dragover: true})
        }
        this.handleDrop = e => {
            e.preventDefault()
            const data = e.dataTransfer
            const files = [...data.files]
            files.forEach(file=>this.uploadFile(file))
        }
        this.uploadFile = file => {
            console.log(file)
            this.previewFile(file)
            const shop = localStorage.getItem('shop')
            let url = '/images?shop='+shop
            let formData = new FormData()
            formData.append('file', file)
            const xhr = new XMLHttpRequest()
            
            xhr.open('POST', url, true)
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
        this.handleSelect = key => {
            console.log(key)
            const {assets, selects} = this.state
            const index = assets.findIndex(file=> file.key === key)
            assets[index].isSelected = ! assets[index].isSelected 
            if(selects.indexOf(key)!==-1){
                selects.splice(selects.indexOf(key),1)
            } 
            else selects.push(key)
            this.setState({assets, selects})
        }
        this.handleDelete = key =>{
            const shop = localStorage.getItem('shop')
            let url = `/images?shop=${shop}&key=${key}`
            fetch(url, {
                method: 'DELETE',
            }).then(res=>res.json()).then(res=>{
                if(res) {
                    const {assets} = this.state
                    const index = assets.findIndex(file=>file.key ===key)
                    if(index!==-1) assets.splice(index, 1)
                    this.setState(assets)
                }
            }).catch(e=>console.log(e))
        }
        this.deleteFiles = () => {
            const {selects} = this.state
            while(selects.length>0) {
                let key = selects.pop()
                this.handleDelete(key)
            }
            this.setState({selects})
        }
        this.handleSort = value => {
            const {assets} = this.state
            assets.sort((a,b)=> {
                let dateA = new Date(a.updated_at).getTime()
                let dateB = new Date(b.updated_at).getTime()
                console.log(dateA, dateB)
                return value === 'oldest' ? dateA - dateB : dateB - dateA
            })            
            this.setState({sort: value, assets})

        }
    }
    componentDidMount() {
        const shop = localStorage.getItem('shop')
        if(shop) {
            const regex = /image\/*/
            fetch(`/images?shop=${shop}`).then(response=> response.json()).then(data=> {
                data = data.assets.filter(val=> regex.test(val.content_type))
                this.setState({assets: data})
            })
        }   
    }
    renderImage() {
        const rows = []
        const {assets, views, search} = this.state
        if(assets) assets.forEach((image, index)=> {
            if(image.key.substr(7).indexOf(search) !== -1)
                rows.push(<Image key={image.key} views={views} image={image} delete={this.handleDelete} select={this.handleSelect}/>)
        })
        return rows
    }
    renderUploading() {
        const rows = []
        const {uploads, views} = this.state
        if(uploads) uploads.forEach((image, index)=> {
            rows.push(<Uploading key= {index} views={views} src={image.src} title={image.name} value={image.percentage}/>)
        })
        return rows
    }
    render() {
        const {selects, assets, search, sort} = this.state
        return (
           <div id='popup'>
                <h3>Select Image <span className="close">&times;</span></h3>
                <div className = "p-8">
                    <span className="title secondary-color p-8">My Images </span>
                    <span><label id="upload2" className="button right" htmlFor="fileElement">Upload</label></span>
                    
                </div>
                <div>
                    <div className="secondary-color p-8">
                        <input className="m-4" type="text" placeholder="Search..." value={search} onChange={e=>this.setState({search: e.target.value})}/>
                        {selects.length>0 ? <button className="m-4 delete-files" onClick={()=>this.deleteFiles()}>Delete</button>: null}
                        <div className="right p-4">
                            <label htmlFor="sorting">Sorting </label>
                            <select name="sorting" id='sorting' value={sort} onChange={e=> this.handleSort(e.target.value)}>
                                    <option value="newest">Newest</option>
                                    <option value="oldest">Oldest</option>
                            </select>
                            <label>View options </label>
                            <i className="fas fa-th-large" onClick={()=>this.setState({views: 'grid'})}></i>&nbsp;
                            <i className="fas fa-th-list" onClick={()=>this.setState({views: 'list'})}></i>
                        </div>
                    </div>
                    <form>
                        <input type="file" id="fileElement" accept="image/*" multiple onChange={this.handleFile}/>
                    </form>
                    <div id="drop-area" onDragOver={this.handleOver} onDrop={this.handleDrop} onDragLeave={()=>this.setState({isDragEnter: false})} onDragEnter={()=>this.setState({isDragEnter: true})}>
                        {this.state.isDragEnter ? <div className="drag-over p-8">Drop files to upload</div> : null }
                        {this.state.assets?null: <label id="upload" className="center" htmlFor="fileElement"><i className="fas fa-upload"></i><br/>Drag and Drop or click here to upload</label>}
                        {this.renderImage()}
                        {this.renderUploading()}
                    </div>
                    <div className="options secondary-color p-8">
                        <div className="right">
                            <button disabled={selects.length!==1?true:false}>Select</button>
                            <button>Cancel</button>
                        </div>
                        
                    </div>
                </div>
                <div>
                   
                </div>       
           </div>
        )
    }
}

export default App