import { useState, useContext, createContext, useEffect } from 'react'

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    useEffect(() => {
        const data = localStorage.getItem("cart");
        console.log('data cart to show', data);
        if (data) {
            const parseData = JSON.parse(data);
            console.log('data cart to show', data);

            setCart(
                parseData
            );
            console.log('=====cart to show', cart);

        }
        // eslint-disable-next-line
    }, []);

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    )
}


// custon hook
const useCart = () => useContext(CartContext)

export { useCart, CartProvider };




// import { useState, useEffect, useContext, createContext } from "react";
// import axios from "axios";

// const CartContext  = createContext();
// const CartProvider = ({ children }) => {
//     const [cart, setCart] = useState({
//         user: null,
//         token: "",
//     });

//     //default axios
//     axios.defaults.headers.common["Authorization"] = cart?.token;

//     useEffect(() => {
//         const data = localStorage.getItem("cart");
//         if (data) {
//             const parseData = JSON.parse(data);
//             setCart({
//                 ...cart,
//                 user: parseData.user,
//                 token: parseData.token,
//             });
//         }
//         //eslint-disable-next-line
//     }, []);
//     return (
//         <CartContext .Provider value={[cart, setCart]}>
//             {children}
//         </CartContext .Provider>
//     );
// };

// // custom hook
// const useAuth = () => useContext(CartContext );

// export { useAuth, CartProvider };
