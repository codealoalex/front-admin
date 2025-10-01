import React, { useEffect, useState } from 'react'

const VerPersonal = ({ id }) => {

    const [personal, setPersonal] = useState(null);

    useEffect(() => {
        const obtenerPersonal = async (id_param) => {
            try {
                const conexion = await fetch(`http://localhost:10000/api/administrador/obtener-personal/:${id_param}`, {
                    method: 'GET',
                    credentials:'include'
                });
                const datos = await conexion.json();
                setPersonal(datos.personal);
            } catch (e) {
                console.error(e.message);
            }
        }
        obtenerPersonal(id)
    },[])
  return (
      <div>
          <h1>Datos personal:</h1>
          {personal && JSON.stringify(personal)}
    </div>
  )
}

export default VerPersonal
