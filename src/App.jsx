import { Route, Routes, Outlet, useLocation } from 'react-router-dom'

import './App.css'
import Header from './components/Organisms/Header/Header.jsx'
import Footer from './components/Organisms/Footer/Footer.jsx'
import Home from './components/Pages/Home/Home'
import ProductDetail from './components/Pages/ProductDetail/ProductDetail.jsx'
import ImagesPopUp from './components/Templates/ImagesPopUp/ImagesPopUp.jsx'
import RentNowPopUp from './components/Templates/RentNowPopUp/RentNowPopUp.jsx'

function App () {
  const location = useLocation()
  const previousLocation = location.state?.previousLocation

  function LayoutWithNavbarAndFooter () {
    return (
      <div className='layout'>
        <Header />
        <Outlet />
        <Footer />
      </div>
    )
  }

  return (
    <Routes>
      <Route element={<LayoutWithNavbarAndFooter />}>
        <Route path='/' element={<Home />} />
        <Route path='producto/:id' element={<ProductDetail />} />
        <Route path="*" element={<h1>404 Page Not Found</h1>}/>
      </Route>

      {
        previousLocation && (
          <>
            <Route path='producto/:id/galeria' element={<ImagesPopUp />} />
            <Route path='rentar' element={<RentNowPopUp />} />
          </>
        )
    }
    </Routes>

  )
}

export default App
