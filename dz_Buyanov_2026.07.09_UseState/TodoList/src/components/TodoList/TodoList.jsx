import { useState } from 'react'

export const TodoList = () => {
    
  const [tacks, setTacks] = useState([]);
  const [input, setInput] = useState('');

  const ToggleCompleted = (id) => {
    setTacks(prev => 
      prev.map(tack => 
        id === tack.id ? { ...tack, complete : !tack.complete } : tack
      ));    
  }
  const deleteTacks = (id) =>
    setTacks(tacks.filter(tack => tack.id !== id))

  const handlerClick = () => {
    if (!input.trim()) return;

    const newTack = {
      id : crypto.randomUUID(),
      text : input,
      complete : false,
    }
    setTacks(prev =>[...prev, newTack])
    setInput("")
  }
  const totalCount = tacks.length;
  const completeCount = tacks.filter(tack => tack.complete).length
  return (
    <div>
      <h2>Список задач</h2>
      <input 
      type="text"
      placeholder='Введите задачу' 
      value ={input}
      onChange={event => setInput(event.target.value)}
      onKeyDown={e => e.key === 'Enter' && handlerClick()}/>
  
      <button onClick={handlerClick}>Добавить</button>
      {totalCount > 0 && 
      (<div> {`Выполнено ${completeCount} из ${totalCount}`} </div>)}
      <div style={{display : "flex",
                  flexDirection : 'column',
                  alignItems : 'start'
                }}>
        { tacks.length > 0 ?
        tacks.map(tack => {
          return (
          <label key={tack.id}>
            <input 
            type= "checkbox"
            checked={ tack.complete }
            onChange ={() => ToggleCompleted(tack.id)}
            />
            <span>{ tack.text }</span>
            <button onClick={() => deleteTacks(tack.id)}>Удалить</button>
          </label>) 
          }) : <span>{'нет задач'}</span>}
      </div>
    </div>
  )}
