const mongoose = require('mongoose')

const articleschema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Article = mongoose.model('Article',articleschema)

module.exports = Article;