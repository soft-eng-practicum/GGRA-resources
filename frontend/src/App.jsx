import { HashRouter, Routes, Route } from 'react-router-dom'
import IndexMap from './pages/indexMap'
import DynamicList from './pages/adminportal'
import Forbidden from './pages/forbidden'
import ProtectedRoute from './components/ProtectedRoute'
import './index.css'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<IndexMap />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <DynamicList />
            </ProtectedRoute>
          }
        />
        <Route path="/forbidden" element={<Forbidden />} />
      </Routes>
    </HashRouter>
  )
}

export default App
