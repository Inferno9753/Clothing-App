import { Fragment, useContext } from "react";
import { Outlet,Link } from "react-router-dom";
import CartIcon from "../../components/cart-icon/cartIcon.component";
import CartDropDown from "../../components/cart-dropdowm/cartDropdown.component";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import './navigation.style.scss';

const Navigation=()=>{
    const {currentUser}=useContext(UserContext);
    const {isCartOpen}=useContext(CartContext);
    const handleClick=async ()=>{
        await signOutUser();
    }
    return(
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <CrwnLogo className="logo"/>
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        Shop
                    </Link>
                    {
                        currentUser?(
                            <span className="nav-link" onClick={handleClick}>Sign Out</span>
                        ) : (
                            <Link className="nav-link" to='/auth'>
                                Sign In
                            </Link>
                        )
                    }
                    <CartIcon/>
                </div>  
                {isCartOpen && <CartDropDown/>}
            </div>
            <Outlet/>
        </Fragment>
    )
}

export default Navigation;