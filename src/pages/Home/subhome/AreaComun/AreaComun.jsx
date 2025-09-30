import './AreaComun.css';

import Title from '../../../../components/Title/Title'
import LittleCard from '../../../../components/LittleCard/LittleCard'
import { svgRoutes } from '../../../../utils/assetRoutes';
import CardAreaComun from '../../../../components/CardAreaComun/CardAreaComun';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';


const AreaComun = () => {

    const [cantidadAreas, setCantidadAreas] = useState(0);
    const [areasDisponibles, setAreasDisponibles] = useState(0);
    const [areasComunes, setAreasComunes] = useState([]);

    useEffect(() => {
        const obtenerAreasComunes = async () => {
            let disponibles = 0;
            try {
                const respuesta = await fetch('http://localhost:10000/api/area-comun/');
                const areas = await respuesta.json();
                const { datos } = areas;
                datos.forEach(area => {
                    if (area.estado == "Activo") disponibles++;
                });
                setAreasComunes(datos);
                setCantidadAreas(datos.length);
                setAreasDisponibles(disponibles);
            } catch (e) {
                console.error(e.message);
            }
        }
        obtenerAreasComunes();
    }, [])

    return (
        <div className='c_AreaComun-container'>
            <div className='c_Titulo'>
                <Title
                    p_text='Áreas Comúnes'
                    p_align="start"
                    p_sz={2.5}
                />
                <Title
                    p_text='Areas comunes disponibles para usted y su familia'
                    p_align='start'
                    p_sz={1.5}
                />
            </div>
            <div className="c_Informacion">
                <LittleCard p_text='Total Áreas' p_logo='LOCATION' p_number={cantidadAreas} />
                <LittleCard p_text='Disponibles' p_logo='Time' p_number={areasDisponibles} />
                <LittleCard p_text='Reservas Hoy' p_logo='tick' p_number='0' />
                <LittleCard p_text='Reservas Hoy' p_logo='tick' p_number='0' />
            </div>
            <div className="c_Opciones">
                <a className='opciones' href="#">Áreas comunes</a>
                <a className='opciones' href="#">Reservas</a>
                <a className='opciones' href="#">Calendario</a>
            </div>

            <div className="c_Opciones-Area-Comun">
                <form>
                    <div className="opciones-buscar">
                        <img src={svgRoutes["Users"]} alt="icono-lupa" id='logo-buscar' />
                        <input type="text" placeholder='Buscar área común...' />
                    </div>
                    <button type='button' hidden>Buscar</button>
                </form>
                <div className="c_Opciones c_Opciones-area">
                    <a className='opciones' href="#">Todos</a>
                    <a className='opciones' href="#">Disponibles</a>
                    <a className='opciones' href="#">Ocupados</a>
                    <a className='opciones' href="#">Mantenimiento</a>
                    <a className='opciones' href="#">Nueva Área</a>
                </div>
            </div>
            <div className='c_Areas-Comunes'>
                {areasComunes && areasComunes.map(area => (
                    <Link to={`/area-comun/${area.id_area}`} className='link-to-area'>
                        <CardAreaComun key={area.id_area} titulo={area.nombre} descripcion={area.descripcion} aforo={0} precio={'Sin precio'} estado={area.estado == 'Activo' ? 'Disponible' : 'No disponible'} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default AreaComun;
