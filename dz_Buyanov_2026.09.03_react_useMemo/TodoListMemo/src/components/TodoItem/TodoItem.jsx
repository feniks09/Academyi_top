import { useState } from 'react'
import { memo } from 'react'

export const TodoItem = memo(({text, status, id, onToggle, onClick}) => {
    console.log('рендер TodoItem')
        return (
        <div
            style={{ display : 'flex',
                gap : '10px',
                marginBottom : '10px'}}>
            <label>
                <input 
                type='checkbox'
                checked={status}
                onChange={() => onToggle(id)}/>
                <span>{text}</span>
            </label>
            <button onClick={() => onClick(id)}>
                Удалить</button>
        </div>)})
        
