//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// from Lodash Documentation
// Load the full build.
var _ = require('lodash');   // it is a javascript utility for strings , arrays , objects and lot more ...





const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


let posts = [];

const app = express(); // create app using express

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));     // static files in punblic


app.get("/",(req,res)=>{
  // res.render(__dirname+"/views/home.ejs");
  res.render("home",{part1:homeStartingContent,part2:posts});
})
app.get("/about",(req,res)=>{
  res.render("about",{part1:aboutContent}); // key should be same in both ejs and app.js :)
})
app.get("/contact",(req,res)=>{
  res.render("contact",{part1:contactContent});
})
app.get("/compose",(req,res)=>{
  res.render("compose");
})

app.get("/posts/:id",(req,res)=>{  // jab koi post ko lena chahega then what to do , we are making this route randomly for our good 
  console.log(req.params.id);  
  let title,content,flag=0;
  const requestedTitle = _.lowerCase(req.params.id);
  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);
    if(requestedTitle==storedTitle){
      console.log("match found ha ha");
      res.render("post",{title:post.title,content:post.content})
    }
  else
  console.log('match not found !');
  })

})

app.post("/compose",(req,res)=>{
  const post ={
    title:req.body.postTitle,
    content:req.body.postBody
  };
  posts.push(post);

  
  res.redirect("/");
})














app.listen(80, function() {
  console.log("Server started on port 3000");
});
