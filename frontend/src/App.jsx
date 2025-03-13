import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IndexMap from './pages/indexMap'
import DynamicList from './pages/adminportal'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexMap/>} />
        <Route path="/admin" element={<DynamicList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
