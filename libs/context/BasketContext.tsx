import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem } from '../types/order/basket-item';
import { Product } from '../types/product/product';

interface BasketContextType {
	items: CartItem[];
	addToBasket: (product: Product) => void;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const BasketProvider = ({ children }: { children: ReactNode }) => {
	const [items, setItems] = useState<CartItem[]>([]);

	const addToBasket = (product: Product) => {
		//@ts-ignore
		setItems((prev) => {
			const existing = prev.find((item) => item._id === product._id);
			if (existing) {
				return prev.map((item) => (item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item));
			}
			return [
				...prev,
				{
					id: product._id,
					name: product.productTitle,
					price: product.productPrice,
					quantity: 1,
					image: product.productImages?.[0]
						? `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/${product.productImages[0]}`
						: undefined,
				},
			];
		});
	};

	return <BasketContext.Provider value={{ items, addToBasket }}>{children}</BasketContext.Provider>;
};

export const useBasket = () => {
	const context = useContext(BasketContext);
	if (!context) throw new Error('useBasket must be used within a BasketProvider');
	return context;
};
