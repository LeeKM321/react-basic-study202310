import React, { useReducer } from 'react';
import CartContext from './cart-context';

const defaultState = {
  items: [],
  totalPrice: 0,
};
// 리듀서 함수 정의: 여러가지 복잡한 상태관리를 중앙 집중화
// state: 업데이트 하기 전의 상태값
// action: 어떤 업데이트를 하는지에 대한 정보와 필요값들이 들어있음.
const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    // 신규 아이템
    const newCartItem = action.item;
    // 기존 장바구니에 등록된 메뉴인지 아닌지에 따라 처리를 다르게 해야 할 것 같다.
    const index = state.items.findIndex((item) => item.id === newCartItem.id);
    // 기존 아이템
    const existingItems = [...state.items]; // 기존 배열을 복사
    const prevCartItem = existingItems[index]; // 위에서 찾은 인덱스로 요소를 하나만 지목.

    let updatedItem;

    if (index === -1) {
      //신규 아이템
      updatedItem = [...state.items, newCartItem];
    } else {
      // 기존 아이템 -> 수량을 1 올려주면 되겠다.
      // prevCartItem.amount++; -> 바깥 화면에서는 상품이 꼭 하나씩만 올라가는 것은 아님!
      prevCartItem.amount += newCartItem.amount; // 복사된 아이템의 수량을 늘려줌.
      updatedItem = [...existingItems]; // 새롭게 복사 배열을 갱신.
    }

    console.log(updatedItem);

    const updatedPrice =
      state.totalPrice + newCartItem.price * newCartItem.amount;

    return {
      items: updatedItem,
      totalPrice: updatedPrice,
    }; // 이 액션에 대한 업데이트된 새로운 상태 반환.
  } else if (action.type === 'REMOVE') {
    const removedItems = state.items.filter((item) => item.id !== action.id);
    return {
      items: removedItems,
    };
  }

  return defaultState;
};

const CartProvider = ({ children }) => {
  // 리듀서 사용
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultState);

  // Provider의 value는 실제로 관리할 데이터 객체.
  const cartContext = {
    items: cartState.items, // 장바구니에 담긴 항목 배열
    totalPrice: cartState.totalPrice,
    addItem: (item) => {
      // 액션함수는 반드시 무슨 액션을 하는지와 액션에 필요한 값을 전달.
      dispatchCartAction({
        type: 'ADD',
        item: item,
      });
    },
    removeItem: (id) => {
      dispatchCartAction({
        type: 'REMOVE',
        id: id,
      });
    },
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
