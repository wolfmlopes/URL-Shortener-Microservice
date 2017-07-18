'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const ejs = require('ejs')
const port = process.env.PORT || 3000
//Express
const app = express()
app.use(express.static('public'))

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json())

//CORS
app.use(cors())

//Mongoose
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true })

//EJS
app.set('view engine', 'ejs')

//index
app.get('/', function(req,res){
	res.render('./pages/index')
})


//Access short url
app.get('/:number', function(req,res,next){
	let Url = require('./models/Url.class.js')
	Url.findOne({'short_url': req.params.number }, function(err,obj){
		if(obj===null){}else{
			Url.to(res = res,obj.original_url)
			res.json()
		}
	})
})

//new
app.get('/new/:url(*)', function(req,res){

	let Url = require('./models/Url.class.js')
	let newUrl = req.params.url
	if(newUrl.split('http://')[1]){
		newUrl =  newUrl.split('http://')[1]
	}
	if(newUrl.split('https://')[1]){
		newUrl =  newUrl.split('https://')[1]
	}
	let randomNumber = Math.floor(Math.random()*100000)
	let objUrl = new Url({original_url:newUrl,short_url:randomNumber})


	objUrl.save(function (err) {
		if (err) return handleError(err);
		console.log("Complete!")
	})

	res.json({original_url:req.params.url, short_url: "https://urlshortenermicroservicefcc-m.herokuapp.com/"+randomNumber})
})

app.listen(port, function(){
	console.log('Is running on port: '+port)
	console.log('URL Shortener Microservice')
	console.log('Github: https://github.com/wolfmlopes/URL-Shortener-Microservice')
})