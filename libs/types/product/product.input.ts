import { ProductLocation, ProductMaterial, ProductStatus, ProductType } from '../../enums/product.enum';
import { Direction } from '../../enums/common.enum';

export interface ProductInput {
	productType: ProductType;
	productLocation: ProductLocation;
	productAddress: string;
	productTitle: string;
	productPrice: number;
	productMaterial: ProductMaterial;
	productColors: string;
	productWidth: number;
	productLength: number;
	productHeight: number;
	productImages: string[];
	productDesc?: string;
	productPurchase?: boolean;
	productRent?: boolean;
	memberId?: string;
	constructedAt?: Date;
}

interface PISearch {
	memberId?: string;
	locationList?: ProductLocation[];
	typeList?: ProductType[];
	widthList?: Number[];
	heightList?: Number[];
	lengthList?: Number[];
	materialList?: ProductMaterial[];
	options?: string[];
	pricesRange?: Range;
	periodsRange?: PeriodsRange;
	text?: string;
}

export interface ProductsInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: PISearch;
}

interface APISearch {
	productStatus?: ProductStatus;
}

export interface AgentProductsInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: APISearch;
}

interface ALPISearch {
	productStatus?: ProductStatus;
	productLocationList?: ProductLocation[];
}

export interface AllProductsInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: ALPISearch;
}

interface Range {
	start: number;
	end: number;
}

interface PeriodsRange {
	start: Date | number;
	end: Date | number;
}
