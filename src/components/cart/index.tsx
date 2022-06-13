import { useDispatch, useSelector } from "react-redux";
import { useQuery, gql } from "@apollo/client";
import './index.scss'
import { cartActions } from "../../store/cart-slice";
import CartItem from './CarItem';
import { CartItemType } from '../../store/types';

function Cart() {

    const PRODUCTS_QUERY = gql` {
        __type(name: "Currency") {
          enumValues {
            name
          }
        }
      }`;
      
    const { data } = useQuery(PRODUCTS_QUERY);
       

    const cartItems: CartItemType[] = useSelector((state: any) => state.cart.itemsList);
    const cartTotalPrice = useSelector((state: any) => state.cart.totalPrice);
    
    const currency = useSelector((state: any) => state.cart.currency);
    
    const dispatch = useDispatch();
    const toggleShowCart = () => {
        dispatch(
            cartActions.setShowCart()
        );
    };

    const changeCurrency = (event: any) => {
        const target = event.target as HTMLSelectElement;
        const selectedCurrency: string = target.value;
        dispatch(
            cartActions.changeCurrency(selectedCurrency)
        );
    };


    return (
        <div >
            <div className="cart-title mb-2">My Shopping Cart</div>

            <div className='flex pb-2 mb-2'>
                <div onClick={toggleShowCart} className="cart-close">
                  <svg viewBox="0 0 256 512" focusable="false" className="chakra-icon css-16roui6"><path fill="currentColor" d="M24.707 38.101L4.908 57.899c-4.686 4.686-4.686 12.284 0 16.971L185.607 256 4.908 437.13c-4.686 4.686-4.686 12.284 0 16.971L24.707 473.9c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L41.678 38.101c-4.687-4.687-12.285-4.687-16.971 0z"></path></svg>
                 </div>
                <div className="currency-select">
                    
                    <select onChange={changeCurrency}>
                        {data && data.__type.enumValues.map((currency: any) => (
                            <option key={currency.name} value={currency.name}>{currency.name}</option>
                        ))}
                    </select>

                    <div className="select-icon">
                        <svg viewBox="0 0 24 24" role="presentation"  focusable="false" aria-hidden="true" style={ ({width: "1em", height: "1em", color: "currentcolor"})}><path fill="currentColor" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></svg>
                    </div>
                </div>
            </div>

            {/* Cart items */}
            <div className="cart-items ">

            { cartItems.length > 0 && cartItems.map((item: CartItemType) => (
          <span key={item.id}>
           
            <CartItem
              quantity={item.quantity}
              id={item.id}
              price={item.price}
              totalPrice={item.totalPrice}
              img={item.img}
              name={item.name}
            />
          </span>
        ))}


            </div>

            {cartItems.length > 0 && (<div className="cart-total">
                <div className="cart-total-title">
                    Total
                    </div>
                <div className="cart-total-amount">
                    {currency} { new Intl.NumberFormat().format(cartTotalPrice)}
                    </div>
            </div>)}

            {cartItems.length === 0 && (
                    <div className="cart-empty">
                        <div>
                            <div>There are no items in your cart</div>
                            <span className="shopping-link" onClick={toggleShowCart} >Get shopping &gt;&gt;</span>
                            </div>
                        </div>
                )}

        </div>
    );
}

export default Cart;