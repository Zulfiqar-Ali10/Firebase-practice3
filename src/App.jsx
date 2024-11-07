import { useState } from 'react'
/// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
/// pages /
import { Register } from './Pages/Register';
import { Route, Routes } from 'react-router-dom';
import { Login } from './Pages/Login';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
      <Routes>
        <Route  path="/"  element={<h2>Home Page</h2>} />
        <Route  path="/register" element={ <Register /> } />
        <Route  path="/login" element={ <Login /> } />
      </Routes>
     
    </>
  )
}

export default App
