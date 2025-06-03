import { OrderStatus } from '../../enums/product.enum';
import { Member } from '../member/member';
import { Product, TotalCounter } from '../product/product';

export interface OrderItem {
	_id: string;
	itemQuantity: number;
	itemPrice: number;
	productId: string;
	createdAt: Date;
	updatedAt: Date;
	memberData?: Member;
}

export interface Order {
	_id: string;
	orderTotal: number;
	orderDelivery: number;
	orderStatus: OrderStatus;
	createdAt: Date;
	updatedAt: Date;
	memberData?: Member;
	orderItems: OrderItem[];
	productData: Product[];
}

export interface Orders {
	list: Order[];
	metaCounter: TotalCounter[];
}
