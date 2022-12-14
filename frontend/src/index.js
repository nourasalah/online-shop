import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { configureStore } from "@reduxjs/toolkit";
import {Provider} from 'react-redux'
import CartSlice, { getTotal } from './features/CartSlice'
import productsReducer,{productsFetch} from './features/ProductsSlice.js'
const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: CartSlice,
  },
});
store.dispatch(productsFetch());
store.dispatch(getTotal());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />

    </Provider>
  </React.StrictMode>
);
