import React from 'react'
import './Checkout.css'
import Subtotal from './Subtotal'
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from './StateProvider'
import {motion} from 'framer-motion'

function Checkout() {
  const [{basket,user}, dispatch] = useStateValue();

  return (
    <motion.div className='checkout'
    initial={{ width: 0}}
    animate={{ width: '98%'}}
    exit={{ x: window.innerWidth, transition: { duration: 0.1}}}
    >
        <div className='checkout_left'>
            <img  
            className='checkout_ad'
            src="https://m.media-amazon.com/images/G/31/AmazonVideo/2021/X-site/SingleTitle/AeWatanMereWatan/1500x300_NP._CB579397451_.jpg"
            alt=""
            />
        <div>
          <h3>Hello {user?.email}</h3>
        <h2 className='checkout_title'>Your Shopping Basket</h2>
        {basket.map(item => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
     </div>
    </div>
    <div className='checkout_right'>
      
      <Subtotal/>
    </div>
    </motion.div>
  )
}

export default Checkout
