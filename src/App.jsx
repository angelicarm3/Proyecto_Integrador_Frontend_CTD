import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'

import './App.css'
import Navbar from './containers/navbar/Navbar.jsx'
import Footer from './containers/footer/Footer.jsx'
import Home from './pages/Home'

function App () {
  function LayoutWithNavbarAndFooter () {
    return (
      <div className='w-screen flex flex-col'>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutWithNavbarAndFooter />}>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
