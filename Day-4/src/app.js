// server config karna 
// server create krna 

const express = require("express")


const app = express()
const notes = []

app.use(express.json())

app.get("/",(req ,res )=>{
    res.send("heloo omkar pandey")
})

// post /notes
app.post("/notes",(req , res)=>{
    console.log(req.body)

    notes.push(req.body)

    // console.log(notes);
    res.send("notes create")
})

// get /notes
app.get("/notes",(req , res)=>{
  res.send(notes)
})

//delete / notes
//params
app.delete("/notes/:index",(req ,res)=>{
   delete notes[req.params.index]

   res.send("note deleted successfully")
    
})

//patch /notes/:index
// req.body = {discription :- sample modified description..}

app.patch("/notes/:index",(req , res )=>{
    notes[req.params.index].description = req.body.description

    res.send("note update successfully")
})

module.exports = app