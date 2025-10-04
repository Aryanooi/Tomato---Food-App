import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
    const [carItems, setCarItems] = useState({});
    const URL = "http://localhost:5000";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);
    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"));

            }
        }
        loadData();
    }, [])

    const addToCart = async (itemId) => {
        if (!carItems[itemId]) {
            setCarItems((prev) => ({ ...prev, [itemId]: 1 }))
        } else {
            setCarItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(URL + "/api/cart/add", { itemId }, { headers: { token } });
        }
    }

    const removeFromCart = async (itemId) => {
        setCarItems(setCarItems((prev) => {
            const newCarItems = { ...prev };
            if (newCarItems[itemId] === 1) {
                delete newCarItems[itemId];
            } else {
                newCarItems[itemId] -= 1;
            }
            return newCarItems;
        }))
        if (token) {
            await axios.post(URL + "/api/cart/remove", { itemId }, { headers: { token } });

        }
    }
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in carItems) {
            if (carItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * carItems[item];
                }
            }
        }
        return totalAmount;
    }
    const fetchFoodList = async () => {
        const response = await axios.get(URL + "/api/food/list");
        setFoodList(response.data.foods);
    }
    const loadCartData = async (token) => {
        const response = await axios.post(URL + "/api/cart/get", {}, { headers: { token } });
        setCarItems(response.data.cartData);
    }
    const contextValue = {
        setFoodList, food_list, URL, carItems, setCarItems, addToCart, removeFromCart, getTotalCartAmount, token, setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;