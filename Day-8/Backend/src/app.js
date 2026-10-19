const express = require("express")
const noteModel = require("./Model/note.model")
const cors = require("cors")



const app = express()

app.use(cors())

app.use(express.json())

// post | notes
// {title , discription} = req.body

app.post("/notes",async (req , res)=>{
    const {title ,discription} = req.body

    const note = await noteModel.create({
        title , discription
    })

    res.status(201).json({
        Message:"create  notes successfully",
        note
    })


})


app.get("/notes",async (req , res)=>{
    const note1 = await noteModel.find()

    res.status(201).json({
        Message:"find notes succesfully",
        note1
    })
})


app.delete("/notes/:index", async (req ,res)=>{
    const index = req.params.index

    await noteModel.findByIdAndDelete(index)

    console.log(index);
    
    res.status(200).json({
        Message:"Delete note successfully"
    })
})

//patch 
// update the discription of the notes 

app.patch("/notes/:index",async (req , res)=>{
    const index1 = req.params.index
    const {discription} = req.body

const index = await noteModel.findByIdAndUpdate(index1, {discription})



    res.status(200).json({
        Message:"update discription",
        index
    })
})


module.exports = app