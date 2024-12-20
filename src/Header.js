import {useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import CartContext from './context/CartContext'
import Cookies from 'js-cookie'
import './App.css'

const Header = ({restaurantMenuName}) => {
  const {cartList} = useContext(CartContext)

  const cartCount = cartList.length
  const history = useHistory()

  const handleLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
    console.log('logout')
  }

  return (
    <div className='top-section'>
      <Link to='/' className='link-item'>
        <h1>{restaurantMenuName}</h1>
      </Link>
      <div className='header-cart-container'>
        <p>My Orders</p>
        <Link to='/cart' className='link-item cart-icon-container'>
          <p className='cart-count'>{cartCount}</p>
          <AiOutlineShoppingCart
            size='25px'
            data-testid='cart'
            className='cart-icon'
          />
        </Link>
      </div>
      <div>
        <button type='button' onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Header
