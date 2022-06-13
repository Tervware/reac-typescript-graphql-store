import { useQuery, gql } from "@apollo/client";
import './index.scss';
import ProductCard from './ProductCard';


import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";


function Products({ currency } : {currency: string}) {
 
  const dispatch = useDispatch();
 
const PRODUCTS_QUERY = gql`{
  products {
    id
    image_url
    price(currency: ${currency})
    product_options {
      title
      prefix
      suffix
      options{
        value
      }
    }
    title
  }
}`;

  const { data, loading, error } = useQuery(PRODUCTS_QUERY);

  if (loading) return (<span>Loading...</span>);
  if (error) return <pre>{error.message}</pre>
 
  // Update cart data
  dispatch(cartActions.updateCart(data.products));


  return ( 
      <div className='product-section'>
        
      <div className='grid-container'>
        {data.products.map((product: any) => (
            <span key={product.id}>
                 <ProductCard currency={currency} product={product} />
            </span>
           
        ))}
      </div>
    </div>
  );
}

export default Products;
