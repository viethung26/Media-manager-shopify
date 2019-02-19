import React, {Component} from 'react'
import './app.css'
import Image from './components/image'
import Uploading from './components/uploadingImage'

const TEST_DATA = '[{"key":"assets/27434.jpg","public_url":"https://cdn.shopify.com/s/files/1/0171/4431/5968/t/3/assets/27434.jpg?13180284403782496566","created_at":"2019-02-15T03:23:41-05:00","updated_at":"2019-02-15T03:23:41-05:00","content_type":"image/jpeg","size":311069,"theme_id":70634537024},{"key":"assets/collection-view-grid.svg","public_url":"https://cdn.shopify.com/s/files/1/0171/4431/5968/t/3/assets/collection-view-grid.svg?13180284403782496566","created_at":"2019-02-14T08:57:39-05:00","updated_at":"2019-02-14T08:57:39-05:00","content_type":"image/svg+xml","size":906,"theme_id":70634537024},{"key":"assets/collection-view-list.svg","public_url":"https://cdn.shopify.com/s/files/1/0171/4431/5968/t/3/assets/collection-view-list.svg?13180284403782496566","created_at":"2019-02-14T08:57:39-05:00","updated_at":"2019-02-14T08:57:39-05:00","content_type":"image/svg+xml","size":1166,"theme_id":70634537024},{"key":"assets/example.jpg","public_url":"https://cdn.shopify.com/s/files/1/0171/4431/5968/t/3/assets/example.jpg?13180284403782496566","created_at":"2019-02-15T22:43:56-05:00","updated_at":"2019-02-15T22:43:56-05:00","content_type":"image/jpeg","size":80206,"theme_id":70634537024},{"key":"assets/ico-select.svg","public_url":"https://cdn.shopify.com/s/files/1/0171/4431/5968/t/3/assets/ico-select.svg?13180284403782496566","created_at":"2019-02-14T08:57:44-05:00","updated_at":"2019-02-14T08:57:44-05:00","content_type":"image/svg+xml","size":613,"theme_id":70634537024},{"key":"assets/icons.svg","public_url":"https://cdn.shopify.com/s/files/1/0171/4431/5968/t/3/assets/icons.svg?13180284403782496566","created_at":"2019-02-14T08:57:39-05:00","updated_at":"2019-02-14T08:57:39-05:00","content_type":"image/svg+xml","size":14669,"theme_id":70634537024},{"key":"assets/password-page-background.jpg","public_url":"https://cdn.shopify.com/s/files/1/0171/4431/5968/t/3/assets/password-page-background.jpg?13180284403782496566","created_at":"2019-02-14T08:57:40-05:00","updated_at":"2019-02-14T08:57:40-05:00","content_type":"image/jpeg","size":76069,"theme_id":70634537024}]'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            assets: JSON.parse(TEST_DATA),
            selects: [],
            uploads: []
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
            console.log("enter")
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
                console.log(xhr.response)
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
            if(selects.indexOf(key)!==-1) selects.pop(key)
            else selects.push(key)
            this.setState({assets, selects})
        }
        this.handleDelete = key =>{
            const shop = localStorage.getItem('shop')
            let url = `/images?shop=${shop}&key=${key}`
            fetch(url, {
                method: 'DELETE',
            }).then(res=>res.json()).then(res=>console.log(res)).catch(e=>console.log(e))
        }     
    }
    componentDidMount() {
        // const shop = localStorage.getItem('shop')
        // if(shop) {
        //     const regex = /image\/*/
        //     fetch(`/images?shop=${shop}`).then(response=> response.json()).then(data=> {
        //         data = data.assets.filter(val=> regex.test(val.content_type))
        //         console.log(JSON.stringify(data))
        //         this.setState({assets: data})
        //     })
        // }   
    }
    renderImage() {
        console.log('image')
        const rows = []
        const {assets} = this.state
        if(assets) assets.forEach((image, index)=> {
            rows.push(<Image key= {index} src={image.public_url} title={image.key} isSelected={image.isSelected} delete={this.handleDelete} select={this.handleSelect}/>)
        })
        return rows
    }
    renderUploading() {
        const rows = []
        const {uploads} = this.state
        if(uploads) uploads.forEach((image, index)=> {
            rows.push(<Uploading key= {index} src={image.src} title={image.name} value={image.percentage}/>)
        })
        return rows
    }
    render() {
        return (
           <div id='popup'>
                <h3>Select Image <span className="close">&times;</span></h3>
                <div className = "p-8">
                    <span className="title secondary-color p-8">My Images </span>
                    {/* <span><button className="right">Upload</button></span> */}
                    <span><label id="upload2" className="button right" htmlFor="fileElement">Upload</label></span>
                    
                </div>
                <div>
                    <div className="secondary-color p-8">
                        <input type="text" placeholder="Search..."/>
                        <div className="right">
                        <label htmlFor="sorting">Sorting </label>
                            <select name="sorting" id='sorting'>
                                    <option value="Newest">Newest</option>
                                    <option value="Oldest">Oldest</option>
                            </select>
                            <label>View options </label>
                            <i className="fas fa-th-large"></i>&nbsp;
                            <i className="fas fa-th-list"></i>
                        </div>
                    </div>
                    <div id="drop-area" onDragOver={this.handleOver} onDrop={this.handleDrop}>
                        <form>
                            <input type="file" id="fileElement" accept="image/*" multiple onChange={this.handleFile}/>
                            <label id="upload" className="center" htmlFor="fileElement"><i className="fas fa-upload"></i><br/>Drag and Drop or click here to upload</label>
                        </form>
                    </div>
                    <div className="secondary-color p-8">
                        <div className="right">
                            <button>Select</button>
                            <button>Cancel</button>
                        </div>
                        
                    </div>
                </div>
                <div>
                    {this.renderImage()}
                    {this.renderUploading()}
                </div>       
           </div>
        )
    }
}

export default App