import { Box, IconButton, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Product } from '../../types/product/product';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { REACT_APP_API_URL } from '../../config';

interface ProductCardType {
	product: Product;
	likePropertyHandler?: any;
	myFavorites?: boolean;
	recentlyVisited?: boolean;
}

const ProductCard = (props: ProductCardType) => {
	const { product, likePropertyHandler, myFavorites, recentlyVisited } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const imagePath: string = product?.productImages[0]
		? `${REACT_APP_API_URL}/${product?.productImages[0]}`
		: '/img/banner/header1.svg';

	if (device === 'mobile') {
		return <div>PROPERTY CARD</div>;
	} else {
		return (
			<>
				<Stack className="card-frame">
					<Box className={'card'}>
						<div className="image">
							<Link
								href={{
									pathname: '/product/detail',
									query: { id: product?._id },
								}}
							>
								<img src={imagePath} alt="" />
							</Link>{' '}
						</div>

						<div className="title">
							<div className="article-title">
								<Link
									href={{
										pathname: '/product/detail',
										query: { id: product?._id },
									}}
								>
									<span>{product.productTitle}</span>
								</Link>
							</div>
							<div className="address">
								{product.productLocation}, {product.productAddress}
							</div>
							<Stack className="info">
								<div className="type">{product.productType}</div>
								<div className="material">{product.productMaterial}</div>
								<div className="price">${product.productPrice}</div>
							</Stack>
							<Stack className={'view-like'}>
								<Typography>Available</Typography>
								<Stack className="buttons">
									<IconButton color={'default'}>
										<RemoveRedEyeIcon />
									</IconButton>
									<Typography className="view-cnt">7</Typography>
									<IconButton color={'default'}>
										{/* {myFavorites ? ( */}
										<FavoriteIcon color="#cda274" />
										{/* ) : property?.meLiked && property?.meLiked[0]?.myFavorite ? ( */}
										<FavoriteIcon color="#cda274" />
										{/* ) : ( */}
										<FavoriteBorderIcon />
										{/* )} */}
									</IconButton>
									<Typography className="view-cnt">9</Typography>
								</Stack>
							</Stack>
						</div>
					</Box>
				</Stack>
			</>
		);
	}
};

export default ProductCard;
