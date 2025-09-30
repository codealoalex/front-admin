import './Usuarios.css';

import { useState } from "react"
import NavOpciones from '../../Componentes/NavOpciones/NavOpciones';
import Residentes from './Residentes/Residentes';

import AreaComun from '../../../Home/subhome/AreaComun/AreaComun';
import Parqueo from '../../../Home/subhome/Parqueo/Parqueo';
import CrearUsuario from '../CrearUsuario/CrearUsuario';

const Usuarios = ({ setPage }) => {

  const [pageSelected, setPageSelected] = useState("Residentes")

  const renderPage = () => {
    switch (pageSelected) {
      case "Registrar-usuario":
        return <CrearUsuario/>
      case "Residentes":
        return <Residentes />
      case "Visitantes":
        return <AreaComun />
      case "Personal":
        return <Parqueo />
      /*case "areaComun":
        return <AreaComun />
      case "usuario":
        return <Usuario />
      case "pagos":
        return <Title p_text="pagos" />
      case "depas":
        return <Title p_text="depas" /> */
      default:
        break;
    }
  }


  return (
    <main className='panel-admin-usuarios'>
      <NavOpciones setPage={setPageSelected} />
      <div className="admin-usuarios-screen">
        {renderPage()}
      </div>
    </main>
  )
}

export default Usuarios;
