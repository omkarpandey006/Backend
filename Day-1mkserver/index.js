const express = require("express")

const run = express()

run.listen(3000,()=>{
    console.log("server run on port 3000");
    
})