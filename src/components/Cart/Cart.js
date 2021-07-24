import classes from './Cart.module.css'
import React, {useContext} from 'react'
import Modal from '../UI/Modal'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'

const Cart = (props) => {
    const context = useContext(CartContext)

    const totalAmount = `$${context.totalAmount.toFixed(2)}`
    const hasItems = context.items.length > 0

    const cartItemRemoverHandler = id => {
        context.removerItem(id)
    }

    const cartItemAddHandler = item => {
        context.addItem({...item,amount: 1})
    }

    const cartItems = <ul className={classes['cart-items']}>
        {context.items.map(item => (
            <CartItem 
            key={item.id} 
            name={item.name} 
            amount={item.amount} 
            price={item.price}
            onRemove={cartItemRemoverHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
            />
        ))}
    </ul>

    return (
        <Modal onClose={props.onCloseModal}>
            {cartItems}
            <div className={classes.total}>
                <spam>Total Amount</spam>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onCloseModal}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
}

export default Cart
