import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IndexMap from './pages/indexMap'
import DynamicList from './pages/adminportal'
import Forbidden from './pages/forbidden'
import ProtectedRoute from './components/ProtectedRoute'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/GGRA-resources/" element={<IndexMap />} />
        <Route
          path="/GGRA-resources/admin"
          element={
            <ProtectedRoute>
              <DynamicList />
            </ProtectedRoute>
          }
        />
        <Route path="/GGRA-resources/forbidden" element={<Forbidden />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
