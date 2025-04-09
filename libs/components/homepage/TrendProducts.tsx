import React, { useCallback, useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Product } from '../../types/product/product';
import { ProductsInquiry } from '../../types/product/product.input';
import TrendPropertyCard from './TrendProductCard';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../../apollo/user/query';
import { T } from '../../types/common';
import { LIKE_TARGET_PRODUCT } from '../../../apollo/user/mutation';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';
import { Message } from '../../enums/common.enum';
import router, { useRouter } from 'next/router';
import { ProductType } from '../../enums/product.enum';

interface TrendProductsProps {
	initialInput: ProductsInquiry;
}

const TrendProducts = (props: TrendProductsProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [trendProducts, setTrendProducts] = useState<Product[]>([]);
	const router = useRouter();
	const [searchFilter, setSearchFilter] = useState<ProductsInquiry>(
		router?.query?.input ? JSON.parse(router?.query?.input as string) : initialInput,
	);

	/** APOLLO REQUESTS **/
	const [likeTargetProduct] = useMutation(LIKE_TARGET_PRODUCT);

	const {
		loading: getProductsLoading,
		data: getProductsData,
		error: getProductsError,
		refetch: getProductsRefetch,
	} = useQuery(GET_PRODUCTS, {
		fetchPolicy: 'cache-and-network',
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setTrendProducts(data?.getProducts?.list);
		},
	});
	/** HANDLERS **/
	const likeProductHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

			// execute likeTargetProduct Mutation
			await likeTargetProduct({ variables: { input: id } });

			// execute getProductsRefetch
			await getProductsRefetch({ input: initialInput });

			await sweetTopSmallSuccessAlert('success', 800);
		} catch (err: any) {
			console.log('ERROR, likePropertyHandler:', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	const pushBedHandler = async () => {
		const updatedFilter = {
			...searchFilter,
			search: { ...searchFilter.search, typeList: [ProductType.BED] },
		};
		setSearchFilter(updatedFilter);

		await router.push(
			`/product?input=${JSON.stringify(updatedFilter)}`,
			`/product?input=${JSON.stringify(updatedFilter)}`,
		);
	};

	const pushChairHandler = async () => {
		const updatedFilter = {
			...searchFilter,
			search: { ...searchFilter.search, typeList: [ProductType.CHAIR] },
		};
		setSearchFilter(updatedFilter);

		await router.push(
			`/product?input=${JSON.stringify(updatedFilter)}`,
			`/product?input=${JSON.stringify(updatedFilter)}`,
		);
	};

	const pushLampHandler = async () => {
		const updatedFilter = {
			...searchFilter,
			search: { ...searchFilter.search, typeList: [ProductType.LAMP] },
		};
		setSearchFilter(updatedFilter);

		await router.push(
			`/product?input=${JSON.stringify(updatedFilter)}`,
			`/product?input=${JSON.stringify(updatedFilter)}`,
		);
	};

	const pushTableHandler = async () => {
		const updatedFilter = {
			...searchFilter,
			search: { ...searchFilter.search, typeList: [ProductType.TABLE] },
		};
		setSearchFilter(updatedFilter);

		await router.push(
			`/product?input=${JSON.stringify(updatedFilter)}`,
			`/product?input=${JSON.stringify(updatedFilter)}`,
		);
	};

	const pushCabinetHandler = async () => {
		const updatedFilter = {
			...searchFilter,
			search: { ...searchFilter.search, typeList: [ProductType.CABINET] },
		};
		setSearchFilter(updatedFilter);

		await router.push(
			`/product?input=${JSON.stringify(updatedFilter)}`,
			`/product?input=${JSON.stringify(updatedFilter)}`,
		);
	};

	const pushSofaHandler = useCallback(async () => {
		const updatedFilter = {
			...searchFilter,
			search: { ...searchFilter.search, typeList: [ProductType.SOFA] },
		};
		setSearchFilter(updatedFilter);
		console.log('searchFilter', searchFilter);

		await router.push(
			`/product?input=${JSON.stringify(updatedFilter)}`,
			`/product?input=${JSON.stringify(updatedFilter)}`,
		);
	}, [searchFilter]);

	if (trendProducts) console.log('trendProducts1:', trendProducts);
	if (!trendProducts) return null;

	if (device === 'mobile') {
		return (
			<Stack className={'trend-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>Our Projects</span>
					</Stack>
					<Stack className={'card-box'}>
						{trendProducts.length === 0 ? (
							<Box component={'div'} className={'empty-list'}>
								Projects Empty
							</Box>
						) : (
							<Swiper
								className={'trend-property-swiper'}
								slidesPerView={'auto'}
								centeredSlides={true}
								spaceBetween={15}
								modules={[Autoplay]}
							>
								{trendProducts.map((product: Product) => {
									return (
										<SwiperSlide key={product._id} className={'trend-property-slide'}>
											<TrendPropertyCard product={product} likeProductHandler={likeProductHandler} />
										</SwiperSlide>
									);
								})}
							</Swiper>
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'trend-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span>Checkout Our Trending Products</span>
							<p>
								Don't just follow trends—set them! Our latest collection is designed for those who dare to stand out.
								Elevate your style with exclusive pieces, handpicked for a bold and sophisticated look. Shop now before
								they're gone!
							</p>
						</Box>
					</Stack>
					<Stack className={'card-box'}>
						<Stack className={'line-one'}>
							<div className="big-card" data-value="">
								<img src="/img/homePage/bed.png" alt="" className="big" onClick={pushBedHandler} />
							</div>

							<div className="small-card">
								<img src="/img/homePage/chair.jpg" alt="" className="small" onClick={pushChairHandler} />
							</div>
							<div className="small-card">
								<img src="/img/homePage/lamp.jpg" alt="" className="small" onClick={pushLampHandler} />
							</div>
						</Stack>
						<Stack className={'line-one'}>
							<div className="small-card">
								<img src="/img/homePage/table.png" alt="" className="small" onClick={pushTableHandler} />
							</div>
							<div className="small-card">
								<img src="/img/homePage/cabinet.png" alt="" className="small" onClick={pushCabinetHandler} />
							</div>
							<div className="big-card">
								<img src="/img/homePage/sofa.png" alt="" className="big" onClick={pushSofaHandler} />
							</div>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

TrendProducts.defaultProps = {
	initialInput: {
		page: 1,
		limit: 9,
		search: {
			pricesRange: {
				start: 0,
				end: 2000000,
			},
		},
	},
};

export default TrendProducts;
