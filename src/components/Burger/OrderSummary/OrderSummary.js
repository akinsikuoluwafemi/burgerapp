import React, { Component } from 'react'

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
   //WARNING! To be deprecated in React v17. Use componentDidUpdate instead.
   componentWillUpdate(nextProps, nextState) {
       
   }

    render(){
        
        const { ingredients, purchaseCanceled, purchaseContinued, price} = this.props;

            const ingredientSummary = Object.keys(ingredients).map(igKey => {
            return <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}</span> : {ingredients[igKey]}</li>
        })

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients: </p>

                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {price.toFixed(2)} </strong></p>
                <p>Continue to checkout</p>
                <Button btnType="Danger" clicked={purchaseCanceled}>Cancel</Button>
                <Button btnType="Success" clicked={purchaseContinued} >Continue</Button>

            </Aux>
        )
    }
}



export default OrderSummary;