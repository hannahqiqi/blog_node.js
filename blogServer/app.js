var express = require("express")
var MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectID
var cors = require("cors")
var bodyParser = require('body-parser')

var app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

var url = "mongodb://achen:th123456@ds151028.mlab.com:51028/aaronchlab"

app.get("/blogs", function (req, res) {
    MongoClient.connect(url, function (err, db) {
        //console.log("connected")
        var collection = db.collection("post")
        collection.find().toArray(function (err, docs) {
            db.close()
            res.send(docs)
        })
    })
})

app.post("/blog", function (req, res) {
    var post = req.body.post
    MongoClient.connect(url, function (err, db) {
        //console.log("connected")
        var collection = db.collection("post")
        collection.insert({ post: post, postTime: new Date() }, function (err, results) {
            db.close()
            res.send("ok")
        })
    })
})

app.get("/delblog", function (req, res) {
    var postId = req.query.id
    //console.log(postId)
    MongoClient.connect(url, function (err, db) {
        var collection = db.collection("post")
        collection.remove({ _id: ObjectId(postId) }, function (err, results) {
            db.close()
            res.send("ok")
        })
    })
})

app.get("/searchblog", function (req, res) {
    var content = req.query.dta
    MongoClient.connect(url, function (err, db) {
        //console.log("connected")
        var collection = db.collection("post")
        var re = new RegExp(content)
        collection.find({ post: re }).toArray(function (err, docs) {
            db.close()
            res.send(docs)
        })
    })
})

app.get("/updateblog", function (req, res) {
    //console.log("pp")
    var postId = req.query.id
    var content = req.query.dta
    MongoClient.connect(url, function (err, db) {
        console.log("connected")
        var collection = db.collection("post")
        collection.update({ '_id': ObjectId(postId) }, { $set: { 'post': content } }, function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close()
            res.send("ok")
        })
    })
})



app.listen(3000)