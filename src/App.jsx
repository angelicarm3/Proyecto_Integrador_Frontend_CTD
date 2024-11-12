import { Route, Routes, Outlet, useLocation } from 'react-router-dom'

import './App.css'
import Header from './components/Organisms/Header/Header.jsx'
import Footer from './components/Organisms/Footer/Footer.jsx'
import Home from './components/Pages/Home/Home'
import ProductDetail from './components/Pages/ProductDetail/ProductDetail.jsx'
import LoginRegister from './components/Pages/LoginRegister/LoginRegister.jsx'

import AdminPanel from './components/Pages/AdminPanel/AdminPanel'
import AdminProducts from './components/Pages/AdminProducts/AdminProducts'
import AdminCreateEditProduct from './components/Pages/AdminCreateEditProduct/AdminCreateEditProduct.jsx'
import AdminUsers from './components/Pages/AdminUsers/AdminUsers.jsx'

import ImagesPopUp from './components/Templates/ImagesPopUp/ImagesPopUp.jsx'
import RentNowPopUp from './components/Templates/RentNowPopUp/RentNowPopUp.jsx'

function App () {
  const location = useLocation()
  const previousLocation = location.state?.previousLocation

  function LayoutWithNavbarAndFooter () {
    return (
      <div className='layout bg-gray2'>
        <Header />
        <Outlet />
        <Footer />
      </div>
    )
  }

  function AdmonLayoutWithNavbarAndFooter () {
    return (
      <div className='layout'>
        <Header />
        <Outlet />
        <Footer />
      </div>
    )
  }

  return (
    <>
      <Routes location={previousLocation || location}>
        <Route element={<LayoutWithNavbarAndFooter />}>
          <Route path='/' element={<Home />} />
          <Route path='producto/:id' element={<ProductDetail />} />
          <Route path='inicio-sesion' element={<LoginRegister />} />
          <Route path='registro' element={<LoginRegister />} />
          <Route path='*' element={<h1>404 Page Not Found</h1>} />
        </Route>

        <Route element={<AdmonLayoutWithNavbarAndFooter />}>
          <Route path='administracion' element={<AdminPanel />} />
          <Route path='administracion/productos' element={<AdminProducts />} />
          <Route path='administracion/agregar-producto' element={<AdminCreateEditProduct />} />
          <Route path='administracion/editar-producto/:id' element={<AdminCreateEditProduct />} />
          <Route path='administracion/usuarios' element={<AdminUsers />} />
        </Route>
      </Routes>

      {
        previousLocation && (
          <Routes>
            <Route path='producto/:id/galeria' element={<ImagesPopUp />} />
            <Route path='rentar' element={<RentNowPopUp />} />
          </Routes>
        )
      }
    </>
  )
}

export default App
