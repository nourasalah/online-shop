import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
  items : [], 
     status: null  ,
     error: null  ,
     isloading: false
}
export const productsFetch = createAsyncThunk(
    "products/productsFetch",
    async () => {
      try {
        const response = await axios.get(
          "https://chaoo-online-shop.herokuapp.com/products"
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
  );
const productsSlice = createSlice({
    name: 'products',
    initialState, 
    reducers: {},
    extraReducers : {
        [productsFetch.pending]: (state, action) => {
            state.status = "pending";
            state.isloading = true
          },
          [productsFetch.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = "success";
            state.isloading = false
          },
          [productsFetch.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload
          },
    }
})
export default productsSlice.reducer