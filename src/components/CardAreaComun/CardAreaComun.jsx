import './CardAreaComun.css';
import { imgRoutes, svgRoutes } from "../../utils/assetRoutes"

const CardAreaComun = ({imagen="LOGO", titulo, descripcion, aforo, precio, estado, p_onclick}) => {
  return (
      <div className="area-comun-card" onClick={p_onclick}>
          <span className={`area-comun-card-estado ${estado == "Disponible" ? 'estado-color-disponible' : 'estado-color-no-disponible'}`}>{estado}</span>
          <div className='area-comun-card-imagen'>
              <img src={imgRoutes[imagen]} alt={`Imagen de ${titulo}`}/>
          </div>
          <div className="area-comun-card-descripcion">
              <div className="area-comun-card-title">
                  <h3>{titulo}</h3>
                  <h4>{descripcion}</h4>
              </div>
              <div className="area-comun-card-info">
                  <span>{aforo}</span>
                  <span>{precio}</span>
              </div>
          </div>
      </div>
  )
}

export default CardAreaComun
