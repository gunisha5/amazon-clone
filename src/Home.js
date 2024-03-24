import React, { useState , useEffect} from 'react'
import "./Home.css";
import Product from "./Product.js";
import {AnimatePresence, motion} from "framer-motion"

const images=[
  "https://amazon-clone-less-spend-smile-more.netlify.app/images/imgg1.jpg",
  "https://amazon-clone-less-spend-smile-more.netlify.app/images/imgg3.jpg",
  "https://amazon-clone-less-spend-smile-more.netlify.app/images/imgg4.jpg",
  "https://amazon-clone-less-spend-smile-more.netlify.app/images/imgg2.jpg"
]

 function Home() {

  const [index, setIndex] = useState(0)
  const [direction, setdirection] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setdirection(1);
      setIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 4000); 

    return () => clearInterval(intervalId);
  }, []); 

  function nextstep(){
    setdirection(1)
    if(index === images.length - 1){
      setIndex(0)
      return
    }
      setIndex(index +1)
  }

  function prevstep(){
    setdirection(-1)
    if(index === 0){
      setIndex(images.length -1)
      return
    }
      setIndex(index -1)
  }

  return (
    <motion.div className='home'
    initial={{ width: 0}}
    animate={{ width: '100%'}}
    exit={{ x: window.innerWidth, transition: { duration:0.1}}}
    >
     <div className='home_container'>
        
          <motion.img
            initial={direction > 0 ? { opacity: 0, x: 200 } : { opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 , transition: { duration: 0.6 }}}
            exit={direction > 0 ? { opacity: 0, x: -200 } : { opacity: 0, x: 200 }}
            src={images[index]}
            alt=''
            className='home_image'
            key={images[index]}
            custom={direction}
          />


        <button className='next' onClick={nextstep}>▶</button>
        <button className='prev' onClick={prevstep}>◀</button>
    
        
        <div className='home_row'>
          <Product 
          id="12321341"
          title="TOPOSH 11.6 inch 2 in 1 Laptop Tablet Computer with Touch Screen, Intel Celeron Quad Core N4120 8GB RAM..."
          price={50000} 
          image="https://m.media-amazon.com/images/I/71DkiXprgBS._AC_UL320_.jpg" 
          rating={5}/>
          <Product
          id="49538094"
          title="SAMSUNG Galaxy Tab S7 11-inch Android Tablet 128GB Wi-Fi Bluetooth S Pen Fast Charging USB-C Port, Mystic Black.."
          price={30000}
          image="https://m.media-amazon.com/images/I/51fPuFND28L._AC_UL320_.jpg"
          rating={4}
          />
          </div>
        <div className='home_row'>
          <Product
          id="4903850"
          title="Donerton Smart Watch, Fitness Tracker for Android Phones, Fitness Tracker with Heart Rate and Sleep Monitor, Activity Tracker..."
          price={2000}
          image="https://m.media-amazon.com/images/I/61QHRATj+vL._AC_UY218_.jpg"
          rating={3}
          />
          <Product
           id="23445930"
           title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
           price={1000}
           image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
           rating={5}
          />
          <Product
          id="3254354345"
          title="'PUMA Men's Enzo 2 Sneaker"
          price={4500}
          image="https://m.media-amazon.com/images/I/81+0gf6ZqzL._AC_UL320_.jpg"
          rating={4}
          />
          
        </div>
        <div className='home_row'>
          <Product
          id="90829332"
          title="HOTNIU Stretch Sofa Covers Printed Couch Cover Sofa Slipcovers for 3 Cushion Couches Elastic Universal Furniture..."
          price={10000}
          image="https://m.media-amazon.com/images/I/61gIsBN1vGL._AC_UL320_.jpg"
          rating={4}
          />
          <Product
          id="90829332"
          title="SAMSUNG 55-Inch Class Neo QLED QN85A Series - 4K UHD Quantum HDR 24x Smart TV with Alexa Built-in..."
          price={20000}
          image="https://m.media-amazon.com/images/I/816z9yHvl4L._AC_UY218_.jpg"
          rating={4}
          />
          
        </div>
    </div>
    </motion.div>
  )
}

export default Home
