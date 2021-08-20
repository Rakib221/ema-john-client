import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="header">
            <img className="mb-2" src={logo} alt="" srcset="" />
            <nav className="mx-5 d-flex justify-content-center align-items-center">
                <Link to="shop">Shop</Link>
                <Link to="review">Shop-review</Link>
                <Link to="inventory">ManageInventory</Link>
                <Link to="order">Orders</Link>
                <button onClick = {()=>setLoggedInUser({})}>Sign Out</button>
            </nav>
        </div>
    );
};

export default Header;