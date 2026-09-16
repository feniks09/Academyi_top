import { useState } from 'react'
import { TodoItem } from './components/TodoItem/TodoItem'

function App() {

  const [value, setValue] = useState('')
  const [listItems, setListItems] = useState([])

  const addItem = (text) => {
    if (!text.trim()) return; 
    const Newitems = {
      id : Date.now(),
      text : text,
      status : false
    };
    setListItems(prev => [...prev, Newitems]);
    setValue('');
  }

  const removeItem = (id) => setListItems(listItems.filter(item => item.id !== id))

  const toggleCompleted = (id) => setListItems(prev => 
    prev.map(item => item.id === id ? {...item, status : !item.status} : item) ) 


    return ( 
        <div style={{display : 'flex',
                    flexDirection : 'column',
                    alignItems : 'start'}}>

            <div style={{display : 'flex'}}>
                <input 
                type="text"
                placeholder='Введите текст задачи'
                value={value}
                onChange={(e) => setValue(e.target.value)}/>

                <button onClick={() => {
                  addItem(value)
                  }}>Сохранить</button>
            </div>      
            <div>
                {listItems.map(item => (
                  <TodoItem key={item.id}
                            text={item.text} 
                            status = {item.status}
                            id = {item.id}
                            onClick={() => removeItem(item.id)}
                            onToggle={() => toggleCompleted(item.id)} />
                  )
                )}
              </div>
        </div>
        )
}

export default App
