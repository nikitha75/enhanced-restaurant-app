import {useState} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import CartContext from './context/CartContext'
import ProtectedRoute from './ProtectedRoute'
import Home from './Home'
import Login from './Login'
import Cart from './Cart'
import Header from './Header'
import './App.css'

const App = () => {
  const [cartList, setCartList] = useState([])
  const [restaurantMenuName, setRestaurantMenuName] = useState('')
  // const [cartTotal, setCartTotal] = useState(0)

  const removeAllCartItems = () => {
    setCartList([])
    // setCartTotal(0)
  }

  const addCartItem = item => {
    setCartList(prevState => {
      const existingItem = prevState.find(
        product => product.dish_id === item.dish_id,
      )
      if (!existingItem) {
        return [...prevState, {...item, quantity: 1}]
      }
      return prevState
    })

    // setCartTotal(prevState => prevState + 1)
  }

  const removeCartItem = itemId => {
    setCartList(prevState => prevState.filter(item => item.dish_id !== itemId))
    // setCartTotal(prevState => prevState - 1)
  }

  const incrementCartItemQuantity = itemId => {
    setCartList(prevState => {
      return prevState.map(item =>
        item.dish_id === itemId ? {...item, quantity: item.quantity + 1} : item,
      )
    })
    // setCartTotal(prevState => prevState + 1)
  }

  const decrementCartItemQuantity = itemId => {
    setCartList(prevState =>
      prevState
        .map(item =>
          item.dish_id === itemId
            ? {
                ...item,
                quantity:
                  item.quantity > 1
                    ? item.quantity - 1
                    : removeCartItem(item.dish_id),
              }
            : item,
        )
        .filter(item => item.quantity > 0),
    )
    // setCartTotal(prevState => prevState - 1)
  }

  const handleRestaurantMenuName = restaurantName => {
    setRestaurantMenuName(restaurantName)
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        removeAllCartItems,
        addCartItem,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        restaurantMenuName,
        handleRestaurantMenuName,
      }}
    >
      <Switch>
        <Route exact path='/login' component={Login} />
        <ProtectedRoute exact path='/' component={Home} />
        <ProtectedRoute exact path='/cart' component={Cart} />
      </Switch>
    </CartContext.Provider>
  )
}

export default App
