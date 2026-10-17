const app = require("./src/app")

const mongoose = require("mongoose")

function connectToDb(){
    mongoose.connect("mongodb+srv://aomkarpandey7408_db_user:OmkarDb2005O30@cluster0.is49d4h.mongodb.net/day-6")
    .then(()=>{
        console.log("connect to Database");
        
    })
}
connectToDb()




app.listen(3000,()=>{
    console.log("server running on port 3000");
    
})



