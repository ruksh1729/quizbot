import { Routes, Route } from 'react-router-dom'
import Home from '../components/Home'
import Navbar from '../components/Navbar'
import './App.css'

function App() {
  return (
    <div className='bg-zinc-900 h-screen'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
