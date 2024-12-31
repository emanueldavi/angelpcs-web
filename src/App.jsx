import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Header } from './components/Header'
import { ProductSection } from './components/ProductSection'
import { Footer } from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <ProductSection/>
      <Footer/>
    </>
  )
}

export default App
