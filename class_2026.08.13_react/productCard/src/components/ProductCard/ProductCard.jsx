import { useState } from "react";

export const ProductCard = () => {
    const [count, setCount] = useState(0)
    const [color, setColor] = useState('grey')
    const [text, setText] = useState('Купить')
    const [status, setStatus] = useState('Показать')
    const [isExpanded, setExpanded] = useState(true);
    const [isAvailable, setAvailable] = useState(true);
    console.log(count)
    // setColor(isAvailable ? 'green': 'grey');
    // setText(isAvailable ? 'Купить' : 'Нет в наличии');
    
    const handleClick = () => {setAvailable(!isAvailable);
        setColor(isAvailable ? 'green': 'grey')

    const handleClickDescrip = () => { setStatus(status === 'Показать' ? 'Скрыть' : 'Показать')}
    }
        return (
        <div>
            <h1>название товара</h1>
            <button onClick={handleClickDescrip}>{status}</button>
            <p style={{display: false}}>описание товара</p>
            <br />
            <button onClick={handleClick}
                    disabled={!isAvailable}
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