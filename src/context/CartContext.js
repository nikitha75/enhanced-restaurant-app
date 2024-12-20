import React, {useState} from 'react'

const CartContext = React.createContext({
  cartList: [],
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  restaurantMenuName: '',
  handleRestaurantMenuName: () => {},
})

export default CartContext
