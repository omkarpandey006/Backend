const express = require("express")
const noteModel = require("./models/note.model")

 const app = express()

 app.use(express.json())

 //post /notes
 // -req.body => {title,discription}

 app.post("/Notes",async (req ,res)=>{
    const { title , discription} = req.body


   const note = await noteModel.create({
        title, discription
    })

    res.status(201).json({
        message: "Note created successfully",
         note
    })
 })

app.get("/notes",async(req,res)=>{
  const notes = await  noteModel.find()

  res.status(200).json({
    message:"Notes fetch successfully",
      notes
  })
})






module.exports = app