import { Direction } from 'readline';
import { OrderStatus } from '../../enums/product.enum';

export interface OrderItemInput {
	itemQuantity: number;
	itemPrice: number;
	productId: string;
	orderId?: string;
}

export interface OISearch {
	orderStatus?: OrderStatus;
}

export interface OrderInquiry {
	page: number;
	limit: number;
	direction?: Direction;
	search?: OISearch;
}

export interface OrderUpdateInput {
	orderId: string;
	orderStatus: OrderStatus;
}
