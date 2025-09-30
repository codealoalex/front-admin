import { useState } from "react"
import Input from "../../components/Input/Input"
import Button from "../../components/Button/Button";



export function RegisterForm() {

    const [apePaterno, setApePaterno] = useState("");
    const [apeMaterno, setApeMaterno] = useState("");
    const [nombresUser, setNombresUser] = useState("");
    const [fechaNacUser, setFechaNacUser] = useState(Date());//YYYY-MM-DD
    const [correoUser, setCorreoUser] = useState("");
    const [passwordUser, setPasswordUser] = useState("");
    const [contactoUser, setContactoUser] = useState("")
    const [tipoUser, setTipoUser] = useState("admin")
    const [departamento, setDepartamento] = useState("")


    const handleApePaterno = (newVal) => setApePaterno(newVal);
    const handleApeMaterno = (newVal) => setApeMaterno(newVal);
    const handleNombresUser = (newVal) => setNombresUser(newVal);
    const handleFechaNacUser = (newVal) => { setFechaNacUser(newVal) };
    const handleCorreoUser = (newVal) => setCorreoUser(newVal);
    const handlePasswordUser=(newVal)=>setPasswordUser(newVal)
    const handleContactoUser = (newVal) => setContactoUser(newVal);
    // const handleTipoUser=(newVal)=>setTipoUser(newVal);
    const handleDepartamento = (newVal) => setDepartamento(newVal);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            id: Math.floor(Math.random() * 1000000),//por ahora para pruebass
            nombre: nombresUser,
            paterno: apePaterno,
            materno: apeMaterno,
            fecha: fechaNacUser,
            correo: correoUser,
            contacto: contactoUser,
            clave: "supersecreta1234", //por ahora para pruebas
            tipo: tipoUser,
            departamento
        };

        try {
            const res = await fetch("/api/user/registrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            const data = await res.json();

            console.log(data);
        } catch (error) {
            console.error("Error al registrar usuario:", error);
        }
    };


    return <form className="c_form" onSubmit={handleSubmit}>
        <Input
            p_text="Apellido Paterno"
            p_direccion="row"
            p_onChange={handleApePaterno}
            p_value={apePaterno}
        />
        <Input
            p_text="Apellido Materno"
            p_direccion="row"
            p_onChange={handleApeMaterno}
            p_value={apeMaterno}
        />
        <Input
            p_text="Nombres"
            p_direccion="row"
            p_onChange={handleNombresUser}
            p_value={nombresUser}
        />
        <Input
            p_text="Fecha Nac."
            p_type="date"
            p_direccion="row"
            p_onChange={handleFechaNacUser}
            p_value={fechaNacUser}
        />
        <Input
            p_text="Correo"
            p_type="email"
            p_direccion="row"
            p_onChange={handleCorreoUser}
            p_value={correoUser}
        />
        <Input
            p_text="Contrasenia"
            p_type="password"
            p_direccion="row"
            p_onChange={handlePasswordUser}
            p_value={passwordUser}
        />
        <Input
            p_text="Contacto"
            p_type="number"
            p_direccion="row"
            p_onChange={handleContactoUser}
            p_value={contactoUser}
        />
        <select name="tipoUser" selected={tipoUser} onChange={(e) => setTipoUser(e.target.value)}>

            <option value={"admin"} onClick={() => setTipoUser("admin")}>Admin</option>
            <option value={"residente"} onClick={() => setTipoUser("residente")}  >Residente</option>
        </select>

        <Input
            p_text="departamento"
            p_type="string"
            p_direccion="row"
            p_onChange={handleDepartamento}
            p_value={departamento}

        />

        <Button
            p_type="submit"
            p_class="okay"
            p_texto="Registrar"
        />

    </form>

}

export default RegisterForm