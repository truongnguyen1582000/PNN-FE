import { createSelector } from 'reselect';

const cartListSelector = (state) => state.cart.list;

export const cartListCountSelector = createSelector(
  cartListSelector,
  (cartItem) => cartItem.reduce((count, item) => (count += 1), 0)
);

export const cartTotalSelector = createSelector(cartListSelector, (cartItem) =>
  cartItem.reduce((count, item) => count + item.count * item.price, 0)
);
