import React, { useEffect, useState } from 'react';
import Basket from '../../libs/components/basket/Basket';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import { CartItem } from '../../libs/types/order/basket-item';
import { useRouter } from 'next/router';
import Orders from '../../libs/components/basket/Orders';
import { Button, Stack } from '@mui/material';

const BasketPage: React.FC = () => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const router = useRouter();

	// ✅ Load from localStorage after component mounts
	useEffect(() => {
		const cartJson = localStorage.getItem('cartData');
		if (cartJson) {
			setCartItems(JSON.parse(cartJson));
		}
	}, []);

	const updateLocalStorage = (items: CartItem[]) => {
		localStorage.setItem('cartData', JSON.stringify(items));
	};

	const onAdd = (input: CartItem) => {
		const exist = cartItems.find((item) => item._id === input._id);
		let updatedCart;
		if (exist) {
			updatedCart = cartItems.map((item) => (item._id === input._id ? { ...item, quantity: item.quantity + 1 } : item));
		} else {
			updatedCart = [...cartItems, { ...input, quantity: 1 }];
		}
		setCartItems(updatedCart);
		updateLocalStorage(updatedCart);
	};

	const onRemove = (input: CartItem) => {
		const exist = cartItems.find((item) => item._id === input._id);
		if (!exist) return;

		let updatedCart;
		if (exist.quantity === 1) {
			updatedCart = cartItems.filter((item) => item._id !== input._id);
		} else {
			updatedCart = cartItems.map((item) => (item._id === input._id ? { ...item, quantity: item.quantity - 1 } : item));
		}
		setCartItems(updatedCart);
		updateLocalStorage(updatedCart);
	};

	const onDelete = (input: CartItem) => {
		const updatedCart = cartItems.filter((item) => item._id !== input._id);
		setCartItems(updatedCart);
		updateLocalStorage(updatedCart);
	};

	const onDeleteAll = () => {
		setCartItems([]);
		localStorage.removeItem('cartData');
	};

	const changeTabHandler = (tab: string) => {
		router.push(
			{
				pathname: '/basket',
				query: { tab: tab },
			},
			undefined,
			{ scroll: false },
		);
	};
	const tab = router.query.tab ?? 'shop';
	return (
		<Stack className={'shop-orders-page'}>
			<div>To shop go to the Products page and hit the basket icon</div>
			<Stack className={'button'}>
				<Button
					id={'btn'}
					className={tab == 'shop' ? 'active' : ''}
					onClick={() => {
						changeTabHandler('shop');
					}}
				>
					<div>Shop</div>
				</Button>
				<Button
					id={'btn'}
					className={tab == 'order' ? 'active' : ''}
					onClick={() => {
						changeTabHandler('order');
					}}
				>
					<div>My Orders</div>
				</Button>
			</Stack>
			{tab === 'shop' && (
				<Basket cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} onDelete={onDelete} onDeleteAll={onDeleteAll} />
			)}
			{tab === 'order' && <Orders />}
		</Stack>
	);
};

export default withLayoutBasic(BasketPage);
