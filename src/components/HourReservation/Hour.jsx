import React, { useState } from 'react';

function Hour({ onTimeChange, type_hour="inicio"}) {
    // Inicializamos las horas y minutos
    const [hour, setHour] = useState('09');
    const [minute, setMinute] = useState('00');

    // Genera un array de 00 a 23 (horas)
    const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
    // Genera un array de 00 a 55, en intervalos de 5 o 15 minutos
    const minutes = ['00', '15', '30', '45'];

    const handleHourChange = (e) => {
        setHour(e.target.value);
        onTimeChange(`${e.target.value}:${minute}`);
    };

    const handleMinuteChange = (e) => {
        setMinute(e.target.value);
        onTimeChange(`${hour}:${e.target.value}`);
    };

    return (
        <div className="custom-time-picker">
            <p>Seleccione hora de {type_hour}</p>
            <select value={hour} onChange={handleHourChange} className="time-select">
                {hours.map((h) => (
                    <option key={h} value={h}>{h}</option>
                ))}
            </select>
            <span className="separator">:</span>
            <select value={minute} onChange={handleMinuteChange} className="time-select">
                {minutes.map((m) => (
                    <option key={m} value={m}>{m}</option>
                ))}
            </select>
        </div>
    );
}

export default Hour;