import {useState} from 'react'
import './App.css'

function App() {
const [name, setName] = useState('')

const handlerChange = (event) =>{
  console.log(event.target.value)
  // console.log(event.target)
  // console.log(event.target.value)
  setName(event.target.value)
}

return (
    <input 
    type ="text"
    value ={name}
    onChange = {handlerChange}
    placeholder = "введите Имя"/>
  )
}

export default App
