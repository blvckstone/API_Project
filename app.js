const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
mongoose.connect("mongodb://127.0.0.1:27017/wikiDB"); //Database

const articleSchema = mongoose.Schema({ //Schema
    title: String,
    content: String
})

const Article = mongoose.model("Article", articleSchema); //Model



app.get("/articles", function(req, res){

    Article.find({}).then(function(foundAllArticles){
        console.log(foundAllArticles)
        res.send(foundAllArticles)
    })

})






app.listen(3000, function(){console.log("Server started at port 3000")}) 