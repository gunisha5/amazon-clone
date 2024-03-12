import React from 'react'
import './Header.css' 

function Header() {
  return (
    <div className='header'>
        <img 
         className="header_logo"
         src='data:image/png;base64,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'
        />
        <div className="header_search">
         <input
         className="header_searchinput"
         type="text"/>
        </div>

        <div className="header_nav">
          <div className='header_option'>
              <span
              className='header_optionLine1'>Hello Guest</span>
              <span
              className='header_option2'>Sign In</span>
          </div>
          
          <div className='header_option'>
              <span
              className='header_optionLine1'>Returns</span>
              <span
              className='header_option2'>& Orders</span>
          </div>
          
          <div className='header_option'>
              <span
              className='header_optionLine1'>Your</span>
              <span
              className='header_option2'>Prime</span>
          </div>
          <div className='header_optionBasket'>
            <span className='header_optionLine2 header_basketcount'>0</span>
          </div>
        
        </div>
    </div>
    
  )  
}

export default Header
