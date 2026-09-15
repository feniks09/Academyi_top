export const UserStatus = ({ isLoggedIn }) => {
    console.log(isLoggedIn ? 'Пользователь в системе' : 'Пользователь вышел из системы')
    return ( 
            <div>
            {isLoggedIn ? (
                <div>
                    <p>Добро пожаловать, пользователь!</p>
                    <button>Выйти</button>
                </div>
                
            ) : (
                <button>Войти</button>
            )}
            
            </div>)}

