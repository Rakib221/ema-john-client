import React from 'react';
import {useState, useEffect} from 'react';
import {getDatabaseCart, removeFromDatabaseCart, processOrder} from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart,setCart] = useState([]);
    const [orderPlaced,setOrderPlaced] = useState(false);

    const history = useHistory();
    const handleProceedCheckout = () =>{
        history.push('/Shipment');
    }
    const removeProduct = (productKey) => {
        const newCart =  cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        
        fetch('https://dry-basin-09706.herokuapp.com/productsByKeys',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(response => response.json())
        .then(data => setCart(data))
        
    },[]);

    let thankYou;
    if (orderPlaced) {
        thankYou = <img src={happyImage}/>
    }

    return (
        <div className='m-5 row'>
            <div className='col-lg-8'>
            {
                cart.map(pd=><ReviewItem product={pd} removeProduct={removeProduct} key={pd.key}></ReviewItem>)
            }
            {thankYou}
            </div>
            <div className="col-lg-4">
            <Cart cart = {cart}>
                <button className="bg-danger p-2 rounded text-white border-0" onClick = {handleProceedCheckout}>
                    Proceed Checkout
                </button>
            </Cart>
            </div>
        </div>
    );
};

export default Review;