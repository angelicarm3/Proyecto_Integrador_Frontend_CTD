import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'
import Admin from './pages/Admin'
import AdminPanel from './Common/Components/AdminPanel/AdminPanel'

import './App.css'
import Navbar from './components/Organisms/Navbar/Navbar.jsx'
import Footer from './components/Organisms/Footer/Footer.jsx'
import Home from './components/Pages/Home/Home'

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
        <Route path='/AdminPanel' element={<AdminPanel />} />
        <Route path='/products' element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
