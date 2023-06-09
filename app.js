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


//Chained route handling using express
app.route("/articles")
.get( //GET request REST API Created successfully

    function(req, res){

        Article.find({}).then(function(foundAllArticles){
            console.log(foundAllArticles)
            res.send(foundAllArticles)
        }).catch(function(err){res.send(err)})
    
    }
)

.post(//POST request REST API Created successfully

    function(req, res){
    
        // console.log(req.body.title);
        // console.log(req.body.content);
    
        const singlePostArticle = new Article({
            title: req.body.title,
            content: req.body.content
        })
    
        singlePostArticle.save().then(function(){
            res.send("Saved successfully!")
        }).catch(function(err){
            res.send(err)
        })
    
    }
)


.delete(//DELETE request REST API Created successfully

    function(req, res){

        Article.deleteMany({}).then(function(){
            res.send("All documents deleted successfully")
        }).catch(function(err){
            res.send(err)
        });
    
    }
)




app.listen(3000, function(){console.log("Server started at port 3000")}) 