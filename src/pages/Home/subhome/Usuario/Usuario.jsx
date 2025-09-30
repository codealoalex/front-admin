import './Usuario.css';
import { useEffect, useState } from "react";

const Usuario = () => {
    const [datosGenerales, setDatosGenerales] = useState(null);
    const [reservas, setReservas] = useState(null);
    const [estadoReserva, setEstadoReserva] = useState(null);

    const id = localStorage.getItem('id');

    useEffect(() => {
        const informacionGeneral = async () => {
            try {
                const respuesta = await fetch(`http://localhost:10000/api/residente/:${id}`);
                if (!respuesta.ok) throw new Error("No fue posible obtener sus datos");
                const datos = await respuesta.json();
                setDatosGenerales(datos.datos);
            } catch (e) {
                console.error(e.message)
            }
        }
        informacionGeneral();
    }, [])

    useEffect(() => {
        const informacionReservas = async () => {
            try {
                const respuesta = await fetch(`http://localhost:10000/api/residente/info-reservas/:${id}`);
                if (!respuesta.ok) throw new Error("No fue posible obtener sus datos");
                const datos = await respuesta.json();
                setReservas(datos.datos);
            } catch (e) {
                console.error(e);
                console.error(e.message);
            }
        }
        informacionReservas();
    }, []);

    const estadoReservaFecha = (sql_fecha) => {
        const fecha = new Date(sql_fecha.slice(0, 10));
        const actual = new Date();
        const anio = fecha.getFullYear();
        const mes = fecha.getMonth()+1;
        const dia = fecha.getDate()+1;
        if (!(anio < actual.getFullYear()) && !(mes<actual.getMonth()+1) && !(dia<actual.getDate())) return true;
        return false;
    }

    return (
        <div className="c_usuario-info">
            {datosGenerales &&
                <div className="c_usuario-info-personal">
                    <h2>Datos personales:</h2>
                    <div className="c_usuario-info-personal-datos">
                        <p>Nombre: {datosGenerales.nombre}</p>
                        <p>Apellido Paterno: {datosGenerales.paterno}</p>
                        <p>Apellido Materno: {datosGenerales.materno}</p>
                        <p>Correo electónico: {datosGenerales.correo}</p>
                        <p>Carnet de Identidad: {datosGenerales.ci}</p>
                    </div>
                    <div className='c_usuario-info-personal-dpto'>
                        <p>Departamento: {datosGenerales.id_departamento}</p>
                        <p>Piso departamento: Piso {datosGenerales.piso}</p>
                        <p>Numero departamento: {datosGenerales.numero}</p>
                    </div>
                </div>
            }
            <div className="c_usuario-info-reservas">
                <h2>Reservas:</h2>
                {
                    reservas && reservas.map(reserva => (
                        <>
                            <br />
                            <div className={`c_usuario-info-reserva ${estadoReservaFecha(reserva.fecha)?'reserva-activa':'reserva-finalizada'}`}>
                                <h3>{reserva.nombre}</h3>
                                <h4>{reserva.descripcion}</h4>
                                <div className="info-reserva-ticket">
                                    <p className='datos-reserva-ticket reserva-ticket'>ID ticket: {reserva.id_reserva}</p>
                                    <p className='datos-reserva-ticket reserva-fecha'>Fecha: {reserva.fecha.slice(0, 10).split('-').reverse().join('-')}</p>
                                    <p className='datos-reserva-ticket reserva-inicio'>Inicio: {reserva.hora_inicio.slice(0,5)}</p>
                                    <p className='datos-reserva-ticket reserva-fin'>Fin: {reserva.hora_fin.slice(0, 5)}</p>
                                    <p className='datos-reserva-ticket'>Costo: {reserva.costo}</p>
                                </div>
                            </div>
                        </>
                    ))
                }
            </div>
        </div>
    );
}

export default Usuario;