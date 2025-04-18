import { IconButton, Stack } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Following } from '../../types/follow/follow';
import { REACT_APP_API_URL } from '../../config';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';

interface AgentFollowingCardProps {
	memberFollowing: Following;
	likeMemberHandler: any;
}

const AgentFollowingCard = (props: AgentFollowingCardProps) => {
	const { memberFollowing, likeMemberHandler } = props;
	const user = useReactiveVar(userVar);
	const imagePath: string = memberFollowing?.followingData?.memberImage
		? `${REACT_APP_API_URL}/${memberFollowing?.followingData?.memberImage}`
		: `/img/profile/defaultUser.svg`;
	return (
		<Stack className={'pb-card'}>
			<img src={imagePath} alt="" />
			<Stack className={'card-info'}>
				<Stack className={'pb-name'}>
					<div className="name">{memberFollowing?.followingData?.memberNick}</div>
					<IconButton
						color={'default'}
						className={'like-button'}
						onClick={() => likeMemberHandler(user, memberFollowing?.followingData?._id)}
					>
						{memberFollowing?.meLiked && memberFollowing?.meLiked[0]?.myFavorite ? (
							<FavoriteIcon />
						) : (
							<FavoriteBorderIcon />
						)}
					</IconButton>
				</Stack>
				<Stack className={'status'}>
					<span>{memberFollowing?.followingData?.memberFollowers} Followers</span>
					<span>{memberFollowing?.followingData?.memberFollowings} Followings</span>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default AgentFollowingCard;
