// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import './App.css'

import Register from './pages/Register/Register'

import { Routes, Route, Navigate } from 'react-router'

import { Login } from './pages/Login/Login'
import Home from './pages/Home/Home';
import ConfirmCode from './pages/ConfirmCode/ConfirmCode';
import Area from './pages/Home/subhome/AreaComun/Area';


// ... el resto de tu código
import EliminarResidente from './pages/Administrador/Residentes/EliminarResidentes/EliminarResidente';
import ActualizarResidente from './pages/Administrador/Residentes/ActualizarResidentes/ActualizarResidente';
import CrearUsuario from './pages/Administrador/Residentes/CrearUsuario/CrearUsuario';
import PanelAdmin from './pages/Administrador/Panel/PanelAdmin';
import SetNewPwd from './pages/Login/SetNewPwd/SetNewPwd';


function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <>

      <section className='content-container'>

        <Routes>
          <Route path='login' element={<Login />} />
          <Route path='cambiar-pwd' element={<SetNewPwd />} />
          <Route path='register' element={<Register />} />
          <Route path='verificar' element={<ConfirmCode />} />
          <Route path='*' element={<Login />} />
          <Route
            path="/panel-admin"
            element={
              <PrivateRoute>
                <PanelAdmin />
              </PrivateRoute>
            }
          />
          <Route path='/area-comun/:id' element={<Area />} />
        </Routes>
      </section >

    </>
  )
}

export default App
