import { useState } from "react";
import { useEffect } from 'react';

export const ProductCard = ({name, discript, count, children}) => {

    const [isExpanded, setExpanded] = useState(false);
    const [isAvailable, setAvailable] = useState(count > 0 && true);
    console.log(count);

    const color = isAvailable ? 'green' : 'grey';
    const text = isAvailable ? 'Купить' : 'Нет в наличии';
    const status = isExpanded ? 'Скрыть детали' : 'Показать детали'

    const handleClickDescrip = () => { 
        setExpanded(!isExpanded)
    }
        return (
        <div style={{width: '400px',
                     height: isExpanded ? 300 : 200,
                     margin: '0 auto',
                     overflow: 'hidden'
        }}>
            <button onClick={ () => setAvailable(!isAvailable)}>Управлениие наличием товара</button>
            <h1 style={{color: 'red'}}>{name}</h1>
            {children}
            <button onClick={handleClickDescrip}>{status}</button>
            <p style={{
                display: status === 'Показать детали' ? 'none' : 'block'
            }}>{discript}</p>
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