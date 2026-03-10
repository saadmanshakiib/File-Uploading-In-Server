const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const app = express();

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.get("/test",(req,res)=>{
    res.send("I am Good");
})

const connectDB = async()=>{
    try{
            await mongoose.connect("mongodb://127.0.0.1:27017/userTest");
            console.log("Database is connected");
    }
    catch(err){
        console.log(err.message);
        console.log("Couldnt Connect");
        process.exit(1);
    }
}

const userSchema = mongoose.Schema({
    userName : {
        type : String,
        required : [true,"User name is required"]
    },
    image : {
        type : String,
        required : [true,"User Image is required"]
    }
})

const user = mongoose.model("Users",userSchema);

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,"uploads/");
    },
    filename : function(req,file,cb){
        const name = Date.now() + "-" + file.originalname;
        cb(null,name)
    }
})

const upload = multer({storage : storage});

app.post("/upload",upload.single("image"),async(req,res)=>{
try{
const newUser = new user({
    userName : req.body.userName,
    image : req.file.filename
})
await newUser.save();
res.status(200).json({
    message : "User Saved"
})
}
catch(err){
    console.log(err.message);
}
})

app.get("/upload",(req,res)=>{
    res.sendFile(__dirname + "/index.html");
})

app.listen(1000,async()=>{
    console.log("Server is running at 1000");
    await connectDB();
});