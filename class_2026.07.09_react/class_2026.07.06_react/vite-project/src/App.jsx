
const App = () => {
  const submitHandler = (evt) => {
  evt.preventDefault();
  const rez = Array.form(event.target);
  console.log(rez);
   }
  return(
    <form onSubmit={submitHandler}>
      введите имя
    <input />
    <button>Сохранить</button>
    </form>
  )
}

export default App