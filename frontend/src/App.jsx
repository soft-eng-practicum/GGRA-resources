import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IndexMap from './pages/indexMap'
import DynamicList from './pages/adminportal'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/GGRA-resources/" element={<IndexMap/>} />
        <Route path="/GGRA-resources/admin" element={<DynamicList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
