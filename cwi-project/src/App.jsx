import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <body class="bg-gradient-to-t from-green-100 to-blue-100 h-screen">
        <Navbar />
      </body>
    </>
  )
}

export default App
