import './App.css'
import Login from './components/Login'
import Quiz from './components/Quiz';
import Results from './components/Results'

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Authenticate from './components/Authenticate';



function App() {

  return (
    <BrowserRouter>
      {/* to navigate between pages */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Authenticate />}>
          <Route path="/" element={<Layout />}>
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Results />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
