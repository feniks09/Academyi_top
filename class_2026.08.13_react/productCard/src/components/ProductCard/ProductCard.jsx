import { useState } from "react";
import {useEffect } from 'react'

export const ProductCard = () => {

    const product = {name: 'Вино', descript: 'Алкоголь', count: 1}
    const [status, setStatus] = useState('Показать детали');
    const [isExpanded, setExpanded] = useState(true);
    const [isAvailable, setAvailable] = useState(product.count > 0 && true);
    console.log(product.count);

    const color = isAvailable ? 'green' : 'grey';
    const text = isAvailable ? 'Купить' : 'Нет в наличии';
    
    // const handleClick = () => {setAvailable(!isAvailable)}

    const handleClickDescrip = () => { setStatus(status === 'Показать детали' ? 'Скрыть детали' : 'Показать детали')
    }
    
        return (
        <div>
            <h1>{product.name}</h1>
            <button onClick={handleClickDescrip}>{status}</button>
            <p style={{display: status === 'Показать детали' ? 'none' : 'block'}}>{product.descript}</p>
            <br />
            <button 
                    disabled={!isAvailable ? true : false}
                    style = {{
                                backgroundColor: color,
                                color: '',
                                borderRadius: 5,
                            }}
                    >{text}
            </button>
        </div>
    )
}