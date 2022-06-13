import './index.scss';
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";

import  Cart from '../cart';

const displayBlock= {
    display: 'flex'
}
const displayNone= {
    display: 'none'
}


function SideBar(props: any) {
    const show = useSelector((state: any) => state.cart.showCart);
    const displayType = show ? displayBlock : displayNone;
    
    const dispatch = useDispatch();
    const toggleShowCart = () => {
      dispatch(
        cartActions.setShowCart()
      );
    };

    return ( 
        <div  className='modal' style={displayType}>
           <div className='transparent-section' onClick={()=>toggleShowCart()}>
           </div>
            <div className='right-sidebar'>

            <div className='right'>
                
                <Cart/>
            </div>
            </div>
        </div>
    );
}

export default SideBar;