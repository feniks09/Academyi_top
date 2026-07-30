import { useEffect, useStat } from "react";

export const TodoList = () => {
    const [todoList, setList] = useState([])
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then((response) => response.json())
        .then((data) => {
            setList(data);
        });
        }, []);
    return (
        <div>
            <span>{data.userId}</span>
            <span></span>
        </div>
    )
} 