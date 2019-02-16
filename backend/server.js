const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const crypto = require('crypto')
const cookie = require('cookie')
const nonce = require('nonce')()
const querystring = require('querystring')
const request = require('request-promise')

const apiKey = process.env.SHOPIFY_API_KEY
const apiSecret = process.env.SHOPIFY_API_SECRET

const scopes =  'read_themes, write_themes, read_products, write_products'
const forwardingAddress = "https://2d571673.ngrok.io"

const Shopify = require('shopify-api-node')
const fs = require('fs')
const path = require('path')

// const fileStream = fs.readFileSync(path.join(__dirname, 'a.txt'))
app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.get('/shopify', (req, res) => {
    const shop = req.query.shop
    if (shop) {
        const state = nonce();
        const redirectUri = forwardingAddress + '/shopify/callback'
        const installUrl = 'https://' + shop + '/admin/oauth/authorize?client_id=' + apiKey +
        '&scope=' + scopes +
        '&state=' + state +
        '&redirect_uri=' + redirectUri
        res.cookie('state', state)
        res.redirect(installUrl)
    } else {
        return res.status(400).send('Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request');
    }
  })

app.get('/shopify/callback', (req, res)=> {
    const {shop, hmac, code, state} = req.query
    const stateCookie = cookie.parse(req.headers.cookie).state
      
    if(state !== stateCookie) {
        return res.status(403).send('Request origin cannot be verified')
    }

    if(shop && hmac && code) {
        const map = Object.assign({}, req.query)
        delete map['signature']
        delete map['hmac']
        const message = querystring.stringify(map)
        const providedHmac = Buffer.from(hmac, 'utf-8')
        const generatedHash = Buffer.from(
            crypto.createHmac('sha256', apiSecret)
            .update(message)
            .digest('hex'), 'utf-8'
        )
        let hashEquals = false
        try {
            hashEquals = crypto.timingSafeEqual(generatedHash, providedHmac)
        } catch(e) {
            hashEquals = false
        }
        if(!hashEquals) {
            return res.status(400).send('HMAC validation failed')
        }
        const accessTokenRequestUrl = 'https://' + shop + '/admin/oauth/access_token'
        const accessTokenPayload = {
            client_id: apiKey,
            client_secret: apiSecret,
            code
        }
        request.post(accessTokenRequestUrl, {json: accessTokenPayload}).then(accessTokenResponse=> {
            const accessToken = accessTokenResponse.access_token
            //do something with access token

            // const shopify = new Shopify({
            //     shopName: shop,
            //     apiKey,
            //     password: apiSecret,
            // })
            // shopify.theme.list().then(themeList=> console.log(themeList))
            // res.end("shopResponse")
            let new_product = {
                product: {
                    id: 2911996706880,
                    title: "CCCC",
                    body_html: "SAN PHAM C",
                }
            }
            let new_asset = {
                asset: {
                    key: "assets/example.jpg",
                    src: "https://agilepainrelief.com/wp-content/uploads/2011/07/photodune-9297562-example-stamp-xs.jpg"
                }
            }
            const requestUrl = 'https://' + shop + '/admin/themes/70634537024/assets.json'
            const options = {
                method: 'PUT',
                uri: requestUrl,
                json: true,
                resolveWithFullResponse: true,
                headers: {
                    'X-Shopify-Access-Token': accessToken, 
                    'content-type': 'application/json'
                },
                body: new_asset           
            }
            request.put(options)
            .then(response=> {
                // const themes = JSON.parse(response)
                console.log(response)
                res.json(true)
            }).catch((error) => {
                console.log(error.error)
                res.status(error.statusCode).send('error');
              })
        }).catch((error) => {
            console.log(error.error)
            res.status(error.statusCode).send('error');
          })
    } else {
        res.status(400).send('Required parameters missing')
    }
})
  
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
})