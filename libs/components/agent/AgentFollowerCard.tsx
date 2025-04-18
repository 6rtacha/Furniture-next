import { IconButton, Stack } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Follower } from '../../types/follow/follow';
import { REACT_APP_API_URL } from '../../config';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';

interface AgentFollowerCardProps {
	memberFollower: Follower;
	likeMemberHandler: any;
}

const AgentFollowerCard = (props: AgentFollowerCardProps) => {
	const { memberFollower, likeMemberHandler } = props;
	const user = useReactiveVar(userVar);
	const imagePath: string = memberFollower?.followerData?.memberImage
		? `${REACT_APP_API_URL}/${memberFollower?.followerData?.memberImage}`
		: `/img/profile/defaultUser.svg`;
	return (
		<Stack className={'pb-card'}>
			<img src={imagePath} alt="" />
			<Stack className={'card-info'}>
				<Stack className={'pb-name'}>
					<div className="name">{memberFollower?.followerData?.memberNick}</div>
					<IconButton
						color={'default'}
						className={'like-button'}
						onClick={() => likeMemberHandler(user, memberFollower?.followerData?._id)}
					>
						{memberFollower?.meLiked && memberFollower?.meLiked[0]?.myFavorite ? (
							<FavoriteIcon />
						) : (
							<FavoriteBorderIcon />
						)}
					</IconButton>
				</Stack>
				<Stack className={'status'}>
					<span>{memberFollower?.followerData?.memberFollowers} Followers</span>
					<span>{memberFollower?.followerData?.memberFollowings} Followings</span>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default AgentFollowerCard;
