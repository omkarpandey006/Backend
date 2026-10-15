const express = require("express")

const app = express()

// app.get("/",(req , res)=>{
//     res.send("helloo wold")
// })
app.use(express.json())

const notes = []

// post/notes

app.post("/notes",(req ,res)=>{
    
    notes.push(req.body)

     res.status(201).json({
        message:"Notes create successs full.."
     })

    
})

app.get("/notes",(req , res)=>{
    res.status(200).json({
        notes:notes
    })
})


//delete /notes
app.delete("/notes/:index",(req ,res)=>{
    delete notes[req.params.index]

    res.status(204).json({
        message:"Notes deleted successfully."
    })

})


app.patch("/notes/:index",(req,res)=>{
  notes[req.params.index].description = req.body.description
  res.status(200).json({
    message:"note updated successfully"
  })
})
module.exports = app