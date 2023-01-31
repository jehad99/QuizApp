import './App.css'
import Login from './components/Login'
import Quiz from './components/Quiz';
import Results from './components/Results'

import { BrowserRouter, Route, Routes } from 'react-router-dom';



function App() {
  return (
    
    <BrowserRouter>
      {/* to navigate between pages */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Results />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
