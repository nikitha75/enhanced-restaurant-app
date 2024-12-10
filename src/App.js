import "./App.css";
import { useState, useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { SiSquare } from "react-icons/si";
import { FaPlus, FaMinus } from "react-icons/fa";

const url = process.env.REACT_APP_URL;

const App = () => {
  const [restaurantMenu, setRestaurantMenu] = useState([]);
  const [menuList, setMenuList] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const getRestaurantMenuDetails = async () => {
    try {
      const options = {
        method: "GET",
      };
      const response = await fetch(url, options);
      const data = await response.json();
      setRestaurantMenu(data);
      setMenuList(data[0].table_menu_list);
      setActiveCategory(data[0]?.table_menu_list[0]?.menu_category);
      setDishes(data[0]?.table_menu_list[0]?.category_dishes);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickCategory = (categoryName, categoryDishes) => {
    setActiveCategory(categoryName);
    setDishes(categoryDishes);
  };

  const addItemToCart = (dish) => {
    const itemId = cart.findIndex(
      (cartItem) => cartItem.dish_id === dish.dish_id
    );
    if (itemId !== -1) {
      const updatedCart = cart.map((cartItem, index) =>
        index === itemId
          ? { ...cartItem, count: (cartItem.count || 0) + 1 }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...dish, count: 1 }]);
    }

    setDishes((prevDishes) => {
      const existingDish = prevDishes.find((d) => d.dish_id === dish.dish_id);
      if (existingDish) {
        return prevDishes.map((d) =>
          d.dish_id === dish.dish_id ? { ...d, count: (d.count || 0) + 1 } : d
        );
      }
      return [...prevDishes, { ...dish, count: 1 }];
    });
  };

  const removeItemFromCart = (dishId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.dish_id === dishId
      );
      if (existingItem) {
        const updatedCart = prevCart.map((cartItem) =>
          cartItem.dish_id === dishId
            ? {
                ...cartItem,
                count: cartItem.count > 0 ? cartItem.count - 1 : 0,
              }
            : cartItem
        );
        return updatedCart;
      }
      return prevCart;
    });

    setDishes((prevDishes) => {
      const existingDish = prevDishes.find((d) => d.dish_id === dishId);
      if (existingDish) {
        return prevDishes.map((d) =>
          d.dish_id === dishId
            ? { ...d, count: d.count > 0 ? d.count - 1 : 0 }
            : d
        );
      }
      return prevDishes;
    });
  };

  const getTotalCartCount = () => {
    return cart.reduce((total, cartItem) => total + cartItem.count, 0);
  };

  useEffect(() => {
    getRestaurantMenuDetails();
  }, []);

  useEffect(() => {
    setCartCount(getTotalCartCount());
  }, [cart]);

  return (
    <div className="container">
      <div className="top-section">
        <h1>{restaurantMenu[0]?.restaurant_name}</h1>
        <div className="cart-container">
          <p>My Orders</p>
          <div className="">
            <p className="cart-count">{cartCount}</p>
            <AiOutlineShoppingCart size="25px" />
          </div>
        </div>
      </div>
      <ul className="menu-list-container list-item">
        {menuList.map((menu) => {
          const {
            category_dishes: categoryDishes,
            menu_category: menuCategory,
            menu_category_id: menuCategoryId,
            menu_category_image: menuCategoryImage,
            nexturl,
          } = menu;
          return (
            <li
              key={menuCategoryId}
              className={`${
                activeCategory === menuCategory
                  ? "menu-list-item menu-list-item-active"
                  : "menu-list-item"
              }`}
              onClick={() => handleClickCategory(menuCategory, categoryDishes)}
            >
              <div className="category-container">{menuCategory}</div>
            </li>
          );
        })}
      </ul>
      <ul className="list-item">
        {dishes.map((dish) => {
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
            count,
          } = dish;
          return (
            <li key={dishId} className="dish-item-container">
              <div className="dish-type-container">
                <SiSquare
                  size="20px"
                  color={`${dishType === 1 ? "#92282a" : "green"}`}
                />
              </div>
              <div className="dish-container">
                <h3>{dishName}</h3>
                <p className="dish-price-container">
                  {dishCurrency} {dishPrice}
                </p>
                <p className="dish-description">{dishDescription}</p>
                {dishAvailability ? (
                  <>
                    <div className="dish-update-btn">
                      <button
                        className="btn add-btn"
                        onClick={() => removeItemFromCart(dishId)}
                      >
                        <FaMinus color="#ffffff" />
                      </button>
                      <p>{count ? count : 0}</p>
                      <button
                        className="btn remove-btn"
                        onClick={() => addItemToCart(dish)}
                      >
                        <FaPlus color="#ffffff" />
                      </button>
                    </div>
                    {addonCat.length > 0 && (
                      <p className="customizations-available">
                        Customizations available
                      </p>
                    )}
                  </>
                ) : (
                  <p className="not-available">Not available</p>
                )}
              </div>
              <div className="dish-calories">{dishCalories} calories</div>
              <div className="dish-img-container">
                <img src={dishImage} alt={dishName} className="dish-img" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
