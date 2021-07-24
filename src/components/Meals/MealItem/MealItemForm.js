import classes from './MealItemForm.module.css'
import React, {useRef, useState} from 'react'
import Input from '../../UI/Input'

const MealItemForm = (props) => {
    const ref = useRef()
    const [amountIsValid, setamountIsValid] = useState(true)

    const submitHandler = event => {
        event.preventDefault()
        const enteredAmount = ref.current.value
        const enteredAmountNumber = +enteredAmount

        if (enteredAmount.trim().length === 0 || enteredAmountNumber <1 || enteredAmountNumber>5){
            setamountIsValid(false)
            return
        }

        props.onAddToCart(enteredAmountNumber)
    }
    return (
        <form className={classes.form} onSubmit={submitHandler}>
           <Input 
           ref={ref}
           label='Amount' 
           input={{
               id: 'amount',
               type: 'number',
               min: '1',
               max: '5',
               step: '1',
               defaultValue: '1'
           }}/> 
           <button>+ Add</button>
           {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
        </form>
    )
}

export default MealItemForm
