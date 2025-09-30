import Button from '../Button/Button';
import './CardModal.css';

export default function CardModal({children,p_close})
{
    return (

    <div className='c_cardModal'>
        <div className='c_cardModal-Container'>
            {children}

            <Button
                p_onClick={p_close}
                p_class='warning'
                p_texto='Cancelar'
            />
        </div>
    </div>)
}