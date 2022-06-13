import './index.scss'
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { CartItemType } from '../../store/types';

function CartItem({ name, quantity, img, totalPrice, price, id }: CartItemType) {
    const currency = useSelector((state: any) => state.cart.currency);
    const dispatch = useDispatch();
  const incrementCartItem = () => {
    dispatch(
      cartActions.addToCart({
        name,
        id,
        price,
      })
    );
  };
  const decrementCartItems = () => {
    dispatch(cartActions.removeFromCart(id));
  };


    return (
        <div className="cart-item">
            <div className=' flex'>
                <div className='cart-info'>
                    <div className='flex mb-1'>
                        <div>
                            <div className='mb-1 item-title'>  {name} </div>
                            <div className='text-small'>  Category / Two Month </div>
                        </div>

                    </div>


                    <div className='flex mb-1'>
                        <div className='text-small'>
                        One time purchase of Two month supply
                        </div>
                    </div>


                    <div className='quantity'>
                        <div >
                            <div className='counter'>
                                <button onClick={decrementCartItems} >-</button>  {quantity} <button onClick={incrementCartItem} >+</button>
                            </div>
                        </div>
                        <div className='item-amount'>{currency} {new Intl.NumberFormat().format(totalPrice)}</div>
                    </div>
                </div>

                <div className='cart-img-section'>
                    <div className='item-remove'>x</div>
                    <div className='item-img'>
                            <img src={img} alt={name} />
                    </div>
                </div>


            </div>
        </div>
    );
}

export default CartItem;