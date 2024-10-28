import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'

import './App.css'
import Header from './components/Organisms/Header/Header.jsx'
import Footer from './components/Organisms/Footer/Footer.jsx'
import Home from './components/Pages/Home/Home'
import AdminPanel from './components/Pages/AdminPanel/AdminPanel.jsx'
import AdminProducts from './components/Pages/AdminProducts/AdminProducts.jsx'

function App() {
  const location = useLocation()
  const previousLocation = location.state?.previousLocation

  function LayoutWithNavbarAndFooter() {
    return (
      <div className='w-screen flex flex-col'>
        <Header />
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
          <Route path='/admin' element={<AdminPanel />} />
          <Route path='/admin/products' element={<AdminProducts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
