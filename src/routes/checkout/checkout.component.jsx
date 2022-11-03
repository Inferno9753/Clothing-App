import { CartContext } from '../../context/cart.context';
import './checkout.style.scss'
import { useContext } from 'react';
import CheckOutItem from '../../components/checkout-item/checkoutitem.component';

const CheckOut = () => {
    const {cartItems,totalCount}=useContext(CartContext);
  return (
    <div className='checkout-container'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span>Product</span>
            </div>
            <div className='header-block'>
                <span>Description</span>
            </div>
            <div className='header-block'>
                <span>Quantity</span>
            </div>
            <div className='header-block'>
                <span>Price</span>
            </div>
            <div className='header-block'>
                <span>Remove</span>
            </div>
        </div>
            {cartItems.map((cartItem)=>
                <CheckOutItem key={cartItem.id} cartItem={cartItem} />
            )}
            <span className='total'>total: ${totalCount}</span>
    </div>
  )
}

export default CheckOut;