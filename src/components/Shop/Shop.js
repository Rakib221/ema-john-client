import React from 'react';
import { useState,useEffect } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import {addToDatabaseCart,getDatabaseCart} from '../../utilities/databaseManager';
import {Link} from 'react-router-dom';

const Shop = () => {
    // const first10 = fakeData.slice(0,10);
    const [products,setProducts] = useState([]);

    useEffect(() =>{
        fetch('https://dry-basin-09706.herokuapp.com/products')
        .then(response => response.json())
        .then(data => setProducts(data))
    },[])

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
    const [cart,setCart] = useState([]);
    const handleAddProduct = (product) =>{
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd=>pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd=>pd.key !== toBeAddedKey);
            newCart = [...others,sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart,product];
        }
        setCart(newCart);
        addToDatabaseCart(toBeAddedKey,count);
        // console.log(addToDatabaseCart);
    }
    return (
        <div className="row m-3">
            <div className="col-lg-8">
            {
                products.map(product =><Product key={product.key} showAddToCart = {true} handleAddProduct = {handleAddProduct} product = {product}></Product>)
            }
            </div>
            <div className="col-lg-4">
                <div>
                    <Cart cart = {cart}>
                        <Link to="/review"><button className='border-0 bg-danger p-2 rounded text-white'>Review order</button></Link>
                    </Cart>
                </div>
            </div>
        </div>
    );
};

export default Shop;