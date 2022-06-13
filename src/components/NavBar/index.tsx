import './index.scss'
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";

import cartIcon from '../../assets/icons/cart-icon.png'

function NavBar() {

  const totalCartQuantity = useSelector((state: any) => state.cart.totalQuantity);
    const dispatch = useDispatch();
    const toggleShowCart = () => {
      dispatch(
        cartActions.setShowCart()
      );
    };


    return (
    <header >
        <nav className='container'>
            <ul>
                <li  id="nav-title">LUMIN</li>
                <li>Shop</li>
                <li>Learn</li>
                <li className='push-right'>Account</li>
                <li onClick={toggleShowCart}>
                  <div className='cart-menu-item'>
                      <img className='cart-icon' src={cartIcon} alt='cart'/>
                      <span>{totalCartQuantity}</span> 
                  </div>
                    
                  </li>
            </ul>

        </nav>
    </header>
    );
    }

    export default NavBar;