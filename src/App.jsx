import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'

import './App.css'
import Header from './components/Organisms/Header/Header.jsx'
import Footer from './components/Organisms/Footer/Footer.jsx'
import Home from './components/Pages/Home/Home'
import ProductDetail from './components/Pages/ProductDetail/ProductDetail.jsx'

function App () {
  function LayoutWithNavbarAndFooter () {
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
          <Route path='product/:id' element={<ProductDetail />} />
          <Route path="*" element={<h1>404 Page Not Found</h1>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
