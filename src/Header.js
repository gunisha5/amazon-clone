import React from 'react'
import './Header.css' 
import { Link } from "react-router-dom"
import { useStateValue } from "./StateProvider";
import {auth} from "./firebase";
import { FaSearch, FaShoppingCart } from 'react-icons/fa';


function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut();
    }
  }

  return (
    <div className='header'>
      <Link to="/">
        <img 
         className="header_logo"
         src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
         alt=""
         />
        </Link>
         
        <div className="header_search">
        <input
         className="header_searchinput"
         type="text"
         />
        <div className="search_icon">
         <FaSearch />
        </div>
         </div>
          
         <div className="header_nav">
        <Link to={!user && '/login'} >
          <div onClick={handleAuthenticaton} className="header_option">
            <span className='header_optionLine1'>Hello  {!user ? 'Guest' : user.email}</span>
            <span className='header_option2'>{user ? 'Sign Out' : 'Sign In'}
            </span>
          </div>
        </Link>

        <Link to='/orders'>
             
          <div className='header_option'>
              <span
              className='header_optionLine1'>Returns</span>
              <span
              className='header_option2'>& Orders</span>
          </div>
          
        </Link>
        
          <div className='header_option'>
              <span
              className='header_optionLine1'>Your</span>
              <span
              className='header_option2'>Prime</span>
          </div>
        
        <Link to="/checkout">
          <div className='header_optionBasket'>
            <div className='shopping_cart'>
              <FaShoppingCart />
            </div>
            <span className='header_optionLine2 header_basketcount'>{basket?.length}</span>
          </div>
        </Link>
      </div>
    </div>
    
  )  
}

export default Header
