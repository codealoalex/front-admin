import { Password } from 'primereact/password';

export default function InputPwd({value, setValue}) {
    return (
        <div className="card flex justify-content-center">
            <Password value={value} onChange={(e) => setValue(e.target.value)} toggleMask />
        </div>
    )
}
