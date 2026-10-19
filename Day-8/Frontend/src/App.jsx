import React from 'react'
import { useState } from "react";
import axios from "axios"

const App = () => {

const [note, setnote] = useState([
  {
    title:" test title ",
    discription:" test discription"
  },
  {
    title:" test title ",
    discription:" test discription"
  },
  {
    title:" test title ",
    discription:" test discription"
  },
  {
    title:" test title ",
    discription:" test discription"
  },
])

axios.get('http://localhost:3000/notes')
.then((res)=>{
  setnote(res.data.note1)
  
})

  return (
    <>
    <div className='notes'>
      {
        note.map(note => {
          return <div className='note'>
        <h1>{note.title}</h1>
        <p>{note.discription}</p>
       
      </div>
        })
      }
    </div>
    
    </>
  )
}

export default App
