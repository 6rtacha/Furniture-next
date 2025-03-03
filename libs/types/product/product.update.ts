import { ProductLocation, ProductStatus, ProductType } from '../../enums/product.enum';

export interface PropertyUpdate {
	_id: string;
	productType?: ProductType;
	productStatus?: ProductStatus;
	productLocation?: ProductLocation;
	productAddress?: string;
	productTitle?: string;
	productPrice?: number;
	productMaterial?: string;
	productColors?: string;
	productWidth?: number;
	productHeight?: number;
	productLength?: number;
	propertyImages?: string[];
	propertyDesc?: string;
	productPurchase?: boolean;
	propertyRent?: boolean;
	soldAt?: Date;
	deletedAt?: Date;
	constructedAt?: Date;
}
