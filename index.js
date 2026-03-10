const express = require("express");
const multer = require("multer");
const app = express();

app.listen(1000);

app.get("/test",(req,res)=>{
    res.send("I am Good");
})

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

app.post("/upload",upload.single("image"),(req,res)=>{
    res.status(200).json({
        message : "File is Uploaded"
    })
})

app.get("/upload",(req,res)=>{
    res.sendFile(__dirname + "/index.html");
})