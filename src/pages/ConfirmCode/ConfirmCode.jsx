import Button from '../../components/Button/Button';
import InputOtpConfirm from '../../components/InputOtp/InputOtp';
import './confirmCode.css';

import { useState } from "react"

const ConfirmCode = () => {
    const verificarCodigo = async (e) => {
        e.preventDefault();
        console.log(codigo);
        const response = await fetch('http://localhost:10000/api/usuario/verificar', {
            method: 'POST',
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify({
                codigo: codigo
            }),
            credentials: "include"
        });

        const data = await response.json();

        if (response.status == 401) {
            alert(data.message);
        }

        if (response.ok) {
            window.location.href = "/home";
        }

    }

    const [codigo, setCodigo] = useState('');
    return (
        <div id='codigo-container'>
            <form id='container-form' onSubmit={verificarCodigo}>
                <legend>Ingrese el código</legend>
                <InputOtpConfirm code={codigo} setCode={setCodigo}/>
                <Button p_texto='Enviar' p_type='submit'/>
            </form>
        </div>
    )
}

export default ConfirmCode
