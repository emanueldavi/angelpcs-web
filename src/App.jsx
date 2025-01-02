import './App.css'
import { Routes, Route} from 'react-router-dom'
import { Home } from '@/pages/Home.jsx'
import { ProductPage } from '@/pages/ProductView.jsx'

function App() {

  return (
    <>
      <div className='App'> 
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
      </div>
      
    </>
  )
}

export default App
