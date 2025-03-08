import { useCart } from "../CartContext/CartContext";
import "./Navbar.css";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ( { toggleSearch } ) => {
  const { shoppingCart } = useCart();

  const navigate = useNavigate();

  const totalProducts = shoppingCart.reduce( ( cumulativeTotal, item ) => cumulativeTotal + item.cantidad , 0 );

  const handleHome = () => {
    toggleSearch(); // se invoca la función para mostrar o ocultar el buscador
    navigate('/'); // se invoca la función para navegar a la página de inicio
  }

  return (
    <section className='header'>
      <h1 className='logo'> TR<span>ENDY</span></h1>
      <nav className='navbar'>
        <ul className='navbar-links'>
          <li className='navbar-item'>
            <Link to='/' className='nav-link'>Home</Link>
          </li>
        </ul>
      </nav>

      <div className="icons">
        <button 
          className='search-button'
          onClick={ handleHome }
        >
          <i className='fas fa-search'></i>
        </button>

        <Link to="/shopping-cart" className='icon-button'>
          <i className='fas fa-shopping-cart'></i>
          <span className='counter'>{ totalProducts }</span>
        </Link>
      </div>
    </section>
  )
}

export default Navbar
