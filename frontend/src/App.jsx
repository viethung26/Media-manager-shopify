import React, {Component} from 'react'
import './app.css'
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            assets: null
        } 
        this.handleFile = e => {
            console.log("hihihi")
            console.log(e.target.files)
            const shop = localStorage.getItem('shop')
            if(shop) {
                const regex = /image\/*/
                fetch(`/images?shop=${shop}`).then(response=> response.json()).then(data=> {
                    data = data.assets.filter(val=> regex.test(val.content_type))
                    this.setState({assets: data})
                })
            }   
        }       
    }
    renderImage() {
        console.log('image')
        const rows = []
        const {assets} = this.state
        if(assets) assets.forEach((image, index)=> {
            rows.push(<img key= {index} src={image.public_url} width="100%" alt="xx"/>)
        })
        return rows
    }
    render() {
        console.log('render')
        return (
           <div id='popup'>
                <h3>Select Image <span className="close">&times;</span></h3>
                <div className = "p-8">
                    <span className="title secondary-color p-8">My Images </span>
                    <span><button className="right">Upload</button></span>
                    
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
                    <div id="drop-area">
                        <form>
                            <input type="file" id="fileElement" accept="image/*" multiple onChange={this.handleFile}/>
                            <label id="upload" className="button center" htmlFor="fileElement"><i className="fas fa-upload"></i><br/>Drag and Drop or click here to upload</label>
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
                </div>       
           </div>
        )
    }
}

export default App