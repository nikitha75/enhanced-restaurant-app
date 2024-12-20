import {useContext} from 'react'
import CartContext from './context/CartContext'
import {FaPlus, FaMinus} from 'react-icons/fa'
import './App.css'

const CartItem = ({item}) => {
  const {removeCartItem, incrementCartItemQuantity, decrementCartItemQuantity} =
    useContext(CartContext)

  const {
    dish_Availability,
    dish_Type,
    dish_calories,
    dish_currency,
    dish_description,
    dish_id,
    dish_image,
    dish_name,
    dish_price,
    nexturl,
    quantity,
  } = item

  return (
    <div className='cart-container'>
      <div>
        <img src={dish_image} alt={dish_name} className='cart-dish-img' />
      </div>
      <p>{dish_name}</p>
      <div className='cart-dish-update-btn'>
        <button
          className='btn decr-btn'
          onClick={() => decrementCartItemQuantity(dish_id)}
        >
          -
        </button>
        <p>{quantity ? quantity : 0}</p>
        <button
          className='btn incr-btn'
          onClick={() => incrementCartItemQuantity(dish_id)}
        >
          +
        </button>
      </div>
      <p>Rs {dish_price * quantity} /-</p>
      <div>
        <button
          type='button'
          onClick={() => removeCartItem(dish_id)}
          className='btn remove-btn'
        >
          x
        </button>
      </div>
    </div>
  )
}

export default CartItem
