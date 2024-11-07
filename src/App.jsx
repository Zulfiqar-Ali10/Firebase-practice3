import { useState } from 'react'
/// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
/// pages /
import { Register } from './Pages/Register';
import { Route, Routes } from 'react-router-dom';
import { Login } from './Pages/Login';
import { Navbar } from 'react-bootstrap';
import { MyNavbar } from './assets/Componets/Navbar';
import { List } from './Pages/List';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
 <div className="App">
        <MyNavbar/>
      <Routes>
        <Route  path="/"  element={<h2>Home Page</h2>} />
        <Route  path="/register" element={ <Register /> } />
        <Route  path="/login" element={ <Login /> } />
        <Route  path="/book/list" element={ <List /> } />
      </Routes>
     
 </div>
    </>
  )
}

export default App
