import {useContext} from 'react'
import CartContext from './context/CartContext'
import CartItem from './CartItem'
import Header from './Header'
import './App.css'

const Cart = () => {
  const {cartList, removeAllCartItems, restaurantMenuName} =
    useContext(CartContext)

  return (
    <div className='cart-list-container'>
      <Header restaurantMenuName={restaurantMenuName} />
      <h1>Cart</h1>
      {cartList.length > 0 ? (
        <>
          <div className='remove-all-btn-container'>
            <button
              type='button'
              onClick={() => removeAllCartItems()}
              className='btn remove-all-btn'
            >
              Remove All
            </button>
          </div>
          <div className='cart-item-container'>
            {cartList.map(item => (
              <CartItem key={item.dish_id} item={item} />
            ))}
          </div>
        </>
      ) : (
        <div>
          <img
            src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png'
            alt='Cart Empty'
          />
        </div>
      )}
    </div>
  )
}

export default Cart
