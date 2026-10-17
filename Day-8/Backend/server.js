


require("dotenv").config()

const app = require("./src/app")
const connectToDb = require("./src/Config/database")
const noteModel = require("./src/Model/note.model")



app.listen(3000,()=>{
    console.log("server running on port 3000");
    
})

connectToDb()