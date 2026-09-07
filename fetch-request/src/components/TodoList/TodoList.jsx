import { useEffect, useState } from "react";

export const TodoList = () => {
    const [todoList, setList] = useState([])
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then((response) => response.json())
        .then((data) => {setList(data)
        // .catch(error => console.error("ошибка", error));

            console.log(data)
            console.log(data[0])
            console.log(data[0].id)
            console.log(data[0].userId)})
            },[]);
        return (
            <div style={{ width: '600px',
                         margin: '0 auto',}}>
                { todoList.map((todo) => 
                     (<div key={todo.id}
                     style={{ border: '1px solid red',
                              height: '20px',
                              width: 'auto',
                              textAlign: 'center',
                     }}>
                        <span>{`${todo.id}. ${todo.title}`}</span>
                     </div>)
                )}
            </div>
                )}
