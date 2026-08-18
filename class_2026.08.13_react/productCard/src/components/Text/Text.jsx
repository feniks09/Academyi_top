import { useState } from 'react'
export const Text = () => {
    const [text, setText] = useState("Техт начала");
    const [color, setColor] = useState('black')

    const NewText = text === 'Техт начала' ? 'Компанент Text в деле': 'Техт начала';
    const newColor = color === 'black' ? 'red' : 'black'

    const handleClick = () =>{
        setText(NewText);
        setColor(newColor)
    }
    return (
        <div>
            <span style={{ color: color }}>{text}</span>
            <br/>
            <button onClick={handleClick}
                    style={{backgroundColor: 'blue',
                            borderRadius: '5px'
                    }}>меняю техт по желанию
            </button>
        </div>)
}