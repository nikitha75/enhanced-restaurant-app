import './App.css'
import {useState, useEffect, useContext} from 'react'
import CartContext from './context/CartContext'
import {SiSquare} from 'react-icons/si'
import Header from './Header'
import {FaPlus, FaMinus} from 'react-icons/fa'

const Home = () => {
  const [restaurantMenu, setRestaurantMenu] = useState([])
  const [menuList, setMenuList] = useState([])
  const [activeCategory, setActiveCategory] = useState(null)
  const [activeCategoryId, setActiveCategoryId] = useState(null)

  const {
    cartList,
    removeAllCartItems,
    addCartItem,
    removeCartItem,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    handleRestaurantMenuName,
  } = useContext(CartContext)

  const [items, setItems] = useState([])
  const [subItems, setSubItems] = useState([])

  const getRestaurantMenuDetails = async () => {
    try {
      const url =
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
      const options = {
        method: 'GET',
      }
      const response = await fetch(url, options)
      const data = await response.json()
      // console.log('data: ', data)
      setRestaurantMenu(data[0].restaurant_name)
      // handleRestaurantMenuName(data[0]?.restaurant_name)

      setMenuList(data[0].table_menu_list)
      setActiveCategory(data[0]?.table_menu_list[0]?.menu_category)

      setItems(data[0].table_menu_list)
      setSubItems(data[0]?.table_menu_list[0]?.category_dishes)

      setActiveCategoryId(data[0]?.table_menu_list[0]?.menu_category_id)
    } catch (err) {
      console.log(err)
    }
  }

  const handleClickCategory = (categoryName, menuCategoryId) => {
    setActiveCategory(categoryName)
    setActiveCategoryId(menuCategoryId)

    const itms = items.filter(
      category => category.menu_category_id === menuCategoryId,
    )

    setSubItems(itms[0].category_dishes)
  }

  const incrementItemQuantity = dishId => {
    const incrItems = items.map(category =>
      category.menu_category_id === activeCategoryId
        ? {
            ...category,
            category_dishes: category.category_dishes.map(item =>
              item.dish_id === dishId
                ? {...item, quantity: (item.quantity || 0) + 1}
                : item,
            ),
          }
        : category,
    )
    setItems(() => {
      const updatedItems = [...incrItems]
      const itms = updatedItems.filter(
        category => category.menu_category_id === activeCategoryId,
      )
      setSubItems(itms[0].category_dishes)
      return updatedItems
    })
  }

  const decrementItemQuantity = dishId => {
    const decrItems = items.map(category =>
      category.menu_category_id === activeCategoryId
        ? {
            ...category,
            category_dishes: category.category_dishes.map(item =>
              item.dish_id === dishId
                ? {...item, quantity: item.quantity ? item.quantity - 1 : 0}
                : item,
            ),
          }
        : category,
    )
    setItems(() => {
      const updatedItems = [...decrItems]
      const itms = updatedItems.filter(
        category => category.menu_category_id === activeCategoryId,
      )
      setSubItems(itms[0].category_dishes)
      return updatedItems
    })
  }

  useEffect(() => {
    getRestaurantMenuDetails()
  }, [])

  // console.log('subItems: ', subItems)
  // console.log('items: ', items)

  return (
    <div className='container'>
      <Header restaurantMenuName={restaurantMenu} />
      <ul className='menu-list-container list-item'>
        {menuList.map(menu => {
          const {
            category_dishes: categoryDishes,
            menu_category: menuCategory,
            menu_category_id: menuCategoryId,
            menu_category_image: menuCategoryImage,
            nexturl,
          } = menu
          return (
            <li
              key={menuCategoryId}
              className={`${
                activeCategory === menuCategory
                  ? 'menu-list-item menu-list-item-active'
                  : 'menu-list-item'
              }`}
              onClick={() => handleClickCategory(menuCategory, menuCategoryId)}
            >
              <button type='button' className='btn category-container'>
                {menuCategory}
              </button>
            </li>
          )
        })}
      </ul>
      <ul className='list-item'>
        {subItems.map(dish => {
          const {
            addonCat,
            dish_Availability: dishAvailability,
            dish_Type: dishType,
            dish_calories: dishCalories,
            dish_currency: dishCurrency,
            dish_description: dishDescription,
            dish_id: dishId,
            dish_image: dishImage,
            dish_name: dishName,
            dish_price: dishPrice,
            nexturl: dishNexturl,
            quantity,
          } = dish
          return (
            <li key={dishId} className='dish-item-container'>
              <div className='dish-type-container'>
                <SiSquare
                  size='20px'
                  color={`${dishType === 1 ? '#92282a' : 'green'}`}
                />
              </div>
              <div className='dish-container'>
                <h1>{dishName}</h1>
                <p className='dish-price-container'>
                  {dishCurrency} {dishPrice}
                </p>
                <p className='dish-description'>{dishDescription}</p>
                {dishAvailability ? (
                  <>
                    <div className='dish-update-btn'>
                      <button
                        className='btn decr-btn'
                        onClick={() => decrementItemQuantity(dishId)}
                      >
                        -
                      </button>
                      <p>{quantity ? quantity : 0}</p>
                      <button
                        className='btn incr-btn'
                        onClick={() => incrementItemQuantity(dishId)}
                      >
                        +
                      </button>
                    </div>
                    {quantity > 0 && (
                      <div className='add-dish'>
                        <button
                          type='button'
                          onClick={() => addCartItem(dish)}
                          className='btn add-btn'
                        >
                          ADD TO CART
                        </button>
                      </div>
                    )}

                    {addonCat.length > 0 && (
                      <p className='customizations-available'>
                        Customizations available
                      </p>
                    )}
                  </>
                ) : (
                  <p className='not-available'>Not available</p>
                )}
              </div>
              <div className='dish-calories'>{dishCalories} calories</div>
              <div className='dish-img-container'>
                <img src={dishImage} alt={dishName} className='dish-img' />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Home
