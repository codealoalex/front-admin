
import Card from '../../components/Card/Card'
import Title from '../../components/Title/Title'
import logoAbitare from '../../assets/img/logoAbitare.png'
import RegisterForm from './RegisterForm'


export function Register()
{
    return <Card>
        <img src={logoAbitare} alt="Esto es el logo" style={{ width: 100 }} />
        <Title p_text='Registro' p_sz={3} />
        <Title p_text='Ingresa los datos del nuevo usuario' p_sz={2} />
        <RegisterForm/>

    </Card>

}

export default Register