import './Area.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import Carrousel from '../../../../components/Carrousel/Carrousel';


const Area = () => {
    // Obtener el ID del producto de la URL (ej: /producto/123 -> id = "123")
    const { id } = useParams();
    const [area, setArea] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [inicio, setInicio] = useState(null);
    const [fin, setFin] = useState(null);
    const [fecha, setFecha] = useState(null);

    useEffect(() => {
        const loadProduct = async () => {
            setIsLoading(true);
            // Hacer una llamada a la API usando el ID obtenido de la URL
            const respuesta = await fetch(`http://localhost:10000/api/area-comun/obtener-area/:${id}`);
            const {datos} = await respuesta.json();
            setArea(datos);
            setIsLoading(false);
        };

        loadProduct();
    }, [id]); // Se re-ejecuta si el ID de la URL cambia

    const formatearFecha = (fecha) => {
        return (`${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}-${fecha.getDate().toString().padStart(2, '0')}`);
    }

    const formatearHora = (hora) => {
        return `${hora.getHours().toString().padStart(2, '0')}:${hora.getMinutes().toString().padStart(2, '0') }`;
    }

    const reservarArea = async (e) => {
        e.preventDefault();
        const id_usuario = localStorage.getItem('id');
        const formatFecha = formatearFecha(fecha);
        const formatInicio = formatearHora(inicio);
        const formatFin = formatearHora(fin);
        const datos = {
            usuario: id_usuario,
            area: id,
            fecha: formatFecha,
            inicio: formatInicio,
            fin: formatFin,
        }
        try {
            const conexion = await fetch('http://localhost:10000/api/area-comun/reservar', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(datos),
                credentials: 'include'
            });
            const respuesta = await conexion.json();

            if (conexion.status == 201) {
                alert(respuesta.message);
                setFecha(null);
                setInicio(null);
                setFin(null);
            }
            if (!conexion.ok) alert(respuesta.message);
        } catch (e) {
            console.error(e.message);
        }
    }


    if (isLoading) return <div>Cargando detalles...</div>;
    if (!area) return <div>Producto no encontrado.</div>;    


    return (
        <div className="area-container">
            <div className="lc_area-comun">
                <div className="lc_area-comun-titulos">
                    <img src="https://static.nationalgeographicla.com/files/styles/image_3200/public/nationalgeographic_1528132.webp?w=760&h=507" alt="portada" />
                    <div className="lc_area-comun-titulos-container">
                        <h1>{area.nombre}</h1>
                        <p>Descripción: {area.descripcion} </p>
                    </div>
                </div>
                <form onSubmit={reservarArea} className='lc_reserva-container'>
                    <h2>Datos de la reserva</h2>
                    <div className="lc_calendar-info">
                        <h4>Seleccione fecha de reservación:</h4>
                            <Calendar value={fecha} onChange={(e) => setFecha(e.value)} inline className='lc_calendar-info-date' dateFormat='yy/mm/dd'/* locale="es" */ />
                    </div>
                    <div className="lc_calendar-time">
                        <h4>Hora de inicio:</h4>
                        <Calendar value={inicio} onChange={(e) => setInicio(e.value)} timeOnly />
                        <h4>Hora de finalización:</h4>
                        <Calendar value={fin} onChange={(e) => setFin(e.value)} timeOnly />
                    </div>
                    <Button label='Reservar'/>
                </form>
            </div>
        </div>
    );
};

export default Area;