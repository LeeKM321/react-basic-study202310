import React, { useContext } from 'react';
import styles from './MealItem.module.scss';
import MealItemForm from './MealItemForm';
import CartContext from '../../../../store/cart-context';

const MealItem = ({ id, price, description, name }) => {
  // context에서 필요한 데이터 or 함수를 소비하기 위해 꺼내기.
  // addItem -> 장바구니에 상품을 추가하는 함수를 얻어옴.
  const { addItem } = useContext(CartContext);

  const addToCartHandler = (amount) => {
    const item = {
      id: id,
      name: name,
      price: price,
      amount: +amount,
    };
    addItem(item);
  };

  const { meal, description: desc, price: priceStyle } = styles;

  const formatPrice = new Intl.NumberFormat('ko-KR').format(price);

  return (
    <li className={meal}>
      <div>
        <h3>{name}</h3>
        <div className={desc}>{description}</div>
        <div className={priceStyle}>{formatPrice}원</div>
      </div>
      <div>
        <MealItemForm
          id={id}
          onAddToCart={addToCartHandler}
        />
      </div>
    </li>
  );
};

export default MealItem;
