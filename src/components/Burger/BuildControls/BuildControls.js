import React from 'react';
import BuildControl from '../BuildControls/BuildControl/BuildControl';
import  '../../../App.css';


const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
    
];
const styles = {
    
        width: '100%',
        backgroundColor: '#cf8f2e',
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        boxShadow: '0 2px 1px #ccc',
        margin: 'auto',
        padding: '10px 0'

}





const BuildControls = ({ ingredientAdded, ingredientRemoved, disabled, price, purchaseable, ordered }) => {
    return (
        <div style={styles}>
            <p>Current Price: <strong>{price.toFixed(2)}</strong></p>
            {controls.map(ctrl => (
                <BuildControl key={ctrl.label} label={ctrl.label}
                    added={() => ingredientAdded(ctrl.type)}
                    removed={() => ingredientRemoved(ctrl.type)}
                    disabled={disabled[ctrl.type]}
                />
            ))}
            <button onClick={ordered} className="OrderButon" disabled={!purchaseable}>ORDER NOW</button>
 
        </div>
    )
}

export default BuildControls;