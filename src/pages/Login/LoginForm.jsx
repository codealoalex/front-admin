import ReCAPTCHA from 'react-google-recaptcha';

import { useState, useRef } from "react";
import { validateNoSpace } from "../../utils/validators";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

import './LoginForm.css';
import Select from '../Administrador/Componentes/Select/Select';

export function LoginForm() {
    const [userValue, setUserValue] = useState("");
    const [captchaValido, setCaptchaValido] = useState(false);


    const handleChangeUserValue = (newVal) => {
        if (validateNoSpace(newVal)) setUserValue(newVal);
    }

    const [userPass, setUserPass] = useState("");
    const handleChangeUserPass = (newVal) => {
        setUserPass(newVal)
    }

    const [userType, setUserType] = useState("");



    const handleSubmit = async (element) => {
        element.preventDefault();

        try {
            if (!captchaValido) throw new Error('Debe completar el captcha'); 
            const response = await fetch("http://localhost:10000/api/usuario/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(
                        {
                            usuario: userValue,
                            clave: userPass,
                            tipo: userType[0].toLowerCase()
                        }
                    ),
                    credentials: "include"
                }
            );

            if (response.status == 429) {
                alert('Demasiados intentos de login. Por favor, inténtalo de nuevo después de 5 minutos.')
                return;
            }

            const data = await response.json();

            if (response.status == 401) {
                alert(data.message)
                return;
            }
            if (response.status == 500) {
                alert(data.message)
                return;
            };
            console.log(DataTransfer)

            /* 
                        console.log(DataTransfer)
            
                        console.log("SIUUUUUUU",data);
             */
            // Aca viene el token, si lo usaremos
            // alert("Siu, se recibio la respuesta")


            localStorage.setItem("token", data.token);
            localStorage.setItem("id", data.id);
            localStorage.setItem("tipo", data.tipo);
            /* window.location.href = "/home"; */

            if (data.change) {
                alert('Debe cambiar su contraseña');
                window.location.href = 'cambiar-pwd';
            } else {
                window.location.href = 'verificar';
            }
        }
        catch (error) {
            alert(error.message);
            console.error("F-no funciono", error.message);
        }
    }



    const captcha = useRef(null);
    const onChange = () => {
        if (captcha.current.getValue()) setCaptchaValido(true);
    }

    return (
        <form onSubmit={handleSubmit} className="c_form">
            <Input
                p_placeHolder='romer@gmail.com'
                p_text='Email'
                p_value={userValue}
                p_onChange={handleChangeUserValue}
                p_type='username'
            />

            <Input
                p_placeHolder='••••••••'
                p_text='Contraseña'
                p_value={userPass}
                p_onChange={handleChangeUserPass}
                p_type='password'
            />

            <Select opciones={['Administrador', 'Residente']} setOpcion={setUserType} tipo_select={'Seleccione el tipo de usuario'} opcion={userType} />

            <div className="recaptcha">
                <ReCAPTCHA
                    ref={captcha}
                    sitekey='6Lez-csrAAAAAKPXZiczvEYVN75AYGtCW8CoZznF'
                    onChange={onChange} />
            </div>

            <Button
                p_class='okay'
                p_texto='Ingresar'
                p_type='submit'
            />
        </form>
    )

}

export default LoginForm