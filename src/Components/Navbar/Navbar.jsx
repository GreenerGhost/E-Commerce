import { useCart } from "../CartContext/CartContext";
import "./Navbar.css";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { shoppingCart } = useCart();

  const totalProducts = shoppingCart.reduce( ( cumulativeTotal, item ) => cumulativeTotal + item.cantidad , 0 );

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
        <button className='fas fa-search'></button>

        <Link to="/shopping-cart" className='icon-button'>
          <i className='fas fa-shopping-cart'></i>
          <span className='counter'>{ totalProducts }</span>
        </Link>
      </div>
    </section>
  )
}

export default Navbar
