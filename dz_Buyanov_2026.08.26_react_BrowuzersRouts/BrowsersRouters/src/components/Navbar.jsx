import { Link } from 'react-router-dom';

export const Navbar = () => {

    return (
        <nav style={{display : 'flex',
                     justifyContent : 'center',
                     alignItems : 'center'
        }}>
            <ul style ={{
                        listStyle : 'none',
                        display : 'flex',
                        gap : '10px'
                        }}>
                <li>
                    <Link to='/'>Главная</Link>
                </li>
                <li>
                    <Link to='/about'>О нас</Link>
                </li>
                <li>
                    <Link to='/contacts'>Контакты</Link>
                </li>
            </ul>
        </nav>
    )
}