const router = require('express').Router()
const User = require('mongoose').model('users')
const request = require('request-promise')

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

module.exports = router