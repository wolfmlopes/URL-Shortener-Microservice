'use strict'
const mongoose = require('mongoose')
let Schema = mongoose.Schema
let urlTo = ""
let urlSchema = new Schema({
	original_url: String,
	short_url: String,
})

module.exports = mongoose.model('urls', urlSchema)
module.exports.to = function(res,url){
	console.log(url)
	res.redirect('http://'+url)
}
