const express = require("express")


const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})


app.get('/about',(req, res)=>{
    res.send("this is about page")
})

app.get( '/home',(req , res)=>{
    res.send("this is a home page")
})

app.get( '/product',( req , res)=>{
    res.send("this is product page")
})


app.listen(3000,()=>{
    console.log("server run on port 3000");
    
})