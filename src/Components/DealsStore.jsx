import React from 'react';

export default function DealsStore(props) {
  return (<div className='Deals-Store-Container'>
      <img alt="Store banners" src={`https://www.cheapshark.com/img/stores/banners/${
          props.deals.storeID - 1
              }.png`}              
            />
            <br />
            
      <p> Sale: ${props.deals.salePrice} </p> 
        {props.deals.savings > 50 ? <p style={{color:"green"}}> Savings: {Math.round(props.deals.savings)}% </p>: <p > Savings: {Math.round(props.deals.savings)}% </p>}  
     
  </div>);
}

           