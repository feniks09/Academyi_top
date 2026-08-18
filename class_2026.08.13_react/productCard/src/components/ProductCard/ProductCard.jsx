import { useState } from "react";

export const ProductCard = () => {
    const [count, setCount] = useState(0)
    const [color, setColor] = useState('blue')
    const [isExpanded, setExpanded] = useState(true);
    const [isAvailable, setAvailable] = useState(true);
    console.log(count)
    const handleClick = () => {setCount(prev => prev + 1)
    }
        return (
        <div>
            Привет я карточка товара - {count}
            <br />
            <button onClick={handleClick}
                    style = {{
                                backgroundColor: color,
                                color: '',
                                borderRadius: 5
                            }}
                    >нажми на меня
            </button>
        </div>
    )
}