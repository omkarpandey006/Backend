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


module.exports = app