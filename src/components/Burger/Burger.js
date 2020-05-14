import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const Burger = ({ingredients}) => {
    

    let transformedIngredients = Object.keys(ingredients).map(igKey => {
        return [...Array(ingredients[igKey]) ].map((_,i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />

        })

    })
    .reduce((acc, cur) => {
        return acc.concat(cur)
    },[])


    return (


        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            
            {transformedIngredients.length === 0 ? <div>Please start adding ingredients</div> : transformedIngredients}
    
             <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default Burger;