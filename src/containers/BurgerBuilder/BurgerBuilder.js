import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

 class BurgerBuilder extends Component {
     
     state = {
         ingredients: {
             salad: 1,
             bacon: 0,
             cheese: 0,
             meat: 0
         },
         totalPrice: 4,
         purchaseable: false,
         purchasing: false,
         loading: false
     }

     updatePurchaseState = (ingredients) => {
         
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        })
         .reduce((acc,cur) => {
             return acc + cur
         }, 0)
         this.setState({ purchaseable: sum > 0 });
     }

     addIngredientHandler = (type) => {
         const oldCount = this.state.ingredients[type];
         const updatedCount = oldCount + 1;
         const updatedIngredients = { ...this.state.ingredients }
         updatedIngredients[type] = updatedCount;

         const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

         this.setState({
             ingredients: updatedIngredients,
             totalPrice: newPrice
         })

         this.updatePurchaseState(updatedIngredients)
     }
     
     removeIngredientHandler = (type) =>{
         const oldCount = this.state.ingredients[type];
         if(oldCount <= 0) {
             return;
         }
         const updatedCount = oldCount- 1;
         const updatedIngredients = { ...this.state.ingredients }
         updatedIngredients[type] = updatedCount;

         const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

         this.setState({
             ingredients: updatedIngredients,
             totalPrice: newPrice
         })
         this.updatePurchaseState(updatedIngredients)
 
     }

     purchaseHandler = ()=> {
         this.setState({ purchasing: true })
    }

     purchaseCancelHandler = () => {
         this.setState({purchasing : false})
     }
     purchaseContinueHandler = () => {
         this.setState({ loading: true });
         
         const order = {
             ingredients: this.state.ingredients,
             price: this.state.totalPrice,
             customer: {
                 name: 'Femi Akinsiku',
                 address: {
                     street: 'Teststreet 1',
                     zipCode: '41351',
                     country: 'Canada'
                 },
                 email: 'test@test.com'
             },
             deliveryMethod: 'fastest'

         }
         console.log(order)
         axios.post('/orders.json', order)
             .then(response => {
                 this.setState({ loading: false , purchasing:false });
             })
             .catch(error => {
                 this.setState({ loading: false , purchasing:false });
             })

     }
      
     
     render() {
         const disabledInfo = {
             ...this.state.ingredients
         }
        //  loop through all the keys in disable info
        //  {salad: true, meat: false, etc}
         for(let key in disabledInfo){
             disabledInfo[key] = disabledInfo[key] <= 0
         }

         let orderSummary = <OrderSummary ingredients={this.state.ingredients} purchaseCanceled={this.purchaseCancelHandler} purchaseContinued={this.purchaseContinueHandler} price={this.state.totalPrice} />
         
         if(this.state.loading){
             
             orderSummary = <Spinner />;
         }
         
         return (
             <Aux>
                 
                 <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                     {orderSummary}
                 </Modal> 
                
                 <Burger ingredients={this.state.ingredients} />
                 <BuildControls
                     ingredientAdded={this.addIngredientHandler}
                     ingredientRemoved={this.removeIngredientHandler}
                     disabled={disabledInfo}
                     purchaseable={this.state.purchaseable}
                     price={this.state.totalPrice}
                     ordered = {this.purchaseHandler}
                 />

             </Aux>
         )
     }
 }
 
export default withErrorHandler(BurgerBuilder);