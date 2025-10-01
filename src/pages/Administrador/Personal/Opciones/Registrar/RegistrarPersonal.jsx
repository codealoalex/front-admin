import './RegistrarPersonal.css';
import { useState } from "react";
import Input from "../../../Componentes/Input/Input";
import Select from '../../../Componentes/Select/Select';

const RegistrarPersonal = () => {

    const [nombre, setNombre] = useState('');
    const [paterno, setPaterno] = useState('');
    const [materno, setMaterno] = useState('');
    const [ci, setCi] = useState('');
    const [celular, setCelular] = useState('');
    const [salario, setSalario] = useState('');
    const [email, setEmail] = useState('');
    const [estado, setEstado] = useState('');
    const [entrada, setEntrada] = useState('');
    const [salida, setSalida] = useState('');

    const registrarPersonal = async (e) => {
        e.preventDefault();
        const datos = {
            nombre,
            paterno,
            materno,
            ci,
            celular,
            salario,
            email,
            estado: (estado == 'Activo') ? true : false,
            entrada,
            salida
        }
        try {
            const conexion = await fetch('http://localhost:10000/api/administrador/registrar-personal', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(datos),
                credentials: 'include'
            })
            const respuesta = await conexion.json();
            if (!conexion.ok) throw new Error();
            alert(respuesta.message);
            location.href = 'panel-admin';
        } catch (e) {
            console.error(e.message);
        }
    }

    return (
        <div className='s_admin-registrar-usuario'>
            <h3>Registrar nuevo personal</h3>
            <form className='s_admin-registrar-form' onSubmit={registrarPersonal}>
                <div className="s_admin-registrar-campos">
                    <Input value={nombre} setValue={setNombre} label={'Nombre'} />
                    <Input value={paterno} setValue={setPaterno} label={'Apellido paterno'} />
                    <Input value={materno} setValue={setMaterno} label={'Apellido materno'} />
                    <Input value={email} setValue={setEmail} label={'Correo electrónico'} tipo='email' />
                    <Input value={ci} setValue={setCi} label={'Carnet de identidad'} />
                    <Input value={celular} setValue={setCelular} label={'Celular'} tipo="number" />
                    <Input value={salario} setValue={setSalario} label={'Salario'} />
                    <Input value={entrada} setValue={setEntrada} label={'Hora de entrada'} tipo="time" />
                    <Input value={salida} setValue={setSalida} label={'Hora de salida'} tipo="time" />
                </div>
                <button id='s_admin-actualizar-btn'>Registrar</button>
            </form>
        </div>
    )
}

export default RegistrarPersonal;