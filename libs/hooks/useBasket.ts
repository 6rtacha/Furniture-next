import { useState } from 'react';
import { CartItem } from '../types/order/basket-item';
import { cartDataVar } from '../../apollo/store';

const useBasket = () => {
	const cartJson: string | null = typeof window !== 'undefined' ? localStorage.getItem('cartData') : '';

	const currentCart = cartJson ? JSON.parse(cartJson) : [];
	const [cartItems, setCardItems] = useState<CartItem[]>(currentCart);

	const onAdd = (input: CartItem) => {
		const exist: any = cartItems.find((item: CartItem) => item._id === input._id);
		if (exist) {
			const cartUpdate = cartItems.map((item: CartItem) =>
				item._id === input._id ? { ...exist, quantity: exist.quantity + 1 } : item,
			);

			setCardItems(cartUpdate);
			localStorage.setItem('cartData', JSON.stringify(cartUpdate));
			cartDataVar(cartUpdate);
		} else {
			const cartUpdate = [...cartItems, { ...input }];
			setCardItems(cartUpdate);
			localStorage.setItem('cartData', JSON.stringify(cartUpdate));
			cartDataVar(cartUpdate);
		}
	};

	const onRemove = (input: CartItem) => {
		const exist: any = cartItems.find((item: CartItem) => item._id === input._id);
		if (exist.quantity === 1) {
			const cartUpdate = cartItems.filter((item: CartItem) => item._id !== input._id);
			setCardItems(cartUpdate);
			localStorage.setItem('cartData', JSON.stringify(cartUpdate));
		} else {
			const cartUpdate = cartItems.map((item: CartItem) =>
				item._id === input._id ? { ...exist, quantity: exist.quantity - 1 } : item,
			);
			setCardItems(cartUpdate);
			localStorage.setItem('cartData', JSON.stringify(cartUpdate));
		}
	};

	const onDelete = (input: CartItem) => {
		const cartUpdate = cartItems.filter((item: CartItem) => item._id !== input._id);
		setCardItems(cartUpdate);
		localStorage.setItem('cartData', JSON.stringify(cartUpdate));
	};

	const onDeleteAll = () => {
		setCardItems([]);
		localStorage.removeItem('cartData');
	};

	return { cartItems, onAdd, onRemove, onDelete, onDeleteAll };
};

export default useBasket;
