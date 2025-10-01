import './InputPwd.css';

import { Password } from 'primereact/password';

export default function InputPwd({value, setValue, texto, id}) {
    return (
        <div className="card flex justify-content-center" style={{display:'flex', flexDirection:'column', gap:'5px'}}>
            <label htmlFor={id}>{texto}</label>
            <Password id={id} value={value} onChange={(e) => setValue(e.target.value)} toggleMask />
        </div>
    )
}
