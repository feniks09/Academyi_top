import { useContext } from "react"
import { AutoContext } from '../../App'
import { useState } from "react"

export const Layout = () => <PageMain />

const PageMain = () => <Authorization />

const Authorization = () => {
    const [value, setValue] = useState('')
    const {name, login, logout} = useContext(AutoContext)

    return (
        <div>
            <h2>Панель пользователя</h2>
            <span  style = {{display : 'block'}}> {name && `Привет, ${name}!`} </span>
            {!name && <input
            type="text"
            placeholder="Введите имя..."
            value={ value }
            onChange = {(e) => { setValue(e.target.value) }}/>}

            <button onClick={() => {
                if (!name) {
                    login(value);
                    setValue('');}
                else { 
                    logout()
                }
                }}>{!name ? 'Вход' : 'Выход' }</button>
            
        </div>
    )
}