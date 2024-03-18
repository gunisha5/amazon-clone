import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Checkout from './Checkout';
import Login from './Login';
import {auth} from "./firebase";
import React, { useEffect } from 'react';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import Orders from './Orders'

const promise = loadStripe(
  "pk_test_51OvDEVSDDMKhnuJaUcyNzHRf0hWfEHgF5Z8ispyjnOl3QrMr99xEnAVSwDisoKeIWXJzUngseMi5OvLmEzGGlLuf00ElLGu5Oy"
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(()=>{

    auth.onAuthStateChanged((authUser) => {
      console.log('the user is>>',authUser);

      if(authUser){
        dispatch({
          type: 'SET_USER',
          user: authUser,
        });
      } else{
        dispatch({
          type: 'SET_USER',
          user: null,
        });
      }
    });
  },  []) ;
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Elements stripe={promise}><Payment /></Elements>} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
