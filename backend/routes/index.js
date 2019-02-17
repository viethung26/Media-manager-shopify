const router = require('express').Router()
const User = require('mongoose').model('users')

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.use('/shopify', require('./shopify'))
router.use('/images', require('./images'))
module.exports = router