import { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

export default function Modal({ accion, accion_desc, contenido, usuario, color, icon, tipo}) {

    const [visible, setVisible] = useState(false);
    const [realizar, setRealizar] = useState(false);

    const handleRealizar = (valor) => {
        setRealizar(valor)
    }

    const eliminarDefinitivamente = async (usuario) => {
        handleRealizar(true);
        if (visible && realizar)
            try {
                const conexion = await fetch(`http://localhost:10000/api/administrador/eliminar-${tipo}/:${usuario}`, {
                    method: 'DELETE',
                    credentials: 'include'
                });
                if (!conexion.ok) throw new Error();
                const datos = await conexion.json();
                alert(datos.message);
                location.href = 'panel-admin';
            } catch (e) {
                console.error(e.message);
            }
    }

    const footerContent = (
        <>{
            accion == 'Eliminar' &&
            <div>
                <Button label="Sí" icon="pi pi-check" onClick={() => {
                    eliminarDefinitivamente(usuario)
                }} autoFocus severity="danger"/>
                <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" severity="contrast"/>

            </div>
        }
        </>
    );

    return (
        <div className="card flex justify-content-center">
            <Button label={accion} icon={`pi pi-${icon}`} onClick={() => setVisible(true)} className={`btn-opcion-modal ${color}`} severity={color} />
            <Dialog header={accion_desc} visible={visible} style={{ width: '90vw' }} onHide={() => { if (!visible) return; setVisible(false); }} footer={footerContent}>
                <div className="m-0">
                    {contenido}
                </div>
            </Dialog>
        </div>
    )
}
