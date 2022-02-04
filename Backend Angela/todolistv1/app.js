const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname+"/date.js"); 

// console.log(date());

const app = express();
app.set('view engine', 'ejs');  // it will looks for views folder
app.use(bodyParser.urlencoded({extended:true}));  // it specifies that we are using body parsor soo that now we can use ha ha
app.use(express.static("public")); // to get static files like css and all , bcz in future we are going to deal with server so need a folder publuic in which all files a server can serve ha ha

var items = ["buy food","Cook food","Eat food ha ha"];
let workItems = [];
app.get('/',(req,res)=>{
    // res.send("hello ha ha"); // response from server 
    // var day ="";
   let day = date.getDate();
   res.render("list",{listTitle:day,newListItems:items});

})

app.post("/",(req,res)=>{
   var item = req.body.newItem;
   console.log(req.body);
   if(req.body.list=="work"){
       workItems.push(item);
       res.redirect("/work")
   } else{ items.push(item); // here we are adding new item to items ha ha

    res.redirect("/");

}
    items.push(item); // here we are adding new item to items ha ha
    console.log(item);
   
})

app.get("/work",(req,res)=>{
    res.render("list",{listTitle:"work list",newListItems:workItems})
})

app.post("/work",(req,res)=>{
    let item = req.body.newItem;
    workItems.push(item);
    console.log(req.body);
    
    res.redirect("/work");
})


app.get("/about",(req,res)=>{
    res.render("about");
})

app.listen(80,()=>{
    console.log('post started on 80 ha ha');
    
})
