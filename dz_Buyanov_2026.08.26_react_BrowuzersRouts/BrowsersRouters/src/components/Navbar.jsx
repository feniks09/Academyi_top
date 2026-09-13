import { Link } from 'react-router-dom';

export const Navbar = () => {

    return (
        <nav >
            <ul>
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