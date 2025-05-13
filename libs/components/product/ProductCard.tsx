import { Box, IconButton, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Product } from '../../types/product/product';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { REACT_APP_API_URL } from '../../config';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

interface ProductCardType {
	product: Product;
	likeProductHandler?: any;
	myFavorites?: boolean;
	recentlyVisited?: boolean;
}

const ProductCard = (props: ProductCardType) => {
	const { product, likeProductHandler, myFavorites, recentlyVisited } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const imagePath: string = product?.productImages[0]
		? `${REACT_APP_API_URL}/${product?.productImages[0]}`
		: '/img/banner/header1.svg';

	console.log('product:', product);

	if (device === 'mobile') {
		return <div>PRODUCT CARD</div>;
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
								<div className="price">${product.productPrice}</div>
							</Link>{' '}
						</div>

						<div className="title">
							<div className="article-title">
								<span>{product.productTitle}</span>
								<Stack className="info">
									<div className="type">{product.productType}</div>
									<div className="material">{product.productMaterial}</div>
								</Stack>
							</div>
							<div className="address">
								{product.productAddress}, {product.productLocation}
							</div>

							<Stack className={'view-like'}>
								<Typography>Available</Typography>
								<ShoppingCartIcon sx={{ mt: '7px' }} />
								<Stack className="buttons">
									<IconButton color={'default'}>
										<RemoveRedEyeIcon />
									</IconButton>
									<Typography className="view-cnt">{product?.productViews}</Typography>
									<IconButton color={'default'} onClick={() => likeProductHandler(user, product?._id)}>
										{myFavorites ? (
											<FavoriteSharpIcon />
										) : product?.meLiked && product?.meLiked[0]?.myFavorite ? (
											<FavoriteSharpIcon />
										) : (
											<FavoriteBorderIcon />
										)}
									</IconButton>
									<Typography className="view-cnt">{product?.productLikes}</Typography>
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
