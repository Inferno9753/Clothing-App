import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './cartDropdown.style.scss'
import Button from '../button/button-component'
import { CartContext } from '../../context/cart.context'
import CartItem from '../cart-item/cartItem.component'

const CartDropDown = () => {
  const {cartItems}=useContext(CartContext);
  const navigate=useNavigate();

  const goToCheckOut=()=>{
    navigate('/checkout');
  }

  return (
    <div className='cart-dropdown-container'>
        <div className='cart-items'>
            {cartItems.map((item)=>(
              <CartItem key={item.id} cartItem={item}/>
            ))}
        </div>
        <Button onClick={goToCheckOut} >Checkout</Button>
    </div>
  )
}

export default CartDropDown