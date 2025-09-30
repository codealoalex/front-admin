import './CardUser.css';

const CardUser = ({ usuario, editar, eliminar}) => {
  return (
      <div className='container-card'>
          <div className="card-imagen">
              <img src="https://static.vecteezy.com/system/resources/previews/006/326/393/non_2x/penguin-cartoon-colored-aanimal-illustration-free-vector.jpg" alt={`Imagen del usuario ${usuario.id_residente}`} />
          </div>
          <div className='card-usuario'>
              <div className="card-usuario-datos">
                  <h2>{`${usuario.nombre} ${usuario.paterno} ${usuario.materno}`}</h2>
                  <h3>{usuario.correo}</h3>
                  <h4>{usuario.ci}</h4>
              </div>
              <div className="card-usuario-registro">
                  <span>{usuario.id_residente}</span>
                  <span>{usuario.id_departamento}</span>
              </div>
          </div>
          <div className="card-usuario-opciones">
              <>
                  {editar}
                  {eliminar}
              </>
          </div>
    </div>
  )
}

export default CardUser;