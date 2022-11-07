import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../button/button-component'
import { CartContext } from '../../context/cart.context'
import CartItem from '../cart-item/cartItem.component'

import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from './cartDropdown.style.jsx';

const CartDropDown = () => {
  const {cartItems}=useContext(CartContext);
  const navigate=useNavigate();

  const goToCheckOut=()=>{
    navigate('/checkout');
  }

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckOut}>CHECKOUT</Button>
    </CartDropdownContainer>
  )
}

export default CartDropDown