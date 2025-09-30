import './Carrousel.css';
import { imgRoutes} from "../../utils/assetRoutes"
import { useState } from "react"

const Carrousel = ({ imagenes }) => {

    const [imagen, setImagen] = useState('IMAGEN1');
    
    /* function cambiarImg(imagen) {
        setImagen(imagen);
    }

    let i = 1;

    setInterval(() => {
        console.log(i);
        setImagen(`IMAGEN${i}`);
        i++;
    },2000) */
  return (
      <div className="carrusel-container">
          <button id='btn-left' className='carrusel-btn' type="button">&lt;</button>
          <img src={`../${imgRoutes[imagen]}`} alt="Imagen del area comun" />  
          <button id='btn-right' className='carrusel-btn' type="button">&gt;</button>
    </div>
  )
}

export default Carrousel
