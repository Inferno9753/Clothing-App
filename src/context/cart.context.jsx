import { createContext,useState,useEffect } from "react";

const addCartItem=(cartItems,productToAdd)=>{
    const existingCartItem=cartItems.find(
        (cartItem)=>cartItem.id===productToAdd.id
    );

    if(existingCartItem)
    {
        return cartItems.map((cartItem)=>
            cartItem.id===productToAdd.id?{...cartItem,quantity:cartItem.quantity+1}:
            cartItem
        )
    }

    return [...cartItems,{...productToAdd,quantity:1}];
}
const removeItem=(cartItems,cartItemToRemove)=>{
    const existingCartItem=cartItems.find(
        (cartItem)=>cartItem.id===cartItemToRemove.id
    );

    if(existingCartItem.quantity===1)
    {
        return cartItems.filter(cartItem=>cartItem.id!==cartItemToRemove.id);
    }

    return cartItems.map((cartItem)=>
            cartItem.id===cartItemToRemove.id?{...cartItem,quantity:cartItem.quantity-1}:
            cartItem
        );
}

const clearCart=(cartItems,clearItem)=>{
    return cartItems.filter((cartItem)=>cartItem.id!==clearItem.id);
}

export const CartContext=createContext({
    isCartOpen:false,
    setIsCartOpen:()=>{},
    cartItems:[],
    addItemToCart:()=>{},
    removeItemFromCart:()=>{},
    clearItemFromCart:()=>{},
    cartCount:0,
    totalCount:0
})

export const CartProvider=({children})=>{
    const [isCartOpen,setIsCartOpen]=useState(false);
    const [cartItems,setCartItems]=useState([]);
    const [cartCount,setCartCount]=useState(0);
    const [totalCount,setTotalCount]=useState(0);

    useEffect(()=>{
        const newCartCount=cartItems.reduce((total,cartItem)=>total+cartItem.quantity,0)
        setCartCount(newCartCount)
    },[cartItems])

    useEffect(()=>{
        const newSum=cartItems.reduce((total,cartItem)=>total+cartItem.quantity*cartItem.price,0)
        setTotalCount(newSum)
    },[cartItems])

    const addItemToCart=(productToAdd)=>{
        setCartItems(addCartItem(cartItems,productToAdd));
    }
    const removeItemFromCart=(cartItemToRemove)=>{
        setCartItems(removeItem(cartItems,cartItemToRemove));
    }
    const clearItemFromCart=(clearItem)=>{
        setCartItems(clearCart(cartItems,clearItem));
    }

    const value={isCartOpen,setIsCartOpen,addItemToCart,removeItemFromCart,clearItemFromCart,cartItems,cartCount,totalCount}
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}