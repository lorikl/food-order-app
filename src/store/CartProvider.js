import React, {useReducer} from 'react'
import CartContext from './cart-context'

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if(action.type === 'ADD'){
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount
        const exsistingCartItemIndex = state.items.findIndex(item => item.id === action.item.id)
        const exsistingCartItem = state.items[exsistingCartItemIndex]
        let updatedItem
        let updatedItems
        if (exsistingCartItem){
            updatedItem = {
                ...exsistingCartItem,
                amount: exsistingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items]
            updatedItems[exsistingCartItemIndex] = updatedItem
        } else {
            updatedItem = {...action.item}
            updatedItems = state.items.concat(updatedItem)
        }
        return{
            items: updatedItems,
            totalAmount: updatedTotalAmount            
        }
    }
    if (action.type === 'REMOVE'){ 
        const exsistingCartItemIndex = state.items.findIndex(item => item.id === action.id)
        const exsistingItem = state.items[exsistingCartItemIndex]
        const updatedTotalAmount = state.totalAmount - exsistingItem.price
        let updatedItems
        if (exsistingItem.amount === 1){
            updatedItems = state.items.filter( item => item.id !== action.id)
        }else{
            const updatedItem = {...exsistingItem, amount: exsistingItem.amount - 1 }
            updatedItems = [...state.items]
            updatedItems[exsistingCartItemIndex] = updatedItem
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    return defaultCartState
}

const CartProvider = props => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemToCartHandler = item => {
        dispatchCartAction({type: 'ADD', item:item})
    }

    const removeItemFromCartHandler = id => {
        dispatchCartAction({type: 'REMOVE',id:id})
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removerItem:removeItemFromCartHandler
    }
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider
