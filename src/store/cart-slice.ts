import { createSlice } from "@reduxjs/toolkit";

import { CartItemType, CartState, ProductType } from "./types";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsList: [],
    totalQuantity: 0,
    totalPrice: 0,
    showCart: false,
    changed: false,
    currency: "USD",
  },
  reducers: {
    replaceData(state: CartState, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.itemsList = action.payload.itemsList;
    },
    addToCart(state: CartState, action) {
      state.changed = true;
      state.showCart = true;
      const newItem = action.payload;
      // to check if item is already available
      const existingItem = state.itemsList.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
        state.totalPrice = state.totalPrice + newItem.price;
        state.totalQuantity++;
      } else {
        state.itemsList.push({
          id: newItem.id,
          price: newItem.price,
          img: newItem.img,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name,
        });
        state.totalQuantity++;
        state.totalPrice = state.totalPrice + newItem.price;
      }
    },

    updateCart(state: CartState, action) {
        const products = action.payload;
        // Get products that are already in cart
        const productsInCart: ProductType[] = products.filter((product: ProductType) => state.itemsList.find(item => item.id === product.id));

        // Update price for each product in cart
        state.itemsList = productsInCart.map((product: ProductType): CartItemType => {
            const item = state.itemsList.find(item => item.id === product.id);
            if (item) {
                return {
                    id: item.id,
                    price: product.price,
                    img: item.img,
                    quantity: item.quantity,
                    totalPrice: item.quantity * product.price,
                    name: item.name,
                  };
            }
            return {
                id: product.id,
                price: product.price,
                img: product.image_url,
                quantity: 1,
                totalPrice:  product.price,
                name: product.title
                ,
              };
            
        });
        
        // Update total price
        state.totalPrice = state.itemsList.reduce((acc, item) => acc + item.totalPrice, 0);
        
      },
    removeFromCart(state: CartState, action) {
      state.changed = true;
      const id = action.payload;
 
        const existingItem  = state.itemsList.find((item: CartItemType) => item.id === id);
        if (existingItem && existingItem.quantity === 1) {
          state.itemsList = state.itemsList.filter((item) => item.id !== id);
          state.totalQuantity--;
          state.totalPrice = state.totalPrice - existingItem.price;
        } 
        
        if (existingItem && existingItem.quantity > 1) {
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
          state.totalPrice = state.totalPrice - existingItem.price;
          state.totalQuantity--;
        }
    },
    setShowCart(state: CartState) {
      state.showCart = !state.showCart;
    },
    changeCurrency(state: CartState, action) {
      state.currency = action.payload;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;