//import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
//import heroImg from './assets/hero.png'
import "./meu.css"
import meunome from "./assets/forme"

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
    <div className='container'>
      <img src={viteLogo} className="logo" alt="Vite Logo"/>
      <img src={reactLogo} className="logo" alt="React Logo"/>
      <h1>{meunome()}</h1>
    </div>
    </>
  )
}

export default App
