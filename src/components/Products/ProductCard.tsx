import './index.scss';

import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";


function ProductCard(prop: any) {
 
  const { id, title, price, image_url } = prop.product;

  
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(
      cartActions.addToCart({
        id,
        name: title,
        price,
        quantity: 1,
        img: image_url
      })
    );
  };

 

  return ( 
      <div className='container'>
          <div className='grid-item'>
            
            <div className='product-image'>
              <img src={prop.product.image_url} alt={prop.product.title} />
            </div>
          <div className='product-title'>
            {prop.product.title}
            </div>
            <div className='product-price'>
            From {prop.currency} { new Intl.NumberFormat().format(prop.product.price.toFixed(2)) }
            </div>
            <div className='btn-container'>
            <button onClick={addToCart} className='add-to-cart-btn'>Add to card</button>
            </div>
          </div>
    </div>
  );
}

export default ProductCard;
