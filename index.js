var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
const bcrypt=require("bcrypt")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))



mongoose.connect('mongodb://0.0.0.0:27017/shan',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    var phno = req.body.phno;
    var password = req.body.password;

    var data = {
        "phno": phno,
        "password" : password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('login_sucess.html')

})

app.post("/login",(req,res)=>{
    var phno = req.body.phno;
    var password = req.body.password;
    db.collection('users').findOne({phno:phno})
    .then(users=>{
        if(users){
            if(users.password==password){
                console.log("sucesssfully")
                return res.redirect('newpage.html')
            }
            else{
                console.log("incorrect")
            }
                  
        }
        else{
            console.log("error")
        }
    })
    })


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);


console.log("Listening on PORT 3000");