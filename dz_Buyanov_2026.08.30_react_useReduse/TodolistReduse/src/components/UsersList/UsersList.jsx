import { useReducer } from 'react';
import { useState } from 'react';

const UsersData = 
        [ 
            { id: 1, name: 'Иван', active: true },
            { id: 2, name: 'Мария', active: false },
            { id: 3, name: 'Алексей', active: true },
        ];

export const UsersList = () => {
    
    function reduser (state, action){
        switch (action.type) {
            case 'rename' :
                return (state.map(user => user.id === action.payload.id ?
                    { ...user, name : action.payload.name } : user));
            case 'remove' :
                return (state.filter(user => user.id !== action.payload))
            case 'active' :
                return (state.map(user => user.id === action.payload ? 
                    {...user, active : !user.active } : user));
            default :
                return state
            }
    }

    const [users, dispatch] = useReducer(reduser, UsersData);
    const [isEdison, setIsEdison] = useState(false);
    const [value, setValue] = useState('')
    const [name, setName] = useState('')
    
    return (
        <div style={{display : 'flex',
                    flexDirection : 'column',
                    justifyContent : 'start',
                    alignItems : 'start',
                    width : '300px'
        }}>
            <h2>Список пользователей</h2>
            { users.map(user => 
                (<div key={user.id} style={{display : 'flex',
                    flexDirection : 'column',
                    justifyContent : 'start',
                    alignItems : 'start',
                    width : '300px',
                    border : '1px solid green',
                    backgroundColor : 'lightgreen',
                    marginBottom : '10px'
                }}>
                    <span style={{display : 'block',
                                  color : user.active ? 'green' : 'grey'
                                 }}>Имя : {user.name}</span>
                    <div style={{display : 'flex',
                                 marginBottom : '10px'}}>
                        <input 
                        type="text"
                        placeholder='Введите имя'
                        value={ value }
                        onChange={e => setValue(e.target.value)}
                        /> 
                        <button onClick={() => dispatch({type : 'rename', 
                                            payload : {name : value, id : user.id}})}>Сохранить</button>
                     </div>
                     <div style={{ display : 'flex',
                                   gap : '10px'}}>
                        <button onClick={() => dispatch({type : 'active', 
                                        payload : user.id})}>Сделать не активным</button>
                        <button onClick={() => dispatch({type : 'remove',
                                        payload : user.id})}>Удалить</button>
                     </div>
                </div>)
                )
            }
        </div>
    )
} 