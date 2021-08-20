import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import { getDatabaseCart } from '../../utilities/databaseManager';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        const savedCart = getDatabaseCart();
        const orderDetails = {...loggedInUser, products: savedCart, shipment:data, orderTime: new Date()};
        fetch('https://dry-basin-09706.herokuapp.com/addOrder',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data) {
                alert('Your order placed successfully');
            }
        })
    };

    console.log(watch("example"));

    return (
        <div className="row">
            <div className="col-lg-6">
            <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
            <input placeholder="Name" defaultValue={loggedInUser.name} {...register("name", { required: true })} />
            {errors.name && <span className="error">Name is required</span>}

            <input placeholder="E-mail" defaultValue={loggedInUser.email} {...register("email", { required: true })} />
            {errors.email && <span className="error">E-mail is required</span>}

            <input placeholder="Address" {...register("address", { required: true })} />
            {errors.address && <span className="error">Address is required</span>}

            <input placeholder="Phone" defaultValue={loggedInUser.phone} {...register("phone", { required: true })} />
            {errors.phone && <span className="error">Phone is required</span>}

            <input type="submit" value="Submit" />
        </form>
            </div>
            <div className="col-lg-6">
                <h2>Please pay</h2>
                <ProcessPayment></ProcessPayment>
            </div>
        </div>
    );
};

export default Shipment;