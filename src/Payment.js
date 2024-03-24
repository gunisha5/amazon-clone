import React, {useEffect,useState} from 'react'
import './Payment.css'
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import { useNavigate } from 'react-router-dom';
import axios from './axios';
import {db} from './firebase'
import {motion} from 'framer-motion'

function Payment() {
    
    const navigate = useNavigate();
    const [{ basket, user}, dispatch] = useStateValue();

    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState("");

    useEffect(()=> {
        const getClientSecret = async () =>{
            const response =await axios({
                method: 'post',
                url: `/payments/create?total=${getBasketTotal(basket)*100}`

            })
            setClientSecret(response.data.clientSecret)
    }
       getClientSecret();
    }, [basket])

    console.log('*',user)

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);
    
        try {
            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user.email,
                        address: {
                        line1: 'react lane123',
                        postal_code: '98140',
                        city: 'San fransico',
                        state: 'CA',
                        country:'US',
                    }

                }
                }
            });
    
            if (error) {
                // Handle Stripe error
                console.error('Stripe payment error:', error.message);
                setError(error.message);
                setProcessing(false);
                return;
            }
    
            if (paymentIntent) {
                await db.collection('users')
                    .doc(user?.uid)
                    .collection('orders')
                    .doc(paymentIntent?.id)
                    .set({
                        basket: basket,
                        amount: paymentIntent?.amount,
                        created: paymentIntent?.created
                    });
    
                setSucceeded(true);
                setError(null);
                setProcessing(false);
                dispatch({
                    type: 'EMPTY_BASKET'
                });
                navigate('/orders');
            } else {
                // Handle undefined paymentIntent
                console.error('paymentIntent is undefined');
                setError('Payment failed');
                setProcessing(false);
            }
        } catch (error) {
            // Handle any other errors
            console.error('Error processing payment:', error.message);
            setError(error.message);
            setProcessing(false);
        }
    };
    
    const handleChange = event => {

        setDisabled(event.empty);
        setError(event.error ? event.error.messaeg : "");

    }

    return (
        <motion.div className='payment'
        initial={{ width: 0}}
        animate={{ width: '100%'}}
        exit={{ x: window.innerWidth, transition: { duration: 0.1}}}
        >

      <div className='payment_container'>
        <h1>
           Checkout (<Link to='./checkout'>{basket?.length} items</Link>)
        </h1>
        
        <div className='payment_section'>
            <div className='payment_title'>
                <h3>Delivery Address: </h3>
            </div>
            <div className='payment_address'>
                <p>{user?.email}</p>
                <p>123 React Lane</p>
                <p>Jammu, India</p>
            </div>

        </div>
        <div className='payment_section'>
            <div className='payment_title'>
                <h3>Review items and delivery</h3>
            </div>
            <div className='payment_items'>
                {basket.map(item =>(
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
        
        <div className='payment_section'>
            <div className='payment_title'>
                <h3>Payment Method</h3>
            </div>
            <div className='payment_details'>
               <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange}/>

                <div className='payment_priceContainer'>
                <CurrencyFormat
                   renderText={(value) => (
                     <h3>Order Total: {value}</h3>
                   )}
                   decimalScale={2}
                   value={getBasketTotal(basket)}
                   displayType={"text"}
                   thousandSeparator={true}
                   prefix={"Rs."}
                />
                <button disabled={processing || disabled || succeeded}>
                    <span>
                        {processing ? <p>Processing</p>:
                        "Buy Now"}
                    </span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Payment
