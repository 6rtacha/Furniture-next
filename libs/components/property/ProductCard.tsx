import { Box, IconButton, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const ProductCard = () => {
	return (
		<>
			<Stack className="card-frame">
				<Box className={'card'}>
					<div className="image">
						<img src="https://s3-alpha-sig.figma.com/img/f4b2/a97e/4c4f8f5e4759944aaba98a3c6dd3e663?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=J3lK7R7OBd3vEEGob8cACKMDUCzH4K7fRZFrlYqJCKO~9Z~zNHD4JEq5FQg-XM3mukLZ8MQTaPT-Zz6cmh9XbuVl6k1UfUa1EtSQebhO~N7GFVUfBXNuJISFO6aPQKrPhMbnfhjOD7z3peUbk4hSmNdws44FngRitZ9t~7ADY1yOOfsGHGJw3uHX1Dcczho6LBvXXu5o25kqXTIv~AwJiJjVGiM49SBGSZ9C-8vQoouoavtOpH~46KO4zgFVN36WAzljs3dJ1VMSrFBdbmJjoVQYOY4dYaURp6vT9SvMftxZPbJbTh5eUbNBh9hHtKp5YRX7ZFf-rU~SiYhl2YjDeA__" />
					</div>

					<div className="title">
						<div className="article-title">
							<span>Sofa Berre</span>
						</div>
						<div className="address">Seoul, South Korea</div>
						<Stack className="info">
							<div className="type">Sofa</div>
							<div className="material">Leather</div>
							<div className="price">$57</div>
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
			<Stack className="card-frame">
				<Box className={'card'}>
					<div className="image">
						<img src="https://s3-alpha-sig.figma.com/img/f4b2/a97e/4c4f8f5e4759944aaba98a3c6dd3e663?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=J3lK7R7OBd3vEEGob8cACKMDUCzH4K7fRZFrlYqJCKO~9Z~zNHD4JEq5FQg-XM3mukLZ8MQTaPT-Zz6cmh9XbuVl6k1UfUa1EtSQebhO~N7GFVUfBXNuJISFO6aPQKrPhMbnfhjOD7z3peUbk4hSmNdws44FngRitZ9t~7ADY1yOOfsGHGJw3uHX1Dcczho6LBvXXu5o25kqXTIv~AwJiJjVGiM49SBGSZ9C-8vQoouoavtOpH~46KO4zgFVN36WAzljs3dJ1VMSrFBdbmJjoVQYOY4dYaURp6vT9SvMftxZPbJbTh5eUbNBh9hHtKp5YRX7ZFf-rU~SiYhl2YjDeA__" />
					</div>

					<div className="title">
						<div className="article-title">
							<span>Sofa Berre</span>
						</div>
						<div className="address">Seoul, South Korea</div>
						<Stack className="info">
							<div className="type">Sofa</div>
							<div className="material">Leather</div>
							<div className="price">$57</div>
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
			<Stack className="card-frame">
				<Box className={'card'}>
					<div className="image">
						<img src="https://s3-alpha-sig.figma.com/img/f4b2/a97e/4c4f8f5e4759944aaba98a3c6dd3e663?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=J3lK7R7OBd3vEEGob8cACKMDUCzH4K7fRZFrlYqJCKO~9Z~zNHD4JEq5FQg-XM3mukLZ8MQTaPT-Zz6cmh9XbuVl6k1UfUa1EtSQebhO~N7GFVUfBXNuJISFO6aPQKrPhMbnfhjOD7z3peUbk4hSmNdws44FngRitZ9t~7ADY1yOOfsGHGJw3uHX1Dcczho6LBvXXu5o25kqXTIv~AwJiJjVGiM49SBGSZ9C-8vQoouoavtOpH~46KO4zgFVN36WAzljs3dJ1VMSrFBdbmJjoVQYOY4dYaURp6vT9SvMftxZPbJbTh5eUbNBh9hHtKp5YRX7ZFf-rU~SiYhl2YjDeA__" />
					</div>

					<div className="title">
						<div className="article-title">
							<span>Sofa Berre</span>
						</div>
						<div className="address">Seoul, South Korea</div>
						<Stack className="info">
							<div className="type">Sofa</div>
							<div className="material">Leather</div>
							<div className="price">$57</div>
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
			<Stack className="card-frame">
				<Box className={'card'}>
					<div className="image">
						<img src="https://s3-alpha-sig.figma.com/img/f4b2/a97e/4c4f8f5e4759944aaba98a3c6dd3e663?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=J3lK7R7OBd3vEEGob8cACKMDUCzH4K7fRZFrlYqJCKO~9Z~zNHD4JEq5FQg-XM3mukLZ8MQTaPT-Zz6cmh9XbuVl6k1UfUa1EtSQebhO~N7GFVUfBXNuJISFO6aPQKrPhMbnfhjOD7z3peUbk4hSmNdws44FngRitZ9t~7ADY1yOOfsGHGJw3uHX1Dcczho6LBvXXu5o25kqXTIv~AwJiJjVGiM49SBGSZ9C-8vQoouoavtOpH~46KO4zgFVN36WAzljs3dJ1VMSrFBdbmJjoVQYOY4dYaURp6vT9SvMftxZPbJbTh5eUbNBh9hHtKp5YRX7ZFf-rU~SiYhl2YjDeA__" />
					</div>

					<div className="title">
						<div className="article-title">
							<span>Sofa Berre</span>
						</div>
						<div className="address">Seoul, South Korea</div>
						<Stack className="info">
							<div className="type">Sofa</div>
							<div className="material">Leather</div>
							<div className="price">$57</div>
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
};

export default ProductCard;
