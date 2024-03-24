import React, { useState, useEffect } from 'react';
import { db } from "./firebase";
import './Orders.css'
import { useStateValue } from "./StateProvider";
import Order from './Order'
import {motion} from 'framer-motion'

function Orders() {
  const[{basket, user}, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
  if(user){
    db
    .collection("users")
    .doc(user?.uid)
    .collection('orders')
    .orderBy('created', 'desc')
    .onSnapshot(snapshot => (
        setOrders(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        })))
    ))
   } else{
    setOrders([])
}

  }, [])
  
  return (
        <motion.div className='orders'
        initial={{ width: 0}}
        animate={{ width: '90%'}}
         exit={{ x: window.innerWidth, transition: { duration: 0.1}}}
        >

            <h1>Your Orders </h1>

            <div className='orders_order'>
                {orders?.map(order => (
                    <Order order={order}/>
                ))}
            </div>
        </motion.div>
    )
}

export default Orders