import { Fragment, useContext } from "react";
import { Outlet,Link } from "react-router-dom";
import CartIcon from "../../components/cart-icon/cartIcon.component";
import CartDropDown from "../../components/cart-dropdowm/cartDropdown.component";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import {
    NavigationContainer,
    LogoContainer,
    NavLinks,
    NavLink,
  } from './navigation.style';

const Navigation=()=>{
    const {currentUser}=useContext(UserContext);
    const {isCartOpen}=useContext(CartContext);
    const handleClick=async ()=>{
        await signOutUser();
    }
    return(
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className="logo"/>
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop'>
                        Shop
                    </NavLink>
                    {
                        currentUser?(
                            <NavLink as='span' onClick={handleClick}>Sign Out</NavLink>
                        ) : (
                            <NavLink to='/auth'>
                                Sign In
                            </NavLink>
                        )
                    }
                    <CartIcon/>
                </NavLinks>  
                {isCartOpen && <CartDropDown/>}
            </NavigationContainer>
            <Outlet/>
        </Fragment>
    )
}

export default Navigation;