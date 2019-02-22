const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    shop: {type: String, lowercase: true, unique: true, required: true, index: true},
    token: String,
    themeId: String
}, {timestamps: true})

mongoose.model('users', UserSchema)