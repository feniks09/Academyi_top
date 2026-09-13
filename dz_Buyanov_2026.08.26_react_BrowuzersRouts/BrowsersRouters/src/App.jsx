import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Contacts } from './pages/Contacts'

// import './App.css'

function App() {

  return ( 
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element= { <Home /> }></Route>
        <Route path='/about' element={ <About /> }></Route>
        <Route path='/contacts' element={ <Contacts />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
