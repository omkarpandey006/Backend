const mongoose = require("mongoose")


const notesSchema = new mongoose.Schema({
title:"string",
discription:"string",

})

const noteModel = mongoose.model("notes",notesSchema)



module.exports = noteModel 