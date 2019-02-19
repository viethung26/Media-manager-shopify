const router = require('express').Router()
const User = require('mongoose').model('users')
const request = require('request-promise')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')

// router.use(bodyParser.json())
// router.use(bodyParser.urlencoded({extended: false}))
router.use(fileUpload())
router.get('/', (req, res)=> {
    const {shop} = req.query
    let accessToken = null
    if(shop) {
        User.findOne({shop}).then(doc=> {
            accessToken = doc.token
            if(!accessToken) return res.status(403).send("Request need authorization")
            const url = 'https://' + shop + '/admin/themes/70634537024/assets.json'
            const options = {
                uri: url,
                headers: {
                    'X-Shopify-Access-Token': accessToken, 
                    'content-type': 'application/json'
                }
            }
            request.get(options).then(response=> {
                res.status(200).send(response)
            })
        })
    } else res.json(false)
    

})

router.post('/', (req, res)=> {
    const {shop} = req.query
    console.log(req.files)
    return res.json(true)
    let data = Buffer.from(req.files.file.data).toString('base64')
    let new_asset = {
        asset: {
            key: "assets/test.jpg",
            attachment: data
        }
    }
    if(shop) User.findOne({shop}).then(doc=> { 
        const requestUrl = 'https://' + shop + '/admin/themes/70634537024/assets.json'
        const options = {
            method: 'PUT',
            uri: requestUrl,
            json: true,
            resolveWithFullResponse: true,
            headers: {
                'X-Shopify-Access-Token': doc.token, 
                'content-type': 'application/json'
            },
            body: new_asset           
        }
        request.put(options)
        .then(response=> {
            res.json(true)
        }).catch((error) => {
            console.log(error.error)
            res.status(error.statusCode).send('error');
        })
    })
    
})

router.delete('/', (req, res)=> {
    const {shop, key} = req.query
    // ?asset[key]=
    console.log(shop, key)
    return res.json(true)
    if(shop && key) User.findOne({shop}).then(doc=> { 
        const requestUrl = 'https://' + shop + '/admin/themes/70634537024/assets.json?asset[key]='+key
        const options = {
            method: 'DELETE',
            uri: requestUrl,
            json: true,
            resolveWithFullResponse: true,
            headers: {
                'X-Shopify-Access-Token': doc.token, 
                'content-type': 'application/json'
            }
        }
        request.delete(options)
        .then(response=> {
            res.json(true)
        }).catch((error) => {
            console.log(error.error)
            res.status(error.statusCode).send('error');
        })
    })
})
module.exports = router