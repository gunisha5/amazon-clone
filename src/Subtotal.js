import React from 'react'
import "./Subtotal.css"
import CurrencyFormat from "react-currency-format"
import { useStateValue } from "./StateProvider";
import reducer, { getBasketTotal, initialState } from "./reducer";
import { useNavigate } from 'react-router-dom';

function Subtotal() {
  const navigate = useNavigate();
  const [{basket}, dispatch] = useStateValue();
  
  return (
    <div className='subtotal'>
        <CurrencyFormat
        renderText={(value)=>(
            <>
            <p>
                subtotal ({basket?.length} items): <strong>{value}</strong>
            </p>
            <small className='subtotal_gift'>
                <input type='checkbox'/>This order contains a gift
            </small>
            </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"Rs."}
      />
      <button onClick={e => navigate('/payment')}>Proceed to Checkout</button>

    </div>
  )
}

export default Subtotal
