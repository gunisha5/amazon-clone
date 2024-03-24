import React from 'react'
import { Routes, Route ,useLocation} from 'react-router-dom'
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import Payment from './Payment';
import {Elements} from "@stripe/react-stripe-js";
import Orders from './Orders'
import {loadStripe} from "@stripe/stripe-js";
import { AnimatePresence} from 'framer-motion';

const promise = loadStripe(
    "pk_test_51OvDEVSDDMKhnuJaUcyNzHRf0hWfEHgF5Z8ispyjnOl3QrMr99xEnAVSwDisoKeIWXJzUngseMi5OvLmEzGGlLuf00ElLGu5Oy"
);

function AnimatedRoutes() {
    const location = useLocation();
  return (
    <div>
        <AnimatePresence>
       <Routes location={location} key={location.pathname}>
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Elements stripe={promise}><Payment /></Elements>} />
          <Route path="/" element={<Home />} />
        </Routes>
        </AnimatePresence>
      </div>
    
  )
}

export default AnimatedRoutes
