import {useSelector, useDispatch} from 'react-redux'
import {productsFetch} from '../features/ProductsSlice'
import { useEffect } from 'react'
import {addToCart} from '../features/CartSlice'
import {useNavigate} from 'react-router-dom'
const Home = () => {
    const {items, isloading} = useSelector(state=> state.products)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(
        () => {
          dispatch(productsFetch())
        }
        ,[dispatch]
      )
      const handleAddToCart = (product)=>{
        dispatch(addToCart(product));
        navigate('/cart')
      };
    return ( 
        <div className='home-container'>
            {isloading?
             (<p>its loading......</p>):
             (<>
             <h2>New Arrivals</h2>
              <div className='products'>
                {items?.map(product=> <div key={product.id} className='product'>
                    <h3>{product.name}</h3>
                    <img src={product.image} alt={product.name}/>
                    <div className='details'>
                        <span>{product.desc}</span>
                        <span className='price'>${product.price}</span>
                    </div>
                    <button onClick={() => handleAddToCart(product)}>Add To Cart</button>
                </div>)}
              </div>
             </>)
            }
        </div>
     );
}
 
export default Home