import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState({});
    // const product = fakeData.find(pd=>pd?.key === productKey);
    useEffect(() =>{
        fetch('https://dry-basin-09706.herokuapp.com/product/'+productKey)
        .then(response => response.json())
        .then(data => setProduct(data))
    },[productKey])
    return (
        <div>
            <h4>{product?.key} detail coming soon</h4>
            <Product showAddToCart = {false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;