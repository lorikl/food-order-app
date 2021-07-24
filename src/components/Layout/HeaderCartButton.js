import classes from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon'
import {useContext, useEffect, useState} from 'react'
import CartContext from '../../store/cart-context'


const HeaderCartButton = (props) => {
    const context = useContext(CartContext)
    const [btn, setBtn] = useState(false)
     
    const numberOfCartItems = context.items.reduce((currentNum, item) =>{
        return currentNum + item.amount
    }, 0)

    const btnClasses = `${classes.button} ${btn ? classes.bump : ""}`

    useEffect(() => {
        if(context.items.length === 0 ){
            return;
        }
        setBtn(true)

        setTimeout(() => {setBtn(false)}, 300)

        return() => {
            clearTimeout()
        }
    }, [context.items])

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span classsName={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
    <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton
