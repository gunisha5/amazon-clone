import React from 'react'
import "./Product.css";
import { useStateValue } from './StateProvider';
import {motion} from 'framer-motion'

function Product({id, title, price,image,rating} ) {
  const [{basket}, dispatch] = useStateValue();
  
  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item:{
        id:id,
        title:title,
        image:image,
        rating:rating,
        price:price,
      },
    });
    };
  return (
    <motion.div
    className='product'
    whileHover={{ scale: 1.02, boxShadow: "5px 5px 8px rgba(0, 0, 0, 0.3)" }}>
      <div className='product_info'>
        <p>{title}</p>
        <p className='product_price'>
            <small>Rs.</small>
            <strong>{price}</strong>
        </p>
        <div className='product_rating'>
            {Array(rating)
            .fill()
            .map((_, i) => (
            <p>🌟</p>
            ))}
        </div>
      </div>
      <img src={image}
      alt=""/>
      <button onClick={addToBasket}>Add to Basket</button>
    </motion.div>
  );
}

export default Product
