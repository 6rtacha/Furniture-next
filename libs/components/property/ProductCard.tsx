import { Box, IconButton, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const ProductCard = () => {
	return (
		<>
			<Stack className="card-config">
				<Stack className="top">
					{/* <Link
                    href={{
                        pathname: '/property/detail',
                        query: { id: property?._id },
                    }}
                >
                    
                </Link> */}
					{/* {property && property?.propertyRank > topPropertyRank && ( */}
					<img src="/img/property/imageCard.png" alt="" />
					{/* <Box component={'div'} className={'top-badge'}>
						<img src="/img/icons/electricity.svg" alt="" />
						<Typography>TOP</Typography>
					</Box> */}
					{/* )} */}
					<Box component={'div'} className={'price-box'}>
						<Typography>$45</Typography>
					</Box>
				</Stack>
				<Stack className="bottom">
					<Stack className="name-address">
						<Stack className="name">
							{/* <Link
                            href={{
                                pathname: '/property/detail',
                                query: { id: property?._id },
                            }}
                        >
                            
                        </Link> */}
							<Typography>Sofa</Typography>
						</Stack>
						<Stack className="address">
							<Typography>{/* {property.propertyAddress}, {property.propertyLocation} */}Seoul, South Korea</Typography>
						</Stack>
					</Stack>
					<Stack className="options">
						<Stack className="option">
							{/* <img src="/img/icons/bed.svg" alt="" /> <Typography>{property.propertyBeds} bed</Typography> */}
						</Stack>
						<Stack className="option">
							{/* <img src="/img/icons/room.svg" alt="" /> <Typography>{property.propertyRooms} room</Typography> */}
						</Stack>
						<Stack className="option">
							{/* <img src="/img/icons/expand.svg" alt="" /> <Typography>{property.propertySquare} m2</Typography> */}
						</Stack>
					</Stack>
					<Stack className="divider"></Stack>
					<Stack className="type-buttons">
						<Stack className="type">
							<Typography
								sx={{ fontWeight: 500, fontSize: '13px' }}
								// className={property.propertyRent ? '' : 'disabled-type'}
							>
								Rent
							</Typography>
							<Typography
								sx={{ fontWeight: 500, fontSize: '13px' }}
								// className={property.propertyBarter ? '' : 'disabled-type'}
							>
								Barter
							</Typography>
						</Stack>
						{/* {!recentlyVisited && ( */}
						<Stack className="buttons">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">7</Typography>
							<IconButton color={'default'}>
								{/* {myFavorites ? ( */}
								<FavoriteIcon color="primary" />
								{/* ) : property?.meLiked && property?.meLiked[0]?.myFavorite ? ( */}
								<FavoriteIcon color="primary" />
								{/* ) : ( */}
								<FavoriteBorderIcon />
								{/* )} */}
							</IconButton>
							<Typography className="view-cnt">8</Typography>
						</Stack>
						{/* )} */}
					</Stack>
				</Stack>
			</Stack>
			<Stack className="card-config">
				<Stack className="top">
					{/* <Link
                    href={{
                        pathname: '/property/detail',
                        query: { id: property?._id },
                    }}
                >
                    
                </Link> */}
					{/* {property && property?.propertyRank > topPropertyRank && ( */}
					<img src="/img/property/imageCard.png" alt="" />
					{/* <Box component={'div'} className={'top-badge'}>
						<img src="/img/icons/electricity.svg" alt="" />
						<Typography>TOP</Typography>
					</Box> */}
					{/* )} */}
					<Box component={'div'} className={'price-box'}>
						<Typography>$45</Typography>
					</Box>
				</Stack>
				<Stack className="bottom">
					<Stack className="name-address">
						<Stack className="name">
							{/* <Link
                            href={{
                                pathname: '/property/detail',
                                query: { id: property?._id },
                            }}
                        >
                            
                        </Link> */}
							<Typography>Sofa</Typography>
						</Stack>
						<Stack className="address">
							<Typography>{/* {property.propertyAddress}, {property.propertyLocation} */}Seoul, South Korea</Typography>
						</Stack>
					</Stack>
					<Stack className="options">
						<Stack className="option">
							{/* <img src="/img/icons/bed.svg" alt="" /> <Typography>{property.propertyBeds} bed</Typography> */}
						</Stack>
						<Stack className="option">
							{/* <img src="/img/icons/room.svg" alt="" /> <Typography>{property.propertyRooms} room</Typography> */}
						</Stack>
						<Stack className="option">
							{/* <img src="/img/icons/expand.svg" alt="" /> <Typography>{property.propertySquare} m2</Typography> */}
						</Stack>
					</Stack>
					<Stack className="divider"></Stack>
					<Stack className="type-buttons">
						<Stack className="type">
							<Typography
								sx={{ fontWeight: 500, fontSize: '13px' }}
								// className={property.propertyRent ? '' : 'disabled-type'}
							>
								Rent
							</Typography>
							<Typography
								sx={{ fontWeight: 500, fontSize: '13px' }}
								// className={property.propertyBarter ? '' : 'disabled-type'}
							>
								Barter
							</Typography>
						</Stack>
						{/* {!recentlyVisited && ( */}
						<Stack className="buttons">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">7</Typography>
							<IconButton color={'default'}>
								{/* {myFavorites ? ( */}
								<FavoriteIcon color="primary" />
								{/* ) : property?.meLiked && property?.meLiked[0]?.myFavorite ? ( */}
								<FavoriteIcon color="primary" />
								{/* ) : ( */}
								<FavoriteBorderIcon />
								{/* )} */}
							</IconButton>
							<Typography className="view-cnt">8</Typography>
						</Stack>
						{/* )} */}
					</Stack>
				</Stack>
			</Stack>
			<Stack className="card-config">
				<Stack className="top">
					{/* <Link
                    href={{
                        pathname: '/property/detail',
                        query: { id: property?._id },
                    }}
                >
                    
                </Link> */}
					{/* {property && property?.propertyRank > topPropertyRank && ( */}
					<img src="/img/property/imageCard.png" alt="" />
					{/* <Box component={'div'} className={'top-badge'}>
						<img src="/img/icons/electricity.svg" alt="" />
						<Typography>TOP</Typography>
					</Box> */}
					{/* )} */}
					<Box component={'div'} className={'price-box'}>
						<Typography>$45</Typography>
					</Box>
				</Stack>
				<Stack className="bottom">
					<Stack className="name-address">
						<Stack className="name">
							{/* <Link
                            href={{
                                pathname: '/property/detail',
                                query: { id: property?._id },
                            }}
                        >
                            
                        </Link> */}
							<Typography>Sofa</Typography>
						</Stack>
						<Stack className="address">
							<Typography>{/* {property.propertyAddress}, {property.propertyLocation} */}Seoul, South Korea</Typography>
						</Stack>
					</Stack>
					<Stack className="options">
						<Stack className="option">
							{/* <img src="/img/icons/bed.svg" alt="" /> <Typography>{property.propertyBeds} bed</Typography> */}
						</Stack>
						<Stack className="option">
							{/* <img src="/img/icons/room.svg" alt="" /> <Typography>{property.propertyRooms} room</Typography> */}
						</Stack>
						<Stack className="option">
							{/* <img src="/img/icons/expand.svg" alt="" /> <Typography>{property.propertySquare} m2</Typography> */}
						</Stack>
					</Stack>
					<Stack className="divider"></Stack>
					<Stack className="type-buttons">
						<Stack className="type">
							<Typography
								sx={{ fontWeight: 500, fontSize: '13px' }}
								// className={property.propertyRent ? '' : 'disabled-type'}
							>
								Rent
							</Typography>
							<Typography
								sx={{ fontWeight: 500, fontSize: '13px' }}
								// className={property.propertyBarter ? '' : 'disabled-type'}
							>
								Barter
							</Typography>
						</Stack>
						{/* {!recentlyVisited && ( */}
						<Stack className="buttons">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">7</Typography>
							<IconButton color={'default'}>
								{/* {myFavorites ? ( */}
								<FavoriteIcon color="primary" />
								{/* ) : property?.meLiked && property?.meLiked[0]?.myFavorite ? ( */}
								<FavoriteIcon color="primary" />
								{/* ) : ( */}
								<FavoriteBorderIcon />
								{/* )} */}
							</IconButton>
							<Typography className="view-cnt">8</Typography>
						</Stack>
						{/* )} */}
					</Stack>
				</Stack>
			</Stack>
			<Stack className="card-config">
				<Stack className="top">
					{/* <Link
                    href={{
                        pathname: '/property/detail',
                        query: { id: property?._id },
                    }}
                >
                    
                </Link> */}
					{/* {property && property?.propertyRank > topPropertyRank && ( */}
					<img src="/img/property/imageCard.png" alt="" />
					{/* <Box component={'div'} className={'top-badge'}>
						<img src="/img/icons/electricity.svg" alt="" />
						<Typography>TOP</Typography>
					</Box> */}
					{/* )} */}
					<Box component={'div'} className={'price-box'}>
						<Typography>$45</Typography>
					</Box>
				</Stack>
				<Stack className="bottom">
					<Stack className="name-address">
						<Stack className="name">
							{/* <Link
                            href={{
                                pathname: '/property/detail',
                                query: { id: property?._id },
                            }}
                        >
                            
                        </Link> */}
							<Typography>Sofa</Typography>
						</Stack>
						<Stack className="address">
							<Typography>{/* {property.propertyAddress}, {property.propertyLocation} */}Seoul, South Korea</Typography>
						</Stack>
					</Stack>
					<Stack className="options">
						<Stack className="option">
							{/* <img src="/img/icons/bed.svg" alt="" /> <Typography>{property.propertyBeds} bed</Typography> */}
						</Stack>
						<Stack className="option">
							{/* <img src="/img/icons/room.svg" alt="" /> <Typography>{property.propertyRooms} room</Typography> */}
						</Stack>
						<Stack className="option">
							{/* <img src="/img/icons/expand.svg" alt="" /> <Typography>{property.propertySquare} m2</Typography> */}
						</Stack>
					</Stack>
					<Stack className="divider"></Stack>
					<Stack className="type-buttons">
						<Stack className="type">
							<Typography
								sx={{ fontWeight: 500, fontSize: '13px' }}
								// className={property.propertyRent ? '' : 'disabled-type'}
							>
								Rent
							</Typography>
							<Typography
								sx={{ fontWeight: 500, fontSize: '13px' }}
								// className={property.propertyBarter ? '' : 'disabled-type'}
							>
								Barter
							</Typography>
						</Stack>
						{/* {!recentlyVisited && ( */}
						<Stack className="buttons">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">7</Typography>
							<IconButton color={'default'}>
								{/* {myFavorites ? ( */}
								<FavoriteIcon color="primary" />
								{/* ) : property?.meLiked && property?.meLiked[0]?.myFavorite ? ( */}
								<FavoriteIcon color="primary" />
								{/* ) : ( */}
								<FavoriteBorderIcon />
								{/* )} */}
							</IconButton>
							<Typography className="view-cnt">8</Typography>
						</Stack>
						{/* )} */}
					</Stack>
				</Stack>
			</Stack>
			<Stack className="card-config">
				<Stack className="top">
					{/* <Link
                    href={{
                        pathname: '/property/detail',
                        query: { id: property?._id },
                    }}
                >
                    
                </Link> */}
					{/* {property && property?.propertyRank > topPropertyRank && ( */}
					<img src="/img/property/imageCard.png" alt="" />
					{/* <Box component={'div'} className={'top-badge'}>
						<img src="/img/icons/electricity.svg" alt="" />
						<Typography>TOP</Typography>
					</Box> */}
					{/* )} */}
					<Box component={'div'} className={'price-box'}>
						<Typography>$45</Typography>
					</Box>
				</Stack>
				<Stack className="bottom">
					<Stack className="name-address">
						<Stack className="name">
							{/* <Link
                            href={{
                                pathname: '/property/detail',
                                query: { id: property?._id },
                            }}
                        >
                            
                        </Link> */}
							<Typography>Sofa</Typography>
						</Stack>
						<Stack className="address">
							<Typography>{/* {property.propertyAddress}, {property.propertyLocation} */}Seoul, South Korea</Typography>
						</Stack>
					</Stack>
					<Stack className="options">
						<Stack className="option">
							{/* <img src="/img/icons/bed.svg" alt="" /> <Typography>{property.propertyBeds} bed</Typography> */}
						</Stack>
						<Stack className="option">
							{/* <img src="/img/icons/room.svg" alt="" /> <Typography>{property.propertyRooms} room</Typography> */}
						</Stack>
						<Stack className="option">
							{/* <img src="/img/icons/expand.svg" alt="" /> <Typography>{property.propertySquare} m2</Typography> */}
						</Stack>
					</Stack>
					<Stack className="divider"></Stack>
					<Stack className="type-buttons">
						<Stack className="type">
							<Typography
								sx={{ fontWeight: 500, fontSize: '13px' }}
								// className={property.propertyRent ? '' : 'disabled-type'}
							>
								Rent
							</Typography>
							<Typography
								sx={{ fontWeight: 500, fontSize: '13px' }}
								// className={property.propertyBarter ? '' : 'disabled-type'}
							>
								Barter
							</Typography>
						</Stack>
						{/* {!recentlyVisited && ( */}
						<Stack className="buttons">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">7</Typography>
							<IconButton color={'default'}>
								{/* {myFavorites ? ( */}
								<FavoriteIcon color="primary" />
								{/* ) : property?.meLiked && property?.meLiked[0]?.myFavorite ? ( */}
								<FavoriteIcon color="primary" />
								{/* ) : ( */}
								<FavoriteBorderIcon />
								{/* )} */}
							</IconButton>
							<Typography className="view-cnt">8</Typography>
						</Stack>
						{/* )} */}
					</Stack>
				</Stack>
			</Stack>
		</>
	);
};

export default ProductCard;
