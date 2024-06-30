import React from 'react'
import Home from './Containers/Home'
import Navbar from './Containers/Navbar'
import ReactDOM from 'react-dom/client'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar></Navbar>
    <Home></Home>
  </React.StrictMode>,
)
