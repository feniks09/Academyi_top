const App = () => {
 const submitHandler = (evt) => {
  evt.preventDefault();
  console.log(evt.target.value)
 }
 return( 
  <form onSubmit={submitHandler}>
    Введите имя
    <input />
    <button>Сохранить</button>
  </form>
 )
}

 export default App