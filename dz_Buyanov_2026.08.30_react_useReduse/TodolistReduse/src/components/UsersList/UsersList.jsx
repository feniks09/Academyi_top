import { useReduser } from 'react'
import { useState } from 'react';

export const UsersList = () => {
    // const input;
    const UsersData = 
        [ 
            { id: 1, name: 'Иван', active: true },
            { id: 2, name: 'Мария', active: false },
            { id: 3, name: 'Алексей', active: true },
        ]
    
    function reduser (state, active){
        switch (active.type) {
            case 'rename' :
                return state.map(user => user.id === active.payload.id ?
                    { ...user, name : active.payload.name } : user);
            case 'remove' :
                return [state.filter(user => user.id !== active.payload)]
            case 'active' :
                return state.map(user => user.id === active.payload ? 
                    {...user, active : !active } : user);
            default :
                return null
            }
    }

    // const [users, dispatch] = useReduser(reduser, UsersData)
    const [isEdison, setIsEdison] = useState(false)
    const [templeName, setTemleName] = useState('')
    
    return (
        <div>
            <h2>Список пользователей</h2>
            { UsersData.map(user => (
                <div>
                    <input type="text"
                     /> 
                     <button> Изменить </button>
                     <button> Поменять статус</button>
                     <button> Удалить </button>
                     </div>
            ))
                }
        </div>
    )
} 