import {createSlice} from '@reduxjs/toolkit'
import{toast} from 'react-toastify'
const initialState = {
    cartItems :localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')): [], 
    cartTotalQuantity: 0,
    cartTotalAmount:0
       
  }
const CartSlice = createSlice({
    name:'cart',
    initialState,
    reducers: {
        addToCart(state, action){
            const itemIndex =
            state.cartItems.findIndex((item)=> item.id === action.payload.id)
            if
                (itemIndex >= 0){
                    state.cartItems[itemIndex].cartQuantity +=1
                    toast.info(`icreased ${state.cartItems[itemIndex].name} to cart`,{
                        position: 'bottom-left'
                    })
                }
            else{
                const tempCart = {...action.payload , cartQuantity : 1}
                state.cartItems.push(tempCart)
                toast.success(` ${action.payload.name} added  to cart`,{
                    position: 'bottom-left'
                })
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
            
        },
        removeFromCart(state, action){
           const nextCartItem= state.cartItems.filter(
                (cartItem)=> cartItem.id !== action.payload.id
            )
            state.cartItems = nextCartItem
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
            toast.error(` ${action.payload.name} removed from cart`,{
                position: 'bottom-left'
            })
        },
        decreaseCart(state, action){
            const itemIndex = state.cartItems.findIndex(
                (cartItem)=> cartItem.id === action.payload.id
            )
            if(state.cartItems[itemIndex].cartQuantity > 1){
                state.cartItems[itemIndex].cartQuantity -= 1
            }else if(state.cartItems[itemIndex].cartQuantity === 1){
                const nextCartItem= state.cartItems.filter(
                    (cartItem)=> cartItem.id !== action.payload.id
                )
                state.cartItems = nextCartItem
                toast.info(` decreased${action.payload.name}  from cart`,{
                    position: 'bottom-left'
                })
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))

        }, 
        clearCart(state, action){
            state.cartItems = []
            toast.info(` cart cleared`,{
                position: 'bottom-left'
            })
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))

        },
        getTotal(state, action) {
            let { total, quantity } = state.cartItems.reduce(
              (cartTotal, cartItem) => {
                const { price, cartQuantity } = cartItem;
                const itemTotal = price * cartQuantity;
      
                cartTotal.total += itemTotal;
                cartTotal.quantity += cartQuantity;
      
                return cartTotal;
              },
              {
                total: 0,
                quantity: 0,
              }
            );
            total = parseFloat(total.toFixed(2));
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
          },
    }
})
export const {addToCart, removeFromCart, decreaseCart, clearCart, getTotal} = CartSlice.actions
export default CartSlice.reducer
