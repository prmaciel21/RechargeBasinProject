import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <body class="bg-gradient-to-t from-green-100 to-blue-100 min-h-screen">
        <Navbar />
        <div class="flex justify-center items-center pt-10 bg-gradient-to-b from-white to-blue-100 m-10 p-10 rounded-4xl shadow-lg">
          <h1 class="text-3xl ">Central Valley Recharge Basin Project</h1>
        </div>
      </body>
    </>
  )
}

export default App
